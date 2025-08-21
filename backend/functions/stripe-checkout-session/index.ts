// supabase/functions/create-checkout-session/index.ts
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const stripeSecret = Deno.env.get("STRIPE_SECRET_KEY");
const sendgridApiKey = Deno.env.get("SENDGRID_API_KEY");

const sendOrderEmail = async (toEmail: string, orderDetails: string) => {
  const emailData = {
    personalizations: [{ to: [{ email: toEmail }] }],
    from: { email: "aleguzmancs9@gmail.com" }, // Replace with your verified sender
    subject: "Order Confirmation",
    content: [{ type: "text/plain", value: `Thank you for your order!\n\n${orderDetails}` }]
  };

  const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${sendgridApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(emailData)
  });

  if (!res.ok) {
    const error = await res.text();
    console.error("SendGrid error:", error);
  }
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Skip auth validation for testing
    console.log('Processing checkout request...');
    
    const { line_items, success_url, cancel_url, user_email } = await req.json();

    // Validate required data
    if (!line_items || !line_items[0]) {
      return new Response(JSON.stringify({ error: 'Missing line_items' }), { 
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    if (!stripeSecret) {
      return new Response(JSON.stringify({ error: 'Stripe secret key not configured' }), { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    console.log('Creating Stripe session with:', { line_items, success_url, cancel_url });

    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeSecret}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        mode: 'payment',
        success_url,
        cancel_url,
        'line_items[0][price_data][currency]': 'usd',
        'line_items[0][price_data][product_data][name]': line_items[0].name,
        'line_items[0][price_data][unit_amount]': String(line_items[0].amount),
        'line_items[0][quantity]': String(line_items[0].quantity),
      }),
    });

    const session = await res.json();
    console.log('Stripe response:', session);

    if (!session.url) {
      return new Response(JSON.stringify({ error: session }), { 
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }


    // Send order confirmation email to the logged-in user
    if (user_email) {
      try {
        await sendOrderEmail(
          user_email,
          `New order placed!\nProduct: ${line_items[0].name}\nAmount: $${(line_items[0].amount / 100).toFixed(2)}`
        );
      } catch (emailErr) {
        console.error('Failed to send email:', emailErr);
      }
    } else {
      console.error('No user_email provided in request body.');
    }

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    console.error('Function error:', err);
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
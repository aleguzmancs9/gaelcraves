import { supabase } from '../supabaseClient';

export const createStripeCheckout = async (line_items) => {
  // Get the current session (user must be logged in)
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session) {
    alert('You must be logged in to checkout.');
    return;
  }


  const accessToken = session.access_token;
  const user_email = session.user?.email;

  const response = await fetch(
    'https://dklnsndxjdqvfejbuoxl.functions.supabase.co/create-checkout-session',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        line_items,
        success_url: 'http://localhost:5173/success',
        cancel_url: 'http://localhost:5173/cancel',
        user_email, // Pass the logged-in user's email to the backend
      }),
    }
  );

  const data = await response.json();
  if (response.ok && data.url) {
    window.location.href = data.url;
  } else {
    alert('Checkout failed: ' + JSON.stringify(data));
  }
};
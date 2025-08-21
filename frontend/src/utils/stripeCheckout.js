import { supabase } from '../services/supabaseClient';

// Get the appropriate URL based on environment
const getApiUrl = () => {
  if (import.meta.env.PROD) {
    return 'https://dklnsndxjdqvfejbuoxl.functions.supabase.co/stripe-checkout-session';
  }
  return 'https://dklnsndxjdqvfejbuoxl.functions.supabase.co/stripe-checkout-session';
};

const getSuccessUrl = () => {
  return `${window.location.origin}/success`;
};

const getCancelUrl = () => {
  return `${window.location.origin}/cancel`;
};

export const createStripeCheckout = async (line_items) => {
  try {
    // Get the current session
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      throw new Error(`Session error: ${sessionError.message}`);
    }

    if (!session) {
      throw new Error('You must be logged in to checkout.');
    }

    const accessToken = session.access_token;
    const user_email = session.user?.email;

    if (!user_email) {
      throw new Error('User email not found.');
    }

    const response = await fetch(getApiUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        line_items,
        success_url: getSuccessUrl(),
        cancel_url: getCancelUrl(),
        user_email,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.url) {
      throw new Error('No checkout URL received from server');
    }

    window.location.href = data.url;
  } catch (error) {
    console.error('Checkout error:', error);
    throw error; // Re-throw to let the calling component handle it
  }
};
// src/config/constants.js

// Validate required environment variables
const requiredEnvVars = {
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
};

// Check for missing environment variables
Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value) {
    console.error(`Missing required environment variable: ${key}`);
  }
});

export const API_ENDPOINTS = {
  createCheckout: 'https://dklnsndxjdqvfejbuoxl.functions.supabase.co/create-checkout-session',
};

export const ROUTES = {
  HOME: '/',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ADMIN: '/admin',
  SUCCESS: '/success',
  CANCEL: '/cancel',
};

export const PRODUCTS = {
  PROTEIN_BOWL: {
    name: 'Protein Bowl',
    price: 1299, // $12.99 in cents
    description: 'Delicious protein-packed bowl with fresh ingredients',
  },
};

export const TEST_CARD_INFO = {
  number: '4242 4242 4242 4242',
  expiry: '12/34',
  cvc: '123',
  zip: '12345',
};

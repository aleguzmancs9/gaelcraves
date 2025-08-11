// src/components/CheckoutButton.jsx
import React from 'react';
import { createStripeCheckout } from '../utils/checkout';

const CheckoutButton = () => {
  const handleCheckout = async () => {
    try {
      await createStripeCheckout([
        {
          name: 'Protein Bowl',
          amount: 1299, // amount in cents = $12.99
          quantity: 1,
        },
        // You can add more line items here
      ]);
    } catch (err) {
      alert('Checkout failed: ' + err.message);
    }
  };

  return (
    <button onClick={handleCheckout} className="btn btn-primary">
      Checkout
    </button>
  );
};

export default CheckoutButton;

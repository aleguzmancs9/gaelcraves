// src/components/checkout/StripeCheckoutButton.jsx
import React, { useState } from 'react';
import { createStripeCheckout } from '../../utils/stripeCheckout';
import { useAuth } from '../../context/AuthContext';
import { PRODUCTS } from '../../config/appConstants';

const StripeCheckoutButton = ({ items = [], disabled = false, className = '' }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const defaultItems = [
    {
      name: PRODUCTS.PROTEIN_BOWL.name,
      amount: PRODUCTS.PROTEIN_BOWL.price,
      quantity: 1,
    }
  ];

  const handleCheckout = async () => {
    if (!user) {
      alert('Please log in to checkout.');
      return;
    }

    setLoading(true);
    try {
      await createStripeCheckout(items.length > 0 ? items : defaultItems);
    } catch (err) {
      alert('Checkout failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleCheckout} 
      className={`btn btn-primary ${className}`}
      disabled={disabled || loading || !user}
    >
      {loading ? (
        <>
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Processing...
        </>
      ) : !user ? (
        'Login Required'
      ) : (
        'Checkout'
      )}
    </button>
  );
};

export default StripeCheckoutButton;

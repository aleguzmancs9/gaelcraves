// src/pages/ShoppingCart.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import StripeCheckoutButton from '../components/checkout/StripeCheckoutButton';

const ShoppingCart = () => {
  const { 
    items, 
    itemCount, 
    subtotal, 
    tax, 
    total, 
    updateQuantity, 
    removeItem, 
    clearCart 
  } = useCart();
  
  const { user } = useAuth();

  if (items.length === 0) {
    return (
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body text-center">
              <h2>Your Cart is Empty</h2>
              <p className="text-muted">Add some delicious items to get started!</p>
              <Link to="/" className="btn btn-primary">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-md-8">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h3>Shopping Cart ({itemCount} items)</h3>
            <button 
              onClick={clearCart} 
              className="btn btn-outline-danger btn-sm"
            >
              Clear Cart
            </button>
          </div>
          <div className="card-body">
            {items.map((item) => (
              <div key={item.id} className="row align-items-center border-bottom py-3">
                <div className="col-md-6">
                  <h5>{item.name}</h5>
                  <p className="text-muted">${(item.price / 100).toFixed(2)} each</p>
                </div>
                <div className="col-md-3">
                  <div className="input-group">
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      className="form-control text-center" 
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                      min="0"
                    />
                    <button 
                      className="btn btn-outline-secondary"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="col-md-2">
                  <strong>${((item.price * item.quantity) / 100).toFixed(2)}</strong>
                </div>
                <div className="col-md-1">
                  <button 
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeItem(item.id)}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="col-md-4">
        <div className="card">
          <div className="card-header">
            <h4>Order Summary</h4>
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <span>Subtotal:</span>
              <span>${(subtotal / 100).toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Tax:</span>
              <span>${(tax / 100).toFixed(2)}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between h5">
              <span>Total:</span>
              <span>${(total / 100).toFixed(2)}</span>
            </div>
            
            {!user ? (
              <div className="alert alert-info">
                Please log in to proceed with checkout
              </div>
            ) : null}
            
            <StripeCheckoutButton 
              items={items.map(item => ({
                name: item.name,
                amount: item.price,
                quantity: item.quantity
              }))}
              className="w-100 mt-3"
            />
            
            <Link to="/" className="btn btn-outline-secondary w-100 mt-2">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;

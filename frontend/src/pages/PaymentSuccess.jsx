// src/pages/Success.jsx
import React from 'react';

const Success = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card text-center">
            <div className="card-body">
              <h1 className="card-title text-success">Payment Successful! 🎉</h1>
              <p className="card-text">
                Thank you for your purchase! Your order has been processed successfully.
              </p>
              <a href="/" className="btn btn-primary">
                Continue Shopping
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;

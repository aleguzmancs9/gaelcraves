// src/pages/Cancel.jsx
import React from 'react';

const Cancel = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card text-center">
            <div className="card-body">
              <h1 className="card-title text-warning">Payment Cancelled</h1>
              <p className="card-text">
                Your payment was cancelled. No charges were made.
              </p>
              <a href="/" className="btn btn-primary">
                Try Again
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cancel;

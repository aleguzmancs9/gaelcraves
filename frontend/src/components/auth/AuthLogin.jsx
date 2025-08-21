// src/components/auth/AuthLogin.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../ui/common/LoadingSpinner';

const AuthLogin = () => {
  const { 
    user, 
    loading, 
    error, 
    signInWithGoogle, 
    signInWithEmail, 
    signInAnonymously, 
    signOut,
    clearError 
  } = useAuth();
  
  const [emailLoading, setEmailLoading] = useState(false);

  const handleEmailLogin = async () => {
    const email = prompt('Enter your email:');
    if (!email) return;

    setEmailLoading(true);
    try {
      await signInWithEmail(email);
      alert('Check your email for the login link!');
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setEmailLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner>Loading authentication...</LoadingSpinner>;
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <strong>Error:</strong> {error}
        <button 
          type="button" 
          className="btn-close ms-2" 
          onClick={clearError}
          aria-label="Close"
        ></button>
      </div>
    );
  }

  if (user) {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Welcome!</h5>
          <p className="card-text">
            {user.email ? `Logged in as: ${user.email}` : 'Anonymous user'}
          </p>
          <button onClick={signOut} className="btn btn-outline-secondary">
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-grid gap-2">
          <button onClick={signInWithGoogle} className="btn btn-primary">
            Sign in with Google
          </button>
          <button 
            onClick={handleEmailLogin} 
            className="btn btn-outline-primary"
            disabled={emailLoading}
          >
            {emailLoading ? 'Sending...' : 'Sign in with Email'}
          </button>
          <button onClick={signInAnonymously} className="btn btn-outline-secondary">
            Anonymous Login (Test)
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;

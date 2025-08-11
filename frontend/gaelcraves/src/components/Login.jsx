// src/components/Login.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const Login = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
  };

  const handleEmailLogin = async () => {
    const email = prompt('Enter your email:');
    if (email) {
      await supabase.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: window.location.origin
        }
      });
      alert('Check your email for the login link!');
    }
  };

  const handleAnonymousLogin = async () => {
    await supabase.auth.signInAnonymously();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return (
      <div className="card">
        <p>Welcome, {user.email}!</p>
        <button onClick={handleLogout} className="btn btn-secondary">
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="d-flex gap-2 flex-wrap">
        <button onClick={handleLogin} className="btn btn-primary">
          Sign in with Google
        </button>
        <button onClick={handleEmailLogin} className="btn btn-outline-primary">
          Sign in with Email
        </button>
        <button onClick={handleAnonymousLogin} className="btn btn-outline-secondary">
          Anonymous Login (Test)
        </button>
      </div>
    </div>
  );
};

export default Login;

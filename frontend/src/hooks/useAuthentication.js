// src/hooks/useAuthentication.js
import { useState, useEffect } from 'react';
import { supabase, authHelpers } from '../services/supabaseClient';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        setUser(session?.user ?? null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
        setError(null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const { error } = await authHelpers.signInWithGoogle();
      if (error) throw error;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const signInWithEmail = async (email) => {
    try {
      const { error } = await authHelpers.signInWithEmail(email);
      if (error) throw error;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const signInAnonymously = async () => {
    try {
      const { error } = await authHelpers.signInAnonymously();
      if (error) throw error;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await authHelpers.signOut();
      if (error) throw error;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    user,
    loading,
    error,
    signInWithGoogle,
    signInWithEmail,
    signInAnonymously,
    signOut,
  };
};

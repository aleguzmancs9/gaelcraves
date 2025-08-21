// src/context/AuthContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { supabase, authHelpers } from '../services/supabaseClient';

// Auth actions
const AUTH_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_USER: 'SET_USER',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case AUTH_ACTIONS.SET_USER:
      return { ...state, user: action.payload, loading: false, error: null };
    case AUTH_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    case AUTH_ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  user: null,
  loading: true,
  error: null,
};

// Create context
const AuthContext = createContext(null);

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { session, error } = await authHelpers.getCurrentSession();
        if (error) throw error;
        
        dispatch({
          type: AUTH_ACTIONS.SET_USER,
          payload: session?.user ?? null,
        });
      } catch (error) {
        dispatch({
          type: AUTH_ACTIONS.SET_ERROR,
          payload: error.message,
        });
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        dispatch({
          type: AUTH_ACTIONS.SET_USER,
          payload: session?.user ?? null,
        });
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Auth actions
  const signInWithGoogle = async () => {
    try {
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
      const { error } = await authHelpers.signInWithGoogle();
      if (error) throw error;
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: error.message,
      });
      throw error;
    }
  };

  const signInWithEmail = async (email) => {
    try {
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
      const { error } = await authHelpers.signInWithEmail(email);
      if (error) throw error;
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: error.message,
      });
      throw error;
    }
  };

  const signInAnonymously = async () => {
    try {
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
      const { error } = await authHelpers.signInAnonymously();
      if (error) throw error;
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: error.message,
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
      const { error } = await authHelpers.signOut();
      if (error) throw error;
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: error.message,
      });
      throw error;
    }
  };

  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  const value = {
    ...state,
    signInWithGoogle,
    signInWithEmail,
    signInAnonymously,
    signOut,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

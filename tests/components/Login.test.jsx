// tests/components/Login.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Login from '../../src/components/Login';
import { AuthProvider } from '../../src/context/AuthContext';

// Mock the auth context
const mockAuthContext = {
  user: null,
  loading: false,
  error: null,
  signInWithGoogle: vi.fn(),
  signInWithEmail: vi.fn(),
  signInAnonymously: vi.fn(),
  signOut: vi.fn(),
  clearError: vi.fn(),
};

vi.mock('../../src/context/AuthContext', () => ({
  useAuth: () => mockAuthContext,
  AuthProvider: ({ children }) => children,
}));

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login buttons when user is not authenticated', () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    expect(screen.getByText('Sign in with Google')).toBeInTheDocument();
    expect(screen.getByText('Sign in with Email')).toBeInTheDocument();
    expect(screen.getByText('Anonymous Login (Test)')).toBeInTheDocument();
  });

  it('renders user info when authenticated', () => {
    mockAuthContext.user = { email: 'test@example.com' };
    
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    expect(screen.getByText('Welcome!')).toBeInTheDocument();
    expect(screen.getByText('Logged in as: test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });

  it('calls signInWithGoogle when Google button is clicked', () => {
    mockAuthContext.user = null;
    
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText('Sign in with Google'));
    expect(mockAuthContext.signInWithGoogle).toHaveBeenCalledTimes(1);
  });

  it('shows error message when there is an error', () => {
    mockAuthContext.error = 'Authentication failed';
    
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    expect(screen.getByText('Error: Authentication failed')).toBeInTheDocument();
  });
});

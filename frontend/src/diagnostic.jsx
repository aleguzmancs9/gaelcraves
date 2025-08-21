// Diagnostic version - minimal React app
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Simple test component
function DiagnosticApp() {
  console.log('DiagnosticApp is rendering!');
  
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#333' }}>🎉 React is Working!</h1>
      <p style={{ color: '#666' }}>
        If you can see this message, React is rendering correctly.
      </p>
      
      <div style={{ 
        backgroundColor: 'white', 
        padding: '15px', 
        borderRadius: '8px',
        marginTop: '20px',
        border: '1px solid #ddd'
      }}>
        <h3>Debug Info:</h3>
        <ul>
          <li>✅ React 19.1.1 is loaded</li>
          <li>✅ Vite dev server is running</li>
          <li>✅ Component rendering works</li>
        </ul>
      </div>
      
      <button 
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
        onClick={() => alert('Button clicked! JavaScript is working.')}
      >
        Test Button
      </button>
    </div>
  )
}

// Error boundary for debugging
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', backgroundColor: '#f8d7da', color: '#721c24' }}>
          <h1>Something went wrong!</h1>
          <pre>{this.state.error?.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

console.log('Starting React app...');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <DiagnosticApp />
    </ErrorBoundary>
  </StrictMode>,
)

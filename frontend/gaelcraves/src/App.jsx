import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import CheckoutButton from './components/CheckoutButton'
import Success from './pages/Success'
import Cancel from './pages/Cancel'
import './App.css'

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </div>
    </Router>
  )
}

function Home() {
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <h1 className="text-center mb-4">Gael Craves - Stripe Test</h1>
        
        
        
        <div className="card mb-4">
          <div className="card-header">
            <h3>Step 1: Login with Google (Optional for now)</h3>
          </div>
          <div className="card-body">
            <Login />
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header">
            <h3>Step 2: Test Stripe Checkout (No Auth Required)</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <h5>Protein Bowl</h5>
                <p>Price: $12.99</p>
                <p className="text-muted">
                  This will create a Stripe checkout session and redirect you to pay.
                </p>
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <CheckoutButton />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Test Instructions</h3>
          </div>
          <div className="card-body">
            <ol>
              <li><strong>Log in or anonymous login faster</strong> then click "Checkout" </li>
              <li>Use test card: <code>4242 4242 4242 4242</code></li>
              <li>Expiry: <code>12/34</code>, CVC: <code>123</code>, ZIP: <code>12345</code></li>
              <li>Complete payment to test the full flow</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

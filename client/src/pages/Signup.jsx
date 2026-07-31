import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/signup.css';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong during registration.');
      }

      setSuccessMsg('Account created successfully. Let\'s get started!');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="signup-page">
      <Header />
       
      <main className="signup-main">
        <div className="signup-wrapper">
          <img src="./images/photo-1715538859909-914de12746b8.avif" alt="Background" className="signup-bg-image" />

          <div className="signup-glow-overlay">
            <div className="signup-glow-circle signup-glow-circle--left"></div>
            <div className="signup-glow-circle signup-glow-circle--right"></div>
          </div>

          <div className="signup-card">
            <h2 className="signup-title">
              Join thousands of learners building their future.
            </h2>

            <form id="signupForm" className="signup-form" onSubmit={handleSubmit}>
              {/* Name Field (Needed for backend schema) */}
              <div className="signup-input-group">
                <label className="signup-label">Full Name</label>
                <div className="signup-input-container">
                  <input 
                    type="text" 
                    placeholder="Muntaha" 
                    className="signup-input" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="signup-input-group">
                <label className="signup-label">Email Address</label>
                <div className="signup-input-container">
                  <input 
                    type="email" 
                    placeholder="you@example.com" 
                    className="signup-input" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="signup-input-group">
                <label className="signup-label">Password</label>
                <div className="signup-input-container">
                  <input 
                    type="password" 
                    placeholder="Must be at least 6 characters" 
                    className="signup-input" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
                <p className="signup-hint">Use a mix of letters, numbers, and symbols for a strong password.</p>
              </div>

              {/* Confirm Password Field */}
              <div className="signup-input-group">
                <label className="signup-label">Confirm Password</label>
                <div className="signup-input-container">
                  <input 
                    type="password" 
                    placeholder="Re-type your password" 
                    className="signup-input" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required 
                  />
                </div>
              </div>

              {errorMsg && <p className="signup-error-message" style={{ display: 'block' }}>⚠️ {errorMsg}</p>}
              {successMsg && <p className="signup-success-message" style={{ display: 'block' }}>{successMsg}</p>}

              {/* Sign Up Button */}
              <button type="submit" className="signup-submit-button">
                Sign Up & Start Learning
              </button>
            </form>

            <p className="signup-login-text">
              Already have an account?
              <a href="/login" className="signup-login-link">Log In</a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
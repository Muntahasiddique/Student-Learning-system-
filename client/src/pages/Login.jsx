import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/login.css';
export default function Login() {
  return (
    <div className="login-page">
       <Header />
      
      <main className="login-main">
        {/* Background Wrapper */}
        <div className="login-wrapper">
          {/* Background Image Overlay */}
          <img src="/images/photo-1715538859909-914de12746b8.avif" alt="Background" className="login-bg-image" />
          
          {/* Aurora Glow Overlay */}
          <div className="login-glow-overlay">
            <div className="login-glow-circle login-glow-circle--left"></div>
            <div className="login-glow-circle login-glow-circle--right"></div>
          </div>
          
          {/* Login Card */}
          <div className="login-card">
            <h2 className="login-title">
              Welcome back! Ready to keep learning?
            </h2>
          
            <form id="loginForm" className="login-form">
              {/* Email */}
              <div className="login-input-group">
                <label className="login-label">Email Address</label>
                <div className="login-input-container">
                  <input type="email" id="loginEmail" placeholder="you@example.com" className="login-input" />
                  <i className="fas fa-envelope login-input-icon login-input-icon--email"></i>
                </div>
                <p className="login-error-message" id="loginEmailError">⚠️ Please enter a valid email.</p>
              </div>
          
              {/* Password */}
              <div className="login-input-group">
                <label className="login-label">Password</label>
                <div className="login-input-container">
                  <input type="password" id="loginPassword" placeholder="Must be at least 8 characters" className="login-input" />
                  <i className="fas fa-lock login-input-icon login-input-icon--password"></i>
                </div>
                <p className="login-hint">Use a mix of letters, numbers, and symbols for a strong password.</p>
                <p className="login-error-message" id="loginPasswordError">⚠️ Password must be at least 8 characters.</p>
              </div>
          
              {/* Submit */}
              <button type="submit" className="login-submit-button">
                Log In
              </button>
            </form>
          
            <p className="login-signup-text">
              Don't have an account?
              <a href="/signup" className="login-signup-link">Sign Up</a>
            </p>
          
            <p className="login-success-message" id="loginSuccess">✅ Welcome back! Redirecting to your dashboard...</p>
          </div>
        </div>
      </main>

       <Footer />
    </div>
  );
}
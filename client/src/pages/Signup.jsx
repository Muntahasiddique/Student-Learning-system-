import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/signup.css';
export default function Signup() {
  return (
    <div className="signup-page">
       <Header />
       
      <main className="signup-main">
        {/* Background Wrapper */}
        <div className="signup-wrapper">
          {/* Background Image */}
          <img src="/images/photo-1715538859909-914de12746b8.avif" alt="Background" className="signup-bg-image" />

          {/* Aurora Glow Overlay */}
          <div className="signup-glow-overlay">
            <div className="signup-glow-circle signup-glow-circle--left"></div>
            <div className="signup-glow-circle signup-glow-circle--right"></div>
          </div>

          {/* Signup Card */}
          <div className="signup-card">
            <h2 className="signup-title">
              Join thousands of learners building their future.
            </h2>

            <form id="signupForm" className="signup-form">
              {/* Email Field */}
              <div className="signup-input-group">
                <label className="signup-label">Email Address</label>
                <div className="signup-input-container">
                  <input type="email" id="signupEmail" placeholder="you@example.com" className="signup-input" />
                  <i className="fas fa-envelope signup-input-icon signup-input-icon--email"></i>
                </div>
                <p className="signup-error-message" id="signupEmailError">⚠️ Please enter a valid email.</p>
              </div>

              {/* Password Field */}
              <div className="signup-input-group">
                <label className="signup-label">Password</label>
                <div className="signup-input-container">
                  <input type="password" id="signupPassword" placeholder="Must be at least 8 characters" className="signup-input" />
                  <i className="fas fa-lock signup-input-icon signup-input-icon--password"></i>
                </div>
                <p className="signup-hint">Use a mix of letters, numbers, and symbols for a strong password.</p>
                <p className="signup-error-message" id="signupPasswordError">⚠️ Password must be at least 8 characters.</p>
              </div>

              {/* Confirm Password Field */}
              <div className="signup-input-group">
                <label className="signup-label">Confirm Password</label>
                <div className="signup-input-container">
                  <input type="password" id="confirmPassword" placeholder="Re-type your password" className="signup-input" />
                  <i className="fas fa-lock signup-input-icon signup-input-icon--confirm"></i>
                </div>
                <p className="signup-error-message" id="confirmPasswordError">⚠️ Passwords do not match.</p>
              </div>

              {/* Sign Up Button */}
              <button type="submit" className="signup-submit-button">
                Sign Up & Start Learning
              </button>
            </form>

            <p className="signup-login-text">
              Already have an account?
              <a href="/login" className="signup-login-link">Log In</a>
            </p>

            <p className="signup-error-message signup-error-message--required" id="signupRequiredError">⚠️ All fields are required.</p>
            <p className="signup-success-message" id="signupSuccess">✅ Account created successfully. Let's get started!</p>
          </div>
        </div>
      </main>

       <Footer />
    </div>
  );
}
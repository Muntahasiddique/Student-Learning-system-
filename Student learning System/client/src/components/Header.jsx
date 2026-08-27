import { Link } from 'react-router-dom';
import '../styles/header.css';
export default function Header() {
  // Temporary placeholder function so React doesn't crash
  const toggleDarkMode = () => {
    console.log("Dark mode toggled! You will need to build React state for this later.");
  };

  return (
    <header className="header">
      {/* Aurora Background */}
      <div className="header__aurora">
        <div className="header__aurora--left"></div>
        <div className="header__aurora--right"></div>
        <div className="header__aurora--center"></div>
      </div>

      <div className="header__container">
        {/* Logo */}
        <Link to="/" className="header__logo">
          <div className="header__logo-icon">
            <i className="fas fa-graduation-cap"></i>
          </div>
          <span className="header__logo-text">SLS</span>
        </Link>

        {/* Mobile Menu Button (visible on small screens) */}
        <button className="header__mobile-menu" aria-label="Toggle menu">
          <span className="header__mobile-menu-icon"></span>
        </button>

        {/* Desktop Navigation (hidden on mobile) */}
        <nav className="header__nav">
          <Link to="/" className="header__nav-link">
            <i className="fas fa-home"></i> <span className="nav-text">Home</span>
            <span className="header__nav-underline"></span>
          </Link>
          <Link to="/degree" className="header__nav-link">
            <i className="fas fa-university"></i> <span className="nav-text">Degrees</span>
            <span className="header__nav-underline"></span>
          </Link>
          <Link to="/courses" className="header__nav-link">
            <i className="fas fa-book-open"></i> <span className="nav-text">Courses</span>
            <span className="header__nav-underline"></span>
          </Link>
          <Link to="/forum" className="header__nav-link">
            <i className="fas fa-comments"></i> <span className="nav-text">Forum</span>
            <span className="header__nav-underline"></span>
          </Link>
          <Link to="/editor" className="header__nav-link">
            <i className="fas fa-code"></i> <span className="nav-text">Playground</span>
            <span className="header__nav-underline"></span>
          </Link>
        </nav>

        {/* Desktop Actions (hidden on mobile) */}
        <div className="header__actions">
          {/* Theme Toggle */}
          <div className="header__theme-toggle" onClick={toggleDarkMode}>
            <div className="header__theme-thumb"><i className="fas fa-moon" id="moon"></i></div>
          </div>

          {/* Login */}
          <Link to="/login" className="header__login">
            <i className="fas fa-sign-in-alt"></i> <span className="login-text">Log In</span>
          </Link>

          {/* Sign Up */}
          <Link to="/signup" className="header__signup">
            <span className="header__signup-glow"></span>
            <span className="header__signup-text">Sign Up Free</span>
            <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Menu (hidden by default) */}
      <div className="header__mobile-nav">
        <Link to="/" className="header__mobile-nav-link">
          <i className="fas fa-home"></i> Home
        </Link>
        <Link to="/degrees" className="header__mobile-nav-link">
          <i className="fas fa-university"></i> Degrees
        </Link>
        <Link to="/courses" className="header__mobile-nav-link">
          <i className="fas fa-book-open"></i> Courses
        </Link>
        <Link to="/forum" className="header__mobile-nav-link">
          <i className="fas fa-comments"></i> Forum
        </Link>
        <Link to="/playground" className="header__mobile-nav-link">
          <i className="fas fa-code"></i> Playground
        </Link>
        <div className="header__mobile-actions">
          <div className="header__mobile-theme-toggle" onClick={toggleDarkMode}>
            <i className="fas fa-moon"></i> Toggle Theme
          </div>
          <Link to="/login" className="header__mobile-login">
            <i className="fas fa-sign-in-alt"></i> Log In
          </Link>
          <Link to="/signup" className="header__mobile-signup">
            <i className="fas fa-user-plus"></i> Sign Up Free
          </Link>
        </div>
      </div>
    </header>
  );
}
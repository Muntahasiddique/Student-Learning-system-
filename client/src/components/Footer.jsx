import '../styles/footer.css';
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Newsletter Section */}
        <div className="footer__newsletter">
          <h2 className="footer__newsletter-title">Stay in the loop</h2>
          <p className="footer__newsletter-subtitle">Get the latest updates from SLS</p>
          <div className="footer__newsletter-form">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="footer__newsletter-input"
            />
            <button className="footer__newsletter-button">
              Subscribe
            </button>
          </div>
        </div>

        {/* Links Grid */}
        <div className="footer__links-grid">
          <div className="footer__links-column">
            <h3 className="footer__links-title">Quick Links</h3>
            <ul className="footer__links-list">
              <li><a href="/courses" className="footer__link">Courses</a></li>
              <li><a href="/about" className="footer__link">About Us</a></li>
              <li><a href="/contact" className="footer__link">Contact</a></li>
            </ul>
          </div>
          <div className="footer__links-column">
            <h3 className="footer__links-title">Support</h3>
            <ul className="footer__links-list">
              <li><a href="/help" className="footer__link">Help Center</a></li>
              <li><a href="/terms" className="footer__link">Terms</a></li>
              <li><a href="/privacy" className="footer__link">Privacy</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright & Social */}
        <div className="footer__bottom">
          <div className="footer__bottom-content">
            <div className="footer__copyright">
              © 2025 SLS. All rights reserved.
            </div>
            <div className="footer__social-links">
              <a href="#" className="footer__social-link">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="footer__social-link">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="footer__social-link">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
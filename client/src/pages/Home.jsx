import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/home.css';
export default function Home() {
  return (
    <div className="home-page">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="home-hero">
          {/* Glow Animation */}
          <div className="home-hero-glow">
            <div className="home-hero-glow-circle home-hero-glow-circle--left"></div>
            <div className="home-hero-glow-circle home-hero-glow-circle--right"></div>
          </div>
        
          <div className="home-hero-content">
            {/* Text Content */}
            <div className="home-hero-text">
              <h2 className="home-hero-title">
                Unlock Your Potential<br />
                <span className="home-hero-title-gradient">with Structured Learning</span>
              </h2>
              <p className="home-hero-subtitle">
                Learn smarter, not harder. Explore interactive labs, AI-powered tools, and peer collaboration – all in one place.
              </p>
              <div className="home-hero-buttons">
                <a href="/signup" className="home-hero-primary-button">Get Started for Free</a>
                <a href="/courses" className="home-hero-secondary-button">Explore Courses</a>
              </div>
            </div>
        
            {/* Image */}
            <div className="home-hero-image-container">
              <img id="hero-carousel-img" src="/images/undraw_online-learning_tgmv.svg" alt="Learning Illustration" className="home-hero-image" />
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="home-features">
          {/* Glows */}
          <div className="home-features-glow">
            <div className="home-features-glow-circle home-features-glow-circle--left"></div>
            <div className="home-features-glow-circle home-features-glow-circle--right"></div>
          </div>
        
          <div className="home-features-content">
            <h2 className="home-features-title">
              Explore Our <span className="home-features-title-gradient">Core Features</span>
            </h2>
        
            <div id="featureCards" className="home-features-cards">
              {/* Hands-on Labs Card */}
              <div className="home-feature-card home-feature-card--active">
                <div className="home-feature-card-content">
                  <img src="/images/undraw_conceptual-idea_cc76.svg" alt="Labs" className="home-feature-card-icon" />
                  <h3 className="home-feature-card-title">Hands-on Labs</h3>
                  <p className="home-feature-card-description">Practice coding with integrated Jupyter Labs and interactive code playgrounds tailored for learners.</p>
                  <a href="/editor" className="home-feature-card-button">Try Labs</a>
                </div>
              </div>
        
              {/* AI Assistance Card */}
              <div className="home-feature-card">
                <div className="home-feature-card-content">
                  <img src="/images/undraw_chat-bot_44el.svg" alt="AI Assistance" className="home-feature-card-icon" />
                  <h3 className="home-feature-card-title">AI Assistance</h3>
                  <p className="home-feature-card-description">Get instant help from built-in AI tutors and chat-based learning bots, available anytime.</p>
                  <a href="#" className="home-feature-card-button">Meet the AI</a>
                </div>
              </div>
        
              {/* Peer Learning Card */}
              <div className="home-feature-card">
                <div className="home-feature-card-content">
                  <img src="/images/undraw_notebook_8ihb.svg" alt="Peer Learning" className="home-feature-card-icon" />
                  <h3 className="home-feature-card-title">Peer Learning</h3>
                  <p className="home-feature-card-description">Join forums, collaborate on projects, and review assignments with your peers.</p>
                  <a href="#" className="home-feature-card-button">Join Peers</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="home-testimonials">
          {/* Background Glow Effects */}
          <div className="home-testimonials-glow">
            <div className="home-testimonials-glow-circle home-testimonials-glow-circle--left"></div>
            <div className="home-testimonials-glow-circle home-testimonials-glow-circle--right"></div>
          </div>
        
          <div className="home-testimonials-content">
            <h2 className="home-testimonials-title">
              <span className="home-testimonials-title-gradient">Hear From Our Students</span>
            </h2>
        
            <div className="home-testimonials-grid">
              {/* Testimonial Card 1 */}
              <div className="home-testimonial-card">
                <div className="home-testimonial-card-badge">
                  <svg className="home-testimonial-card-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.17 6A5.997 5.997 0 0 1 12 4c3.31 0 6 2.69 6 6 0 2.91-2.09 5.28-4.83 5.91l-.67.09v2.1c0 .55-.45 1-1 1s-1-.45-1-1v-3c0-.55.45-1 1-1h.67A4.992 4.992 0 0 0 17 10c0-2.76-2.24-5-5-5-1.29 0-2.47.49-3.37 1.29L7.17 6z"/>
                  </svg>
                </div>
                <p className="home-testimonial-card-text">
                  "SLS helped me go from zero to deploying machine learning projects on my own. The hands-on tools are next level."
                </p>
                <div className="home-testimonial-card-rating">
                  <span className="home-testimonial-card-star">★</span>
                  <span className="home-testimonial-card-star">★</span>
                  <span className="home-testimonial-card-star">★</span>
                  <span className="home-testimonial-card-star">★</span>
                  <span className="home-testimonial-card-star home-testimonial-card-star--half">★</span>
                </div>
                <div className="home-testimonial-card-author">
                  <img src="/images/images.jpeg" alt="Ayesha" className="home-testimonial-card-avatar" />
                  <div>
                    <p className="home-testimonial-card-name">Ayesha</p>
                    <span className="home-testimonial-card-role">BSCS Student</span>
                  </div>
                </div>
              </div>
        
              {/* Testimonial Card 2 */}
              <div className="home-testimonial-card">
                <div className="home-testimonial-card-badge">
                  <svg className="home-testimonial-card-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 7v6h-5l1.5-2H13v8H9v-8H6l1.5 2H3V7h18z" />
                  </svg>
                </div>
                <p className="home-testimonial-card-text">
                  "The forum and peer assignments made learning way more interactive! I never felt like I was learning alone."
                </p>
                <div className="home-testimonial-card-rating">
                  <span className="home-testimonial-card-star">★</span>
                  <span className="home-testimonial-card-star">★</span>
                  <span className="home-testimonial-card-star">★</span>
                  <span className="home-testimonial-card-star">★</span>
                  <span className="home-testimonial-card-star">★</span>
                </div>
                <div className="home-testimonial-card-author">
                  <img src="/images/istockphoto-482746131-612x612.jpg" alt="Zaid" className="home-testimonial-card-avatar" />
                  <div>
                    <p className="home-testimonial-card-name">Zaid</p>
                    <span className="home-testimonial-card-role">CS Enthusiast</span>
                  </div>
                </div>
              </div>
        
              {/* Testimonial Card 3 */}
              <div className="home-testimonial-card">
                <div className="home-testimonial-card-badge">
                  <svg className="home-testimonial-card-icon" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-2v4h-2V2h-4v4H8V2H6v4H2v2h4v2H2v2h4v2H2v2h4v2H2v2h4v4h2v-4h2v4h4v-4h2v4h2v-4h4v-2h-4v-2h4v-2h-4v-2h4v-2h-4v-2h4V6h-4V2z"/>
                  </svg>
                </div>
                <p className="home-testimonial-card-text">
                  "Absolutely love the AI tutor! It makes learning fast, focused, and surprisingly fun. Highly recommend."
                </p>
                <div className="home-testimonial-card-rating">
                  <span className="home-testimonial-card-star">★</span>
                  <span className="home-testimonial-card-star">★</span>
                  <span className="home-testimonial-card-star">★</span>
                  <span className="home-testimonial-card-star">★</span>
                  <span className="home-testimonial-card-star">★</span>
                </div>
                <div className="home-testimonial-card-author">
                  <img src="/images/istockphoto-1278976856-612x612.jpg" alt="Maria" className="home-testimonial-card-avatar" />
                  <div>
                    <p className="home-testimonial-card-name">Maria</p>
                    <span className="home-testimonial-card-role">AI & ML Student</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/dsaDetail.css';

export default function CourseDetail() {
  return (
    <div className="course-page">
      <Header />

      <div className="course-header">
        <h1 className="course-logo">SLS</h1>
        <a href="/dashboard" className="course-back-link">← Back to Dashboard</a>
      </div>

      <main className="course-main">
        {/* Sidebar Navigation */}
        <aside className="course-sidebar">
          <h2 className="course-sidebar-title">📚 Course Chapters</h2>
          <ul className="course-chapter-list">
            <li><a href="/chapter-1" className="course-chapter-link">1. Introduction to Arrays</a></li>
            <li><a href="/chapter-2" className="course-chapter-link">2. Linked Lists</a></li>
            <li><a href="/chapter-3" className="course-chapter-link">3. Stacks & Queues</a></li>
            <li><a href="/chapter-4" className="course-chapter-link">4. Trees</a></li>
            <li><a href="/chapter-5" className="course-chapter-link">5. Graphs</a></li>
            <li><a href="/chapter-6" className="course-chapter-link">6. Searching & Sorting</a></li>
          </ul>
        </aside>

        {/* Content Area */}
        <section className="course-content">
          <h2 className="course-content-title">Chapter Title Here</h2>
          <p className="course-content-intro">Learning objective introduction paragraph goes here...</p>

          {/* Materials */}
          <div className="course-materials">
            <div className="course-video-section">
              <h3 className="course-section-title">🎥 Watch Lecture Video</h3>
              <div className="course-video-container">
                <iframe 
                  className="course-video-iframe" 
                  src="https://www.youtube.com/embed/hBVJbzAagfs" 
                  frameBorder="0" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            
            <div className="course-resources-grid">
              <div className="course-resource-card">
                <h3 className="course-section-title">📥 Download Slides</h3>
                <a href="#" className="course-resource-link">Download PDF</a>
              </div>
              
              <div className="course-resource-card">
                <h3 className="course-section-title">📄 Read Notes</h3>
                <a href="#" className="course-resource-link">Open Markdown Notes</a>
              </div>
            </div>
          </div>

          {/* Completion Status */}
          <div className="course-completion-banner">
            <div className="course-completion-content">
              <span className="course-completion-icon">✓</span>
              <span className="course-completion-text">Completed: You've finished this chapter!</span>
            </div>
          </div>

          {/* Chatbot Tooltip */}
          <div className="course-chatbot">
            <div className="course-chatbot-icon-container">
              <div className="course-chatbot-icon">💬</div>
              <div className="course-chatbot-tooltip">
                "Need help understanding a topic? I'm here 24/7."
              </div>
            </div>
            <div className="course-chatbot-label">SLS AI Tutor</div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
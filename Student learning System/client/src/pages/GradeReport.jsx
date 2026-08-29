import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Gradereport.css';

export default function GradeReport() {
  return (
    <div className="course-progress-page">
      <Header />

      <main className="course-progress-main">
        {/* Header */}
        <div className="course-progress-header">
          <h2 className="course-progress-title">
            🧾 Your Grades at a Glance
          </h2>
          <p className="course-progress-subtitle">Track your course performance and progress easily.</p>
        </div>

        {/* Peer Graded Section */}
        <section className="course-progress-section">
          <h3 className="course-progress-section-title">📘 Peer Graded Assignments</h3>

          {/* Cards Layout */}
          <div className="course-progress-grid">
            {/* Assignment Card */}
            <div className="course-progress-card">
              {/* Glow Background Circle */}
              <div className="course-progress-card-glow course-progress-card-glow--completed"></div>
              
              {/* Header */}
              <div className="course-progress-card-header">
                <h4 className="course-progress-card-title">📌 Build a To-Do App</h4>
                <span className="course-progress-card-date">Apr 5, 2025</span>
              </div>
              
              {/* Info */}
              <p className="course-progress-card-info">Course: <span className="course-progress-card-course">Web Development Basics</span></p>
              
              {/* Grade Progress */}
              <div className="course-progress-card-grade">
                <div className="course-progress-card-percent">92%</div>
                <div className="course-progress-card-circle">
                  <svg className="course-progress-card-svg" viewBox="0 0 36 36">
                    <path className="course-progress-card-circle-bg" d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32" />
                    <path className="course-progress-card-circle-fill" d="M18 2a16 16 0 0 1 14.7 9" />
                  </svg>
                  <span className="course-progress-card-circle-text">92%</span>
                </div>
              </div>
            </div>

            {/* Pending Card */}
            <div className="course-progress-card">
              <div className="course-progress-card-glow course-progress-card-glow--pending"></div>

              <div className="course-progress-card-header">
                <h4 className="course-progress-card-title">🧠 The Ethics of AI</h4>
                <span className="course-progress-card-date">Apr 10, 2025</span>
              </div>

              <p className="course-progress-card-info">Course: <span className="course-progress-card-course">AI Foundations</span></p>

              <div className="course-progress-card-grade">
                <div className="course-progress-card-percent course-progress-card-percent--pending">Pending</div>
                <div className="course-progress-card-circle">
                  <svg className="course-progress-card-svg" viewBox="0 0 36 36">
                    <circle className="course-progress-card-circle-bg" cx="18" cy="18" r="16" />
                  </svg>
                  <span className="course-progress-card-circle-text">—</span>
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
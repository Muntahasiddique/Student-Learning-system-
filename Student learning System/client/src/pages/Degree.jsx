import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/degree.css';

export default function Degree() {
  return (
    <div className="cyber-page-wrapper">
        <Header/>
      {/* 1. Add the missing animated glowing background circles */}
      <div className="cyber-circle circle-1"></div>
      <div className="cyber-circle circle-2"></div>
      <div className="cyber-circle circle-3"></div>

      {/* 2. Add sample background binary code elements if needed */}
      <div className="binary-code" style={{ top: '10%', left: '5%' }}>0101010101</div>
      <div className="binary-code" style={{ top: '70%', right: '8%' }}>1010101010</div>

      <main className="cyber-container">
        <div className="cyber-header">
          <h1 className="cyber-title glitch-text" data-text="Bachelor of Science in Computer Science">
            Bachelor of Science in Computer Science
          </h1>
          <p className="cyber-subtitle">
            Master essential skills with our comprehensive curriculum designed for the modern developer
          </p>
        </div>

        {/* Your Grid and Cards */}
        <div className="cyber-grid">
          {/* Card 1 */}
          <div className="cyber-card">
            <div className="card-content">
              <div className="card-icon">
                <i className="fas fa-network-wired"></i>
              </div>
              <h3 className="card-title">Data Structures &amp; Algorithms</h3>
              <p className="card-desc">Master the building blocks of computer science and efficient problem-solving.</p>
            </div>
          </div>
          {/* Add your other cards here */}
        </div>
      </main>
      <Footer />
    </div>
  );
}
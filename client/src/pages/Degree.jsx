import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/degree.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Degree() {
  const [totalCredits, settotalCredits] = useState(0);
  const [gpa, setgpa] = useState(0);
  const [coursesCompleted, setcoursesCompleted] = useState(0);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState("");

  useEffect(() => {
    async function progress() {
      try {
        const token = localStorage.getItem('authtoken');
        if (!token) {
          seterror("You must log in to view your degree progress.");
          setloading(false);
          return;
        }
        
        const response = await axios.get('http://localhost:3000/api/degree/progress', {
          headers: { Authorization: "Bearer " + token }
        });
        
        setgpa(response.data.gpa);
        settotalCredits(response.data.totalCredits);
        setcoursesCompleted(response.data.coursesCompleted);
        setloading(false);
      } catch (error) {
        if (error.response) {
          seterror(error.response.data.message);
        } else {
          seterror("Could not connect to server. Please try again.");
        }
        setloading(false);
      }
    }
    progress();
  }, []);

  return (
    <div className="cyber-page-wrapper">
      <Header />
      
      <div className="cyber-circle circle-1"></div>
      <div className="cyber-circle circle-2"></div>
      <div className="cyber-circle circle-3"></div>

      <div className="binary-code binary-top-left">0101010101</div>
      <div className="binary-code binary-bottom-right">1010101010</div>

      <main className="cyber-container">
        <div className="cyber-header">
          <h1 className="cyber-title glitch-text" data-text="Bachelor of Science in Computer Science">
            Bachelor of Science in Computer Science
          </h1>
          <p className="cyber-subtitle">
            Master essential skills with our comprehensive curriculum designed for the modern developer
          </p>
        </div>

        {!error && !loading ? (
          <div className="cyber-grid">
            
            {/* Card 1: GPA */}
            <div className="cyber-card">
              <div className="card-content">
                <h3 className="card-title">Cumulative GPA</h3>
                <p className="card-desc stat-value gpa-text">
                  {gpa}
                </p>
              </div>
            </div>

            {/* Card 2: Credits */}
            <div className="cyber-card">
              <div className="card-content">
                <h3 className="card-title">Total Credits</h3>
                <p className="card-desc stat-value credits-text">
                  {totalCredits}
                </p>
              </div>
            </div>

            {/* Card 3: Courses Completed */}
            <div className="cyber-card">
              <div className="card-content">
                <h3 className="card-title">Courses Completed</h3>
                <p className="card-desc stat-value courses-text">
                  {coursesCompleted}
                </p>
              </div>
            </div>

          </div>
        ) : (
          <div className="error-container">
            <h2 className="error-text">{error}</h2>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
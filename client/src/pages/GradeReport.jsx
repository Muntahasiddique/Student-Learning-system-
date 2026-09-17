import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Gradereport.css';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

export default function GradeReport() {
  const [grades, setgrades] = useState([]);
    const [loading, setloading] = useState(false);
      const [error, seterror] = useState("");

useEffect(()=>{
  async function StudentsGrade() {
    try {
      const token = localStorage.getItem('authtoken');
const response = await axios.get('http://localhost:3000/api/grades/getreport',
  {
    headers : { Authorization : "Bearer " + token  }
  }
 
)
 setgrades(response.data.UserGrades);
 setloading(false);
    } catch (error) {
    if (error.response) {
    seterror(error.response.data.message);
  } else {
    seterror("Could not connect to server. Please try again.");
  }
  setloading(false)
  }
    
  }
  StudentsGrade();

},[])

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
           {loading && <p>Loading your grades...</p>}
{error && <p className="error-text">{error}</p>}
  {grades.map((grade)=>(
            <div className="course-progress-card" key={grade._id} >
              {/* Glow Background Circle */}
              <div className="course-progress-card-glow course-progress-card-glow--completed"></div>
              
              {/* Header */}
              <div className="course-progress-card-header">
              
<h4 className="course-progress-card-title">📌 {grade.assessmentName}</h4>
              
                
                <span className="course-progress-card-date"> {new Date(grade.createdAt).toLocaleDateString()} </span>
              </div>
              
              {/* Info */}
              <p className="course-progress-card-info">Course: <span className="course-progress-card-course">{grade.course.title} </span></p>
              
              {/* Grade Progress */}
              <div className="course-progress-card-grade">
                <div className="course-progress-card-percent">{grade.score}%</div>
                <div className="course-progress-card-circle">
                  <svg className="course-progress-card-svg" viewBox="0 0 36 36">
                    <path className="course-progress-card-circle-bg" d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32" />
                    <path className="course-progress-card-circle-fill" d="M18 2a16 16 0 0 1 14.7 9" />
                  </svg>
                  <span className="course-progress-card-circle-text">{grade.score}%</span>
                </div>
              </div>
            </div>
  ))}
           
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
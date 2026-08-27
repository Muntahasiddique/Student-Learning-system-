import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/courses-page.css';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Courses() {

const [courses , setcourses] = useState([]);
const [loading , setloading] = useState(true);
const [error, seterror] = useState("");

 useEffect(()=>{
  async function fetchCourses(){
  try {
    const response = await axios.get('http://localhost:3000/api/courses');
  
setcourses(response.data.courses);
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
fetchCourses()
},[])


  return (
    <div className="courses-page">
      <Header /> 

      <main className="courses-main">
        {/* Enhanced Background Glow */}
        <div className="courses-glow-background">
          <div className="courses-glow-circle courses-glow-circle--left"></div>
          <div className="courses-glow-circle courses-glow-circle--right"></div>
          <div className="courses-glow-circle courses-glow-circle--center"></div>
        </div>

        {/* Content Wrapper */}
        <div className="courses-content-wrapper">
          {/* Search Heading */}
          <div className="courses-search-heading">
            <div className="courses-rocket-icon">
              <img src="/images/undraw_to-the-stars_tz9v.svg" alt="Rocket Icon" className="courses-rocket-image" />
            </div>
            <div className="courses-heading-content">
              <h2 className="courses-main-heading">
                <span className="glitch-text" data-text="Explore Courses to Level Up">Explore Courses to Level Up</span>
              </h2>
              <p className="courses-subheading">Search by course, topic, or degree to unlock your next step.</p>
            </div>
          </div>

          {/* Enhanced Search Bar */}
          <div className="courses-search-container">
            <div className="courses-search-bar">
              <div className="courses-search-icon">
                <i className="fas fa-search"></i>
              </div>
              <input
                type="text"
                placeholder="Search by course, topic, or degree..."
                className="courses-search-input"
              />
              <button className="courses-search-button">
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>

          {/* Filters Section */}
          <section className="courses-filters-section">
            <h3 className="courses-filters-heading">
              <i className="fas fa-sliders-h courses-filters-icon"></i> 
              <span className="glitch-text" data-text="Filter Courses">Filter Courses</span>
            </h3>
            
            <div className="courses-filters-grid">
              {/* Enhanced Filter Cards */}
              <div className="courses-filter-card">
                <div className="filter-card-header">
                  <div className="filter-icon-wrapper">
                    <i className="fas fa-graduation-cap"></i>
                  </div>
                  <label htmlFor="degree" className="courses-filter-label">Degree Program</label>
                </div>
                <select id="degree" className="courses-filter-select courses-filter-select--degree" defaultValue="" aria-label="Degree Program">
                  <option value="" disabled>Select a degree</option>
                  <option>BS Computer Science</option>
                  <option>BS Data Science</option>
                  <option>BS AI</option>
                  <option>MS Computer Science</option>
                </select>
              </div>

              <div className="courses-filter-card">
                <div className="filter-card-header">
                  <div className="filter-icon-wrapper">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <label htmlFor="difficulty" className="courses-filter-label">Difficulty Level</label>
                </div>
                <select id="difficulty" className="courses-filter-select courses-filter-select--difficulty" defaultValue="" aria-label="Difficulty Level">
                  <option value="" disabled>Select difficulty</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>

              <div className="courses-filter-card">
                <div className="filter-card-header">
                  <div className="filter-icon-wrapper">
                    <i className="fas fa-book-open"></i>
                  </div>
                  <label htmlFor="category" className="courses-filter-label">Category</label>
                </div>
                <select id="category" className="courses-filter-select courses-filter-select--category" defaultValue="" aria-label="Category">
                  <option value="" disabled>Choose a subject</option>
                  <option>Programming</option>
                  <option>Machine Learning</option>
                  <option>Data Analysis</option>
                  <option>Cloud Computing</option>
                  <option>Cybersecurity</option>
                </select>
              </div>

              <div className="courses-filter-card">
                <div className="filter-card-header">
                  <div className="filter-icon-wrapper">
                    <i className="fas fa-tags"></i>
                  </div>
                  <label htmlFor="price" className="courses-filter-label">Price Range</label>
                </div>
                <select id="price" className="courses-filter-select courses-filter-select--price" defaultValue="" aria-label="Price Range">
                  <option value="" disabled>Choose price</option>
                  <option>Free</option>
                  <option>Premium</option>
                </select>
              </div>
            </div>
          </section>

          {/* Courses Grid Section */}
          <section className="courses-grid-section">
            <h3 className="courses-grid-heading">
              <i className="fas fa-star"></i> Featured Courses
            </h3>
            
            <div className="courses-grid">
               {courses.map((course)=>{
                return (              <div className="course-card" key={course._id} >
                <div className="course-card-badge">BESTSELLER</div>
                <div className="course-card-header">
                  <div className="course-card-icon">
                    <i className="fas fa-project-diagram"></i>
                  </div>
                  <h4 className="course-card-title">{course.title}</h4>
                </div>
                <p className="course-card-description"> {course.description}</p>
                <div className="course-card-meta">
                
  <span><i className="fas fa-clock"></i>{course.duration} </span>
  <span><i className="fas fa-layer-group"></i> {course.difficulty}</span>
  <span><i className="fas fa-tag"></i> {course.price}</span>
  <span><i className="fas fa-user-graduate"></i> {course.enrolledCount}</span>
  <span><i className="fas fa-star"></i>{course.rating}</span>

                </div>
                <div className="course-card-actions">
                  <button className="course-action-btn course-action-btn--view">
                    <i className="fas fa-eye"></i> Preview
                  </button>
                  <button className="course-action-btn course-action-btn--enroll">
                    <i className="fas fa-bolt"></i> Enroll
                  </button>
                </div>
                <a href="#" className="course-card-link">
                  <i className="fas fa-download"></i> Syllabus
                </a>
              </div>)

               })}
            </div>
          </section>

          {/* Empty State (Hidden when courses are shown) */}
          <section className="courses-empty-state" style={{ display: 'none' }}>
            <div className="courses-empty-icon">
              <i className="fas fa-search"></i>
            </div>
            <h4 className="courses-empty-title">No results found</h4>
            <p className="courses-empty-message">Try adjusting your filters or search keywords</p>
            <button className="courses-empty-button">
              Reset Filters
            </button>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
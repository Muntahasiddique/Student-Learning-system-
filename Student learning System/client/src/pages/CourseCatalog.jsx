import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/coursecatalog.css';

export default function CourseCatalog() {
  const [searchTerm, setSearchTerm] = useState('');

  // TODO (Week 2): fetch real courses from GET /api/courses
  const courses = []; // placeholder — will hold real course data later

  return (
    <div className="catalog-page">
      <Header />

      <main className="catalog-main">
        <div className="catalog-wrapper">
          <h1 className="catalog-title">Course Catalog</h1>
          <p className="catalog-subtitle">Browse all available courses</p>

          <input
            type="text"
            placeholder="Search courses..."
            className="catalog-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="catalog-grid">
            {courses.length === 0 ? (
              <p className="catalog-empty">No courses to show yet — this is just the UI shell for now.</p>
            ) : (
              courses.map((course) => (
                <div key={course._id} className="catalog-card">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <button className="catalog-view-button">View Details</button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
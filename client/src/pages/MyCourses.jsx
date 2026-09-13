import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/mycourses.css';
import axios from 'axios';

export default function MyCourses() {
 
const [enrolledcourses , setenrolledcourses] = useState([]);
const [loading , setloading] = useState(true);
const [error, seterror] = useState("");

useEffect(()=>{
const token = localStorage.getItem('authtoken');

async function myEnrolledCourses(){
    try {
        const response = await axios.get(`http://localhost:3000/api/my-enrollments`,{
           headers: { Authorization: "Bearer " + token }
        });
setenrolledcourses(response.data.myEnrolledcourses);
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
myEnrolledCourses();
},[])

async function handleUnenroll(courseId) {
    const token = localStorage.getItem('authtoken');
    if (!token) {
        seterror("Authentication error. Please log in again.");
        return;
    }

    try {
        // Axios delete only takes two arguments: URL and Config. No empty body {}.
        await axios.delete(`http://localhost:3000/api/unenroll/${courseId}`, {
            headers: { Authorization: "Bearer " + token }
        });

        // Instantly remove the unenrolled course from the UI
        // We filter out the course that matches the courseId we just deleted
setenrolledcourses(enrolledcourses.filter((enrollment) => enrollment.course._id !== courseId));

    } catch (error) {
        if (error.response) {
            seterror(error.response.data.message);
        } else {
            seterror("Could not connect to server. Please try again.");
        }
    }
}

  return (
    <div className="mycourses-page">
      <Header />

      <main className="mycourses-main">
        <div className="mycourses-wrapper">
          <h1 className="mycourses-title">My Enrolled Courses</h1>
          <p className="mycourses-subtitle">Courses you're currently enrolled in</p>

          <div className="mycourses-grid">
            {enrolledcourses.length === 0 ? (
              <p className="mycourses-empty">You haven't enrolled in any courses yet.</p>
            ) : (
              enrolledcourses.map((enrollment) => (
                <div key={enrollment._id} className="mycourses-card">
                  <h3>{enrollment.course.title}</h3>
                  <p>{enrollment.course.description}</p>
                  <button className="mycourses-unenroll-button" onClick={() => handleUnenroll(enrollment.course._id)} >Unenroll</button>
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
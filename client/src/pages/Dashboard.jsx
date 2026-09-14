import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/dashboard.css';
import { use, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Dashboard() {
const [user,setuser]=  useState(null);
const [loading,setloading]=  useState(true);
const [enrollmentCount, setEnrollmentCount] = useState();
const [enrollmentCourse, setEnrollmentCourse] = useState([]);


const navigate = useNavigate();

useEffect(()=>{
const token = localStorage.getItem('authtoken');
if(!token){
  navigate('/login');
  return;
}
async function getUserProfile(){
  try {
    const profileresponse =await axios.get(`http://localhost:3000/api/auth/me`,{
headers :{Authorization: "Bearer " + token}
})
  setuser(profileresponse.data);

  const enrollmentresponse = await axios.get(`http://localhost:3000/api/my-enrollments`, {
      headers: { Authorization: "Bearer " + token }
    });
    setEnrollmentCount(enrollmentresponse.data.myEnrolledcourses.length);
const courseData = enrollmentresponse.data.myEnrolledcourses || enrollmentresponse.data;
setEnrollmentCourse(courseData);
  setloading(false);
  

  } catch (error) {
    if(error.response){
   console.log(error.response.data.message);
}else{
    alert("Could not connect to server. Please try again.");
    setloading(false);

}
  }

}
  getUserProfile();

},[]);

if (loading) return <div className="dashboard-loading">Loading Profile...</div>;
  
  return (
    <div className="dashboard-page">
      <Header />

      <main className="dashboard-main">
        <div className="dashboard-wrapper">
          <div className="dashboard-card">
            <h1 className="dashboard-title">Welcome back, {user.name}!</h1>
            <p className="dashboard-subtitle">You're logged in to your Student Learning System dashboard.</p>

            <div className="dashboard-grid">
              <div className="dashboard-stat-card">
                <h3>Enrolled Courses</h3>
                <p className="dashboard-stat-number">{enrollmentCount}</p>
              </div>
              <div className="dashboard-stat-card">
                <h3>Grades</h3>
                <p className="dashboard-stat-number">--</p>
              </div>
              <div className="dashboard-stat-card">
                <h3>Degree Progress</h3>
                <p className="dashboard-stat-number">--</p>
              </div>
            </div>

            <div className="dashboard-recent-courses">
              <h2>Your Recent Courses</h2>
              <hr className="dashboard-divider" />
              
              {enrollmentCourse.length === 0 ? (
                <p>You haven't enrolled in any courses yet.</p>
              ) : (
                <div className="dashboard-course-list">
                 {enrollmentCourse.slice(0, 3).map((enrollment) => (
  <div key={enrollment._id} className="dashboard-course-card">
    {/* Notice the added .course here */}
    <h3 className="dashboard-course-title">{enrollment.course.title}</h3>
    <p className="dashboard-course-desc">{enrollment.course.description}</p>
  </div>
))}
                </div>
              )}
            </div>
            
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/dashboard.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
const navigate = useNavigate();
  // TODO: your protected-route check goes here
  // (useEffect + localStorage token check + navigate('/login') if missing)
const token  = localStorage.getItem('authtoken');
useEffect(()=>{
if(!token){
navigate('/login');
}
},[token])

  return (
    <div className="dashboard-page">
      <Header />

      <main className="dashboard-main">
        <div className="dashboard-wrapper">
          <div className="dashboard-card">
            <h1 className="dashboard-title">Welcome back!</h1>
            <p className="dashboard-subtitle">You're logged in to your Student Learning System dashboard.</p>

            <div className="dashboard-grid">
              <div className="dashboard-stat-card">
                <h3>Enrolled Courses</h3>
                <p className="dashboard-stat-number">--</p>
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

            <p className="dashboard-note">Real data coming in Week 3 — this is just the shell for now.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
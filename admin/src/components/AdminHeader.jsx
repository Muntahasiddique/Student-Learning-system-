import { useNavigate } from 'react-router-dom';
import '../styles/admin-header.css';

export default function AdminHeader() {
  const navigate = useNavigate();

  function handleLogout() {
    // 1. Wipe the authentication data
    localStorage.removeItem('authtoken');
    localStorage.removeItem('userRole');
    
    // 2. Redirect back to the login page
    // Note: If your main login is strictly on port 5173, use: 
    // window.location.href = 'http://localhost:5173/login';
    navigate('/login'); 
  }

  return (
    <header className="admin-header-nav">
      <div className="admin-header-logo">🎓 SLS Admin Control</div>
      <div className="admin-header-actions">
        <span className="admin-header-user">Admin Mode</span>
        {/* 3. Attach the click event to your button */}
        <button className="admin-header-logout" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </header>
  );
}
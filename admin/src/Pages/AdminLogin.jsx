import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/adminpanel.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password
      });

     // Security Gate: Check all possible locations for the role
      const rawRole = response.data.user?.role || response.data.role || '';
      const userRole = rawRole.toLowerCase();
      
      if (userRole !== 'teacher' && userRole !== 'admin' && userRole !== 'instructor') {
        setError("Unauthorized access. Admin privileges required.");
        setLoading(false);
        return;
      }

      // Save the token to the Admin App's isolated localStorage
      localStorage.setItem('authtoken', response.data.token);
      
      // Redirect to the Admin Dashboard
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="admin-dashboard" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ background: '#1e293b', padding: '3rem', borderRadius: '8px', width: '100%', maxWidth: '400px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)' }}>
        <h2 className="admin-title" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          <span className="admin-title-gradient">Admin Access</span>
        </h2>
        <p className="admin-subtitle" style={{ textAlign: 'center', marginBottom: '2rem' }}>Sign in to manage the platform</p>
        
        {error && <div style={{ color: '#ef4444', background: '#450a0a', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Email Address</label>
            <input 
              type="email" 
              className="admin-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              style={{ width: '100%', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Password</label>
            <input 
              type="password" 
              className="admin-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              style={{ width: '100%', boxSizing: 'border-box' }}
            />
          </div>
          <button 
            type="submit" 
            className="admin-submit-button" 
            disabled={loading}
            style={{ marginTop: '1rem', width: '100%', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Authenticating...' : 'Secure Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
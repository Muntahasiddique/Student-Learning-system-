import '../styles/adminpanel.css';
import AdminHeader from '../components/AdminHeader';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalCourses: 0 });
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', category: '', price: 0 });

useEffect(() => {
    async function fetchDashboardData() {
      try {
        const token = localStorage.getItem('authtoken');
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        const statsResponse = await axios.get('http://localhost:3000/api/admin/stats', config);
        setStats(statsResponse.data);

        const usersResponse = await axios.get('http://localhost:3000/api/admin/users', config);
        setUsers(usersResponse.data);

        const coursesResponse = await axios.get('http://localhost:3000/api/admin/courses', config);
        setCourses(coursesResponse.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    }
    fetchDashboardData();
  }, []);

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course? This action cannot be undone.")) return;
    
    try {
      const token = localStorage.getItem('authtoken');
      await axios.delete(`http://localhost:3000/api/admin/courses/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Remove the deleted course from the React state instantly
      setCourses(courses.filter(course => course._id !== courseId));
      // Optionally decrement the stats counter
      setStats(prev => ({ ...prev, totalCourses: prev.totalCourses - 1 }));
    } catch (error) {
      console.error("Failed to delete course:", error);
      alert("Error deleting course.");
    }
  };

// Triggers edit mode and pre-fills the input boxes
  const startEditing = (course) => {
    setEditingCourseId(course._id);
    setEditForm({ title: course.title, category: course.category, price: course.price });
  };

  // Submits the full object to the backend and closes edit mode
  const submitEdit = async (courseId) => {
    try {
      const token = localStorage.getItem('authtoken');
      const response = await axios.put(`http://localhost:3000/api/admin/courses/${courseId}`, 
        editForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Update the UI array with the new database record
      setCourses(courses.map(c => c._id === courseId ? response.data : c));
      setEditingCourseId(null); // Close the editor
    } catch (error) {
      console.error("Failed to update course:", error);
      alert("Error updating course.");
    }
  };

// Suspend (Delete) User
  const handleSuspendUser = async (userId) => {
    if (!window.confirm("Are you sure you want to suspend this user? They will be removed from the system.")) return;
    
    try {
      const token = localStorage.getItem('authtoken');
      await axios.delete(`http://localhost:3000/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.filter(user => user._id !== userId));
      setStats(prev => ({ ...prev, totalUsers: prev.totalUsers - 1 }));
    } catch (error) {
      console.error("Failed to suspend user:", error);
      alert("Error suspending user.");
    }
  };

  // Quick Edit User Role
  const handleEditUserRole = async (user) => {
    const newRole = window.prompt(`Enter new role for ${user.name} (Current: ${user.role}):\nOptions: student, teacher, admin`, user.role);
    
    if (!newRole || newRole === user.role) return;

    try {
      const token = localStorage.getItem('authtoken');
      const response = await axios.put(`http://localhost:3000/api/admin/users/${user._id}`, 
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setUsers(users.map(u => u._id === user._id ? response.data : u));
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("Error updating user.");
    }
  };
  return (
    <div className="admin-dashboard">
      <AdminHeader/>
    
      {/* Main Content */}
      <main className="admin-main">
        {/* Dashboard Header */}
        <div className="admin-header">
          <div>
            <h1 className="admin-title">
              <span className="admin-title-gradient">Admin Dashboard</span>
            </h1>
            <p className="admin-subtitle">Manage your learning platform with precision</p>
          </div>
          <div className="admin-status">
            <div className="admin-status-indicator"></div>
            <span className="admin-status-text">Admin Mode Active</span>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card admin-stat-card--users">
            <div className="admin-stat-label">Total Users</div>
            <div className="admin-stat-value">{stats.totalUsers}</div>
            <div className="admin-stat-trend">↑ 12% this month</div>
          </div>
          <div className="admin-stat-card admin-stat-card--courses">
            <div className="admin-stat-label">Active Courses</div>
            <div className="admin-stat-value">{stats.totalCourses}</div>
            <div className="admin-stat-trend">↑ 3 new this week</div>
          </div>
          <div className="admin-stat-card admin-stat-card--approvals">
            <div className="admin-stat-label">Pending Approvals</div>
            <div className="admin-stat-value">12</div>
            <div className="admin-stat-trend admin-stat-trend--warning">Requires attention</div>
          </div>
          <div className="admin-stat-card admin-stat-card--health">
            <div className="admin-stat-label">System Health</div>
            <div className="admin-stat-value">100%</div>
            <div className="admin-stat-trend">All systems normal</div>
          </div>
        </div>

        {/* User Management */}
        <section className="admin-section">
          <div className="admin-section-header">
            <h2 className="admin-section-title">
              <span className="admin-section-icon admin-section-icon--users">👥</span>
              User Management
            </h2>
          </div>
          <div className="admin-section-content">
            <form className="admin-search-form" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Search users..." className="admin-search-input" />
              <select className="admin-select" defaultValue="All Roles" aria-label="Filter by Role">
                <option>All Roles</option>
                <option>Student</option>
                <option>Instructor</option>
                <option>Admin</option>
              </select>
              <select className="admin-select" defaultValue="All Statuses" aria-label="Filter by Status">
                <option>All Statuses</option>
                <option>Active</option>
                <option>Suspended</option>
              </select>
              <button type="submit" className="admin-search-button">
                Search Users
              </button>
            </form>

            {/* User Table */}
        <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th className="admin-table-header">Name</th>
                    <th className="admin-table-header">Email</th>
                    <th className="admin-table-header">Role</th>
                    <th className="admin-table-header">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user._id} className="admin-table-row">
                        <td className="admin-table-cell">
                          <div className="admin-user-cell">
                            <div className="admin-user-avatar">
                              {user.name.substring(0, 2).toUpperCase()}
                            </div>
                            <div className="admin-user-info">
                              <div className="admin-user-name">{user.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="admin-table-cell">{user.email}</td>
                        <td className="admin-table-cell">
                          <span className={`admin-role-badge admin-role-badge--${user.role?.toLowerCase() || 'student'}`}>
                            {user.role}
                          </span>
                        </td>
                       <td className="admin-table-cell">
  <button 
    className="admin-action-button admin-action-button--edit" 
    type="button"
    onClick={() => handleEditUserRole(user)}
  >
    Edit Role
  </button>
  <button 
    className="admin-action-button admin-action-button--suspend" 
    type="button"
    onClick={() => handleSuspendUser(user._id)}
  >
    Suspend
  </button>
</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{textAlign: 'center', padding: '2rem', color: '#94a3b8'}}>
                        Loading users...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

      {/* Course Management */}
        <section className="admin-section">
          <div className="admin-section-header">
            <h2 className="admin-section-title">
              <span className="admin-section-icon admin-section-icon--courses">📚</span>
              Course Management
            </h2>
          </div>
          <div className="admin-section-content">
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th className="admin-table-header">Course Title</th>
                    <th className="admin-table-header">Category</th>
                    <th className="admin-table-header">Price</th>
                    <th className="admin-table-header">Actions</th>
                  </tr>
                </thead>
                <tbody>
                 {courses.length > 0 ? (
                    courses.map((course) => (
                      <tr key={course._id} className="admin-table-row">
                        {editingCourseId === course._id ? (
                          /* EDIT MODE ROW */
                          <>
                            <td className="admin-table-cell">
                              <input 
                                type="text" 
                                value={editForm.title} 
                                onChange={e => setEditForm({...editForm, title: e.target.value})} 
                                style={{width: '100%', padding: '4px', borderRadius: '4px', border: '1px solid #ccc'}} 
                              />
                            </td>
                            <td className="admin-table-cell">
                              <input 
                                type="text" 
                                value={editForm.category} 
                                onChange={e => setEditForm({...editForm, category: e.target.value})} 
                                style={{width: '100%', padding: '4px', borderRadius: '4px', border: '1px solid #ccc'}} 
                              />
                            </td>
                            <td className="admin-table-cell">
                              <input 
                                type="number" 
                                value={editForm.price} 
                                onChange={e => setEditForm({...editForm, price: Number(e.target.value)})} 
                                style={{width: '80px', padding: '4px', borderRadius: '4px', border: '1px solid #ccc'}} 
                              />
                            </td>
                            <td className="admin-table-cell" style={{ display: 'flex', gap: '8px' }}>
                              <button 
                                onClick={() => submitEdit(course._id)} 
                                className="admin-action-button admin-action-button--edit"
                                style={{ backgroundColor: '#10b981', color: 'white' }}
                              >
                                Save
                              </button>
                              <button 
                                onClick={() => setEditingCourseId(null)} 
                                className="admin-action-button admin-action-button--delete"
                                style={{ backgroundColor: '#64748b', color: 'white' }}
                              >
                                Cancel
                              </button>
                            </td>
                          </>
                        ) : (
                          /* NORMAL VIEW ROW */
                          <>
                            <td className="admin-table-cell" style={{ fontWeight: '500' }}>
                              {course.title}
                            </td>
                            <td className="admin-table-cell">
                              <span className="admin-category-badge">{course.category}</span>
                            </td>
                            <td className="admin-table-cell">
                              {course.price === 0 ? 'Free' : `$${course.price}`}
                            </td>
                            <td className="admin-table-cell">
                              <button 
                                className="admin-action-button admin-action-button--edit" 
                                type="button"
                                onClick={() => startEditing(course)}
                              >
                                Edit
                              </button>
                              <button 
                                className="admin-action-button admin-action-button--delete" 
                                type="button"
                                onClick={() => handleDeleteCourse(course._id)}
                              >
                                Delete
                              </button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{textAlign: 'center', padding: '2rem', color: '#94a3b8'}}>
                        Loading courses...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Content Approvals */}
        <section className="admin-section">
          <div className="admin-section-header">
            <h2 className="admin-section-title">
              <span className="admin-section-icon admin-section-icon--approvals">✅</span>
              Pending Approvals
            </h2>
          </div>
          <div className="admin-section-content">
            <div className="admin-approval-list">
              <div className="admin-approval-item">
                <div>
                  <div className="admin-approval-title">&quot;Data Structures - Chapter 5&quot;</div>
                  <div className="admin-approval-meta">Submitted by Prof. Ahmed Raza • 2 days ago</div>
                </div>
                <div className="admin-approval-actions">
                  <button className="admin-approval-button admin-approval-button--approve" type="button">Approve</button>
                  <button className="admin-approval-button admin-approval-button--reject" type="button">Reject</button>
                  <button className="admin-approval-button admin-approval-button--preview" type="button">Preview</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* System Reports */}
        <section className="admin-section">
          <div className="admin-section-header">
            <h2 className="admin-section-title">
              <span className="admin-section-icon admin-section-icon--reports">📊</span>
              System Reports
            </h2>
          </div>
          <div className="admin-section-content">
            <div className="admin-reports-grid">
              <div className="admin-reports-column">
                <h3 className="admin-subsection-title">Export Data</h3>
                <div className="admin-export-list">
                  <button className="admin-export-button" type="button">
                    <span>User Data (CSV)</span>
                    <svg className="admin-export-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                    </svg>
                  </button>
                  <button className="admin-export-button" type="button">
                    <span>Course Analytics (PDF)</span>
                    <svg className="admin-export-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="admin-reports-column">
                <h3 className="admin-subsection-title">Recent Activity</h3>
                <div className="admin-activity-list">
                  <div className="admin-activity-item">
                    <div className="admin-activity-text">New user registration: <span className="admin-activity-highlight">Zara Khan</span></div>
                    <div className="admin-activity-time">10 minutes ago</div>
                  </div>
                  <div className="admin-activity-item">
                    <div className="admin-activity-text">Course updated: <span className="admin-activity-highlight admin-activity-highlight--success">OOP Fundamentals</span></div>
                    <div className="admin-activity-time">2 hours ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Status Message */}
        <div className="admin-status-message">
          <div className="admin-status-icon"></div>
          <div>
            <h4 className="admin-status-title">System is operating normally</h4>
            <p className="admin-status-description">All services are running smoothly. Last updated: Just now</p>
          </div>
        </div>
      </main>

    </div>
  );
}
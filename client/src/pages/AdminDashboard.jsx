import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/adminpanel.css';

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <Header />   
    
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
            <div className="admin-stat-value">1,248</div>
            <div className="admin-stat-trend">↑ 12% this month</div>
          </div>
          <div className="admin-stat-card admin-stat-card--courses">
            <div className="admin-stat-label">Active Courses</div>
            <div className="admin-stat-value">47</div>
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
                  <tr className="admin-table-row">
                    <td className="admin-table-cell">
                      <div className="admin-user-cell">
                        <div className="admin-user-avatar">AM</div>
                        <div className="admin-user-info">
                          <div className="admin-user-name">Ayesha Malik</div>
                          <div className="admin-user-username">@ayesha_m</div>
                        </div>
                      </div>
                    </td>
                    <td className="admin-table-cell">ayesha@example.com</td>
                    <td className="admin-table-cell">
                      <span className="admin-role-badge admin-role-badge--student">Student</span>
                    </td>
                    <td className="admin-table-cell">
                      <button className="admin-action-button admin-action-button--edit" type="button">Edit</button>
                      <button className="admin-action-button admin-action-button--suspend" type="button">Suspend</button>
                    </td>
                  </tr>
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
              Course Control
            </h2>
          </div>
          <div className="admin-section-content">
            <div className="admin-course-grid">
              <div className="admin-course-form">
                <h3 className="admin-subsection-title">Create New Course</h3>
                <input type="text" placeholder="Course Title" className="admin-input" />
                <select className="admin-select" defaultValue="Select Instructor" aria-label="Select Instructor">
                  <option>Select Instructor</option>
                  <option>Prof. Ahmed Raza</option>
                  <option>Dr. Fatima Khan</option>
                </select>
                <textarea placeholder="Course Description" rows="4" className="admin-textarea"></textarea>
                <button type="button" className="admin-submit-button">
                  Create Course
                </button>
              </div>
              <div className="admin-course-list">
                <h3 className="admin-subsection-title">Existing Courses</h3>
                <div className="admin-course-list-container">
                  <div className="admin-course-item">
                    <div>
                      <div className="admin-course-name">OOP Fundamentals</div>
                      <div className="admin-course-instructor">Prof. Ahmed Raza</div>
                    </div>
                    <div className="admin-course-actions">
                      <button className="admin-action-button admin-action-button--edit" type="button">Edit</button>
                      <button className="admin-action-button admin-action-button--delete" type="button">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
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

      <Footer />
    </div>
  );
}
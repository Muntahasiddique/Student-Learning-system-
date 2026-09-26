import '../styles/admin-header.css';

export default function AdminHeader() {
  return (
    <header className="admin-header-nav">
      <div className="admin-header-logo">🎓 SLS Admin Control</div>
      <div className="admin-header-actions">
        <span className="admin-header-user">Admin Mode</span>
        <button className="admin-header-logout">Sign Out</button>
      </div>
    </header>
  );
}
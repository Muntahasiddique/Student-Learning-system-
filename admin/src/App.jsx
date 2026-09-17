import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './Pages/AdminDashboard'; // Fixed relative path

function App() {
  return (
    <Router>
      <Routes>
        {/* Changed path to root so it catches the redirect from port 5173 */}
        <Route path="/" element={<AdminDashboard />} /> 
      </Routes>
    </Router>
  )
}

export default App;
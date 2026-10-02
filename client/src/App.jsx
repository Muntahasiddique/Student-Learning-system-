import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 1. IMPORT YOUR BOUNCER HERE
import ProtectedRoute from './components/ProtectedRoute'; 

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Courses from './pages/Courses';
import Degree from './pages/Degree';
import Forum from './pages/Forum';
import CodeEditor from './pages/CodeEditor';
import GradeReport from './pages/GradeReport';
import CourseDetail from './pages/CourseDetail';
import Dashboard from './pages/Dashboard';
import MyCourses from './pages/MyCourses';
import ThreadDetail from './pages/ThreadDetail';
import AITutor from './pages/AITutor';


export default function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES: Anyone on the internet can see these */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/forum/:id" element={<ThreadDetail />} />
        {/* PRIVATE ROUTES: Only logged-in users with a token can enter */}
<Route path="/ai-tutor" element={
  <ProtectedRoute>
    <AITutor />
  </ProtectedRoute>
} />

        {/* PRIVATE ROUTES: Only logged-in users with a token can enter */}
        <Route path="/editor" element={
          <ProtectedRoute>
            <CodeEditor />
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/my-courses" element={
          <ProtectedRoute>
            <MyCourses />
          </ProtectedRoute>
        } />
        
        <Route path="/grades" element={
          <ProtectedRoute>
            <GradeReport />
          </ProtectedRoute>
        } />
        
        <Route path="/degree" element={
          <ProtectedRoute>
            <Degree />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all your converted pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Courses from './pages/Courses';
import Degree from './pages/Degree';
import Forum from './pages/Forum';
import CodeEditor from './pages/CodeEditor';
import GradeReport from './pages/GradeReport';
import CourseDetail from './pages/CourseDetail';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/degree" element={<Degree />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/editor" element={<CodeEditor />} />
        <Route path="/grades" element={<GradeReport />} />
        <Route path="/content/:subjectId" element={<CourseDetail />} />
       
      </Routes>
    </Router>
  );
}
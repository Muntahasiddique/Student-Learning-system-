import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Import all global stylesheets in your original sequence
import './styles/shared.css';
import './styles/animations.css';
import './styles/degree.css';
import './styles/code-editor.css';
import './styles/forum.css';
import './styles/header.css';
import './styles/footer.css';
import './styles/login.css';
import './styles/signup.css';
import './styles/dsaDetail.css';
import './styles/courses-page.css';
import './styles/Gradereport.css';

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
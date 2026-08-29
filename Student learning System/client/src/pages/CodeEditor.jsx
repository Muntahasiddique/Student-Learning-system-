import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/code-editor.css';

export default function CodeEditor() {
  return (
    <div className="code-editor-body">
      <Header />   

      <main className="code-editor-main">
        {/* Floating Astronaut Animation */}
        <div className="floating-astronaut-container">
          <img src="/images/undraw_code-review_ept3.svg" alt="Floating Astronaut" className="floating-astronaut" />
        </div>

        {/* Header with Gradient Accent */}
        <div className="editor-header">
          <div className="gradient-accent">
            <span className="emoji-icon">👨‍💻</span>
          </div>
          <h2 className="header-title">
            <span className="gradient-text">
              Interactive Code Lab
            </span>
            <span className="header-subtitle">Practice Makes Perfect</span>
          </h2>
        </div>

        {/* Editor Panel */}
        <div className="editor-panel">
          <label htmlFor="code" className="editor-label">Code Editor</label>
          <textarea 
            id="code" 
            rows="12" 
            placeholder="// Write your code here…" 
            className="code-textarea"
            defaultValue=""
            spellCheck="false">
          </textarea>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button 
              title="Clear the editor to start fresh" 
              className="reset-button"
              type="button">
              Reset
            </button>
            <button 
              title="Run your code and see output below" 
              className="run-button"
              type="button">
              Run Code
            </button>
          </div>

          {/* Output Console */}
          <div className="output-console">
            <label className="console-label">Output Console</label>
            <div className="console-output success">
              ✅ Code executed successfully!
              <br /><br />
              Hello, world!
            </div>
          </div>
        </div>

        <div className="language-selector-container">
          <label className="language-selector-label">Programming Language</label>
          <select className="language-selector-dropdown" defaultValue="JavaScript" aria-label="Programming Language">
            <option className="language-option" value="JavaScript">JavaScript</option>
            <option className="language-option" value="Python">Python</option>
            <option className="language-option" value="Java">Java</option>
            <option className="language-option" value="C++">C++</option>
            <option className="language-option" value="Go">Go</option>
          </select>
        </div>
      </main>

      <Footer />
    </div>
  );
}
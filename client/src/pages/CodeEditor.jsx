import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/code-editor.css';

// Only JavaScript can run in this build (in the browser, inside a Web Worker).
// Piston's public API went whitelist-only on 2026-02-15 and Judge0 needs a card,
// so the other languages are listed but cannot be executed.
const LANGUAGES = ["JavaScript", "Python", "Java", "C++", "Go"];
const RUNNABLE = ["JavaScript"];

const RUN_TIMEOUT_MS = 3000;

function runJavaScript(code) {
  return new Promise((resolve, reject) => {
    const workerSource = `
      const MAX_LINES = 1000;
      const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

      function fmt(v) {
        if (typeof v === 'string') return v;
        try {
          const s = JSON.stringify(v);
          return s === undefined ? String(v) : s;
        } catch (e) {
          return String(v);
        }
      }

      onmessage = async (e) => {
        const logs = [];
        const capture = (...args) => {
          if (logs.length < MAX_LINES) logs.push(args.map(fmt).join(' '));
        };
        console.log = capture;
        console.info = capture;
        console.warn = capture;
        console.error = capture;

        try {
          await new AsyncFunction(e.data)();
          postMessage({ logs });
        } catch (err) {
          postMessage({ logs, error: err && err.message ? err.message : String(err) });
        }
      };
    `;

    const url = URL.createObjectURL(new Blob([workerSource], { type: 'text/javascript' }));
    const worker = new Worker(url);

    const cleanup = () => {
      clearTimeout(timer);
      worker.terminate();
      URL.revokeObjectURL(url);
    };

    const timer = setTimeout(() => {
      cleanup();
      reject(new Error(`Timed out after ${RUN_TIMEOUT_MS / 1000}s (possible infinite loop).`));
    }, RUN_TIMEOUT_MS);

    worker.onmessage = (e) => {
      cleanup();
      resolve(e.data);
    };
    worker.onerror = (e) => {
      cleanup();
      reject(new Error(e.message || 'The code could not be run.'));
    };

    worker.postMessage(code);
  });
}

export default function CodeEditor() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("JavaScript");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("Untitled Snippet");
  const [saving, setSaving] = useState(false);

async function handleSave() {
    if (!code.trim()) {
      setError("Cannot save an empty snippet.");
      return;
    }
    
    setSaving(true);
    setError(""); // Clear any previous errors before trying again
    try {
      const token = localStorage.getItem('authtoken');
      if (!token) throw new Error("You must be logged in to save code.");

      // You were missing "const response =" on this line
      const response = await fetch("http://localhost:3000/api/snippets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title, code, language })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Server Error: ${response.status}`);
      }
      
      setOutput(`✅ Snippet "${title}" saved successfully!`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleRun() {
    setError("");
    setOutput("");

    if (!RUNNABLE.includes(language)) {
      setError(`Running ${language} isn't available in this build. Only JavaScript runs, in your browser.`);
      return;
    }
    if (!code.trim()) {
      setError("Write some code first.");
      return;
    }

    setLoading(true);
    try {
      const { logs, error: runError } = await runJavaScript(code);
      if (logs.length) setOutput(logs.join("\n"));
      if (runError) setError(runError);
      else if (!logs.length) setOutput("(no output)");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setCode("");
    setOutput("");
    setError("");
  }

  return (
    <div className="code-editor-body">
      <Header />
      <main className="code-editor-main">
        <div className="floating-astronaut-container">
          <img src="/images/undraw_code-review_ept3.svg" alt="Floating Astronaut" className="floating-astronaut" />
        </div>

        <div className="editor-header">
          <div className="gradient-accent">
            <span className="emoji-icon">👨‍💻</span>
          </div>
          <h2 className="header-title">
            <span className="gradient-text">Interactive Code Lab</span>
            <span className="header-subtitle">Practice Makes Perfect</span>
          </h2>
        </div>

        <div className="editor-panel">
          <label htmlFor="code" className="editor-label">Code Editor</label>
          <textarea
            id="code"
            rows="12"
            placeholder="// Write your code here… (e.g. console.log('Hello World');)"
            className="code-textarea"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck="false"
          ></textarea>
<div className="action-buttons" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Snippet Title"
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', flex: 1 }}
            />
            <button
              title="Save your code to your profile"
              className="run-button"
              type="button"
              onClick={handleSave}
              disabled={saving}
              style={{ backgroundColor: '#10b981' }}
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              title="Clear the editor to start fresh"
              className="reset-button"
              type="button"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              title="Run your code and see output below"
              className="run-button"
              type="button"
              onClick={handleRun}
              disabled={loading}
            >
              {loading ? "Running..." : "Run Code"}
            </button>
          </div>
          

          <div className="output-console">
            <label className="console-label">Output Console</label>
            <div className={`console-output ${error ? "error" : "success"}`} style={{ whiteSpace: "pre-wrap" }}>
              {error && `❌ ${error}`}
              {error && output && "\n\n"}
              {output}
              {!error && !output && "Run your code to see output here."}
            </div>
          </div>
        </div>

        <div className="language-selector-container">
          <label className="language-selector-label">Programming Language</label>
          <select
  className="language-selector-dropdown"
  value={language}
  onChange={(e) => setLanguage(e.target.value)}
  aria-label="Programming Language"
>
  {LANGUAGES.map((lang) => {
    const isRunnable = RUNNABLE.includes(lang);
    return (
      <option key={lang} value={lang} disabled={!isRunnable}>
        {isRunnable ? lang : `${lang} (run not available)`}
      </option>
    );
  })}
</select>
        </div>
      </main>
      <Footer />
    </div>
  );
}
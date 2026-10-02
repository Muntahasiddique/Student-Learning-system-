import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/ai-tutor.css'; // <-- Importing the new CSS file

export default function AITutor() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello! I am your AI Tutor. What would you like to learn today?" }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to UI
    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // 1. Grab the JWT token from local storage
      const token = localStorage.getItem('authtoken');

      // 2. Send request WITH the Authorization header
      const response = await axios.post(
        "http://localhost:3000/api/ai/ask", 
        { prompt: input },
        {headers:{Authorization: "Bearer " + token}}
      );

      // Add AI response to UI
      setMessages([...newMessages, { role: "ai", text: response.data.reply }]);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Sorry, I am having trouble connecting right now.";
      setMessages([...newMessages, { role: "ai", text: errorMessage }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-tutor-page">
      <Header />
      <main className="ai-tutor-main">
        <h2>Meet your AI Tutor</h2>
        
        <div className="ai-tutor-chat-window">
          {messages.map((msg, index) => (
            <div key={index} className={`ai-tutor-message-row ${msg.role === 'user' ? 'message-row-user' : 'message-row-ai'}`}>
              <span className={`ai-tutor-bubble ${msg.role === 'user' ? 'bubble-user' : 'bubble-ai'}`}>
                {msg.text}
              </span>
            </div>
          ))}
          {loading && <p className="ai-tutor-loading">AI is thinking...</p>}
        </div>

        <form className="ai-tutor-form" onSubmit={handleSend}>
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Ask a question..."
            className="ai-tutor-input"
          />
          <button type="submit" disabled={loading} className="ai-tutor-send-btn">
            Send
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/forum.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Forum() {
  const [threads ,setthreads] =useState([]);
    const [newTitle ,setnewTitle] =useState('');
        const [newContent ,setnewContent] =useState('');

            const [error ,seterror] =useState(null);
                        const [loading ,setloading] =useState(null);

useEffect(()=>{
 async function fetchThreads() {
  try {
    const Threadresponse = await axios.get('http://localhost:3000/api/forum');
    if(!Threadresponse){
      return res.json
    }
    setthreads(Threadresponse.data.getThreads);
    setloading(false);
  } catch (error) {
    if (error.response) {
    seterror(error.response.data.message);
  } else {
    seterror("Could not connect to server. Please try again.");
  }
  setloading(false)
  }
}
fetchThreads();
},[])

const handleCreateThreads = async (e)=>{
e.preventDefault();
const token = localStorage.getItem('authtoken');
if (!token) {
      seterror("You must be logged in to post.");
      return;
    }
    try {
      await axios.post('http://localhost:3000/api/forum',
        {title : newTitle , content: newContent, tags: []},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setnewTitle('');
      setnewContent('');
      const response = await axios.get('http://localhost:3000/api/forum');
      setthreads(response.data.getThreads || response.data);
      
    } catch (error) {
      seterror(error.response?.data?.message || "Failed to create thread." );
    }
}
  return (
    <div className="forum-page">
      <Header />
      
      <main className="forum-main">
        {/* Floating Header with Icon */}
        <div className="forum-header">
          <div className="forum-header-icon">
            <span className="forum-header-icon-text">💬</span>
          </div>
          <div>
            <h1 className="forum-title">Student Forum</h1>
            <p className="forum-subtitle">Ask questions, share knowledge, and grow together</p>
          </div>
        </div>

        {/* Glass Panel Filters */}
        <section className="forum-filters">
          <div className="forum-filters-container">
            <div className="forum-search-container">
              <input type="text" placeholder="Search discussions..." className="forum-search-input" />
            </div>
            <div className="forum-filter-options">
              <select className="forum-filter-select">
                <option>All Categories</option>
                <option>Programming</option>
                <option>Mathematics</option>
                <option>Science</option>
                <option>Literature</option>
              </select>
              <select className="forum-filter-select">
                <option>Newest First</option>
                <option>Most Active</option>
                <option>Unanswered</option>
              </select>
            </div>
          </div>
        </section>

        {/* Floating New Thread Form */}
        <div className="forum-new-thread">
          <form className="forum-thread-form" onSubmit={handleCreateThreads}>
            <label className="forum-form-label">Start a New Discussion</label>
            <input type="text" placeholder="What's your question?" className="forum-form-input" value={newTitle} onChange={(e)=>setnewTitle(e.target.value)} required />
            <textarea placeholder="Provide details about what you're asking..." className="forum-form-textarea" value={newContent}
    onChange={(e) => setnewContent(e.target.value)} required></textarea>
            <div className="forum-form-actions">
              <button type="reset" className="forum-form-cancel">Cancel</button>
              <button type="submit" className="forum-form-submit">Post Discussion</button>
            </div>
          </form>
        </div>

        {/* Thread List with Interactive Cards */}
        <div className="forum-thread-list">
          {/* Thread 1 */}
          {loading && <p>Loading discussions...</p>}
          {error &&  <p className="error-text" style={{color: 'red'}}>{error} </p> }
{threads.length === 0 && !loading && <p>No discussions found. Be the first to post!</p>}
{threads.map((thread)=>{
return  <div className="forum-thread" key={thread._id} >
            <div className="forum-thread-header">
              <div>
                <h3 className="forum-thread-title">
                  <span className="forum-thread-icon">🌳</span>
                  <Link to={`/forum/${thread._id}`} style={{color: 'inherit', textDecoration: 'none'}}>
                   {thread.title}
                  </Link>
                 
                </h3>
                <div className="forum-thread-meta">
                  <span>Posted by <span className="forum-thread-author">{thread.author?.name || 'Unknown User'}</span></span>
                  <span>·</span>
                  <span> {new Date(thread.createdAt).toLocaleDateString()}</span>
                  <span>·</span>
                  <span>5 replies</span>
                </div>
              </div>
              <span className="forum-thread-status">Active</span>
            </div>
            <p className="forum-thread-content">
             {thread.content}
            </p>
            <div className="forum-thread-actions">
              <button className="forum-thread-action">💬 Reply</button>
              <button className="forum-thread-action">{thread.upvote || 0}</button>
              <button className="forum-thread-action">🔖 Save</button>
            </div>
          </div>
})}
        </div>

        {/* Pagination */}
        <div className="forum-pagination">
          <div className="forum-pagination-container">
            <div className="forum-pagination-button">←</div>
            <div className="forum-pagination-button">1</div>
            <div className="forum-pagination-current">2</div>
            <div className="forum-pagination-button">3</div>
            <div className="forum-pagination-button">4</div>
            <div className="forum-pagination-button">→</div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
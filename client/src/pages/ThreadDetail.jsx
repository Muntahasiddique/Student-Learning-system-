import React, { useEffect, useState } from 'react';
import '../styles/ThreadDetail.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ThreadDetail() {
const  {id} = useParams();


const [thread,setthread] = useState(null);
const [replies,setreplies] =  useState([]);
const [newReply, setnewReply] = useState('');
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(true);
useEffect(()=>{
async function fetchThreadDetails() {
    try {
        const response = await axios.get(`http://localhost:3000/api/forum/${id}`);
        setthread(response.data.singlethread);
        setreplies(response.data.replies);
        setloading(false)
    } catch (error) {
      seterror(error.response?.data?.message || "Failed to get thread and replies" );
        
    }
}
fetchThreadDetails()
},[id])
const handleFormReply = async (e)=>{
e.preventDefault();
seterror(null);
 const token = localStorage.getItem('authtoken');
if (!token) {
      seterror("You must be logged in to post.");
      return;
    }
 try {
    await axios.post(`http://localhost:3000/api/forum/${id}/reply`,
    {content:newReply},
     {headers : {Authorization : 'Bearer ' + token}} 
)
    setnewReply('');
const response = await axios.get(`http://localhost:3000/api/forum/${id}`);
setthread(response.data.singlethread);
      setreplies(response.data.replies);
  
    
 } catch (error) {
          seterror(error.response?.data?.message || "Failed to get thread and replies" );

 }

}
  return (
    <div className="thread-detail-page">
      <Header />
      
      <main className="thread-detail-main">
        {/* Main Post Section */}
        {loading && <p>Loading thread...</p>}
        {error && <p className="error-text" style={{ color: 'red' }}>{error}</p>}
        {!loading && thread && (
             <section className="main-post-card">
          <div className="main-post-header">
            <h1 className="main-post-title"> {thread.title}</h1>
            <div className="main-post-meta">
              <span>Posted by <strong> {thread.author?.name || 'Unknown User'}</strong></span>
              <span>·</span>
<span>{new Date(thread.createdAt).toLocaleDateString()}</span>          
  </div>
          </div>
          <div className="main-post-content">
            <p>{thread.content}</p>
          </div>
        </section>
        )}
       

        {/* Replies Section */}
        {!loading && ( <section className="replies-section">
          <h2 className="replies-heading">Replies ({replies.length}) </h2>
          {replies.length == 0 ? (<p style={{color: '#94a3b8'}}>No replies yet. Be the first to answer!</p>) :(
            replies.map(reply =>{
                return  <div className="reply-card" key={reply._id}>
            <div className="reply-header">
              <span className="reply-author">{reply.author?.name || 'unKnown User'}</span>
              <span className="reply-date">{new Date(reply.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="reply-body">
              <p>{reply.content}</p>
            </div>
          </div>
            })

          )}
         
        </section>)}
       

        {/* Add Reply Form */}
        {!loading && thread && (
 <section className="reply-form-section">
          <h3>Add a Reply</h3>
          {/* You must attach your onSubmit handler here */}
          <form className="reply-form" onSubmit={handleFormReply} >
            <textarea 
              className="reply-textarea"
              placeholder="Write your answer..." 
              required
              rows="4"
              value={newReply}
              onChange={(e)=> setnewReply( e.target.value)}
            ></textarea>
            <div className="reply-form-actions">
              <button type="submit" className="btn-submit-reply">Post Reply</button>
            </div>
          </form>
        </section>

        )}
       
      </main>

      <Footer />
    </div>
  );
}
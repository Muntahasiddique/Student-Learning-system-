import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/forum.css';

export default function Forum() {
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
          <form className="forum-thread-form">
            <label className="forum-form-label">Start a New Discussion</label>
            <input type="text" placeholder="What's your question?" className="forum-form-input" required />
            <textarea placeholder="Provide details about what you're asking..." className="forum-form-textarea" required></textarea>
            <div className="forum-form-actions">
              <button type="reset" className="forum-form-cancel">Cancel</button>
              <button type="submit" className="forum-form-submit">Post Discussion</button>
            </div>
          </form>
        </div>

        {/* Thread List with Interactive Cards */}
        <div className="forum-thread-list">
          {/* Thread 1 */}
          <div className="forum-thread">
            <div className="forum-thread-header">
              <div>
                <h3 className="forum-thread-title">
                  <span className="forum-thread-icon">🌳</span>
                  How do I implement a binary tree in Python?
                </h3>
                <div className="forum-thread-meta">
                  <span>Posted by <span className="forum-thread-author">Zara Malik</span></span>
                  <span>·</span>
                  <span>2 hours ago</span>
                  <span>·</span>
                  <span>5 replies</span>
                </div>
              </div>
              <span className="forum-thread-status">Active</span>
            </div>
            <p className="forum-thread-content">
              I understand arrays but am confused about binary trees. Can someone guide me with a simple implementation? 
              I'm particularly struggling with the traversal methods. Any examples would be greatly appreciated!
            </p>
            <div className="forum-thread-actions">
              <button className="forum-thread-action">💬 Reply</button>
              <button className="forum-thread-action">👍 12</button>
              <button className="forum-thread-action">🔖 Save</button>
            </div>
          </div>

          {/* Thread 2 */}
          <div className="forum-thread">
            <div className="forum-thread-header">
              <div>
                <h3 className="forum-thread-title">
                  <span className="forum-thread-icon">🧮</span>
                  Calculus problem - finding limits
                </h3>
                <div className="forum-thread-meta">
                  <span>Posted by <span className="forum-thread-author">David Chen</span></span>
                  <span>·</span>
                  <span>5 hours ago</span>
                  <span>·</span>
                  <span>3 replies</span>
                </div>
              </div>
              <span className="forum-thread-status">Active</span>
            </div>
            <p className="forum-thread-content">
              I'm stuck on this limit problem: lim(x→0) (sin(3x)/x. I know the standard sin(x)/x limit is 1, 
              but I'm not sure how to apply that here. Can someone walk me through the steps?
            </p>
            <div className="forum-thread-actions">
              <button className="forum-thread-action">💬 Reply</button>
              <button className="forum-thread-action">👍 8</button>
              <button className="forum-thread-action">🔖 Save</button>
            </div>
          </div>

          {/* Thread 3 */}
          <div className="forum-thread">
            <div className="forum-thread-header">
              <div>
                <h3 className="forum-thread-title">
                  <span className="forum-thread-icon">📚</span>
                  Recommended books for machine learning beginners
                </h3>
                <div className="forum-thread-meta">
                  <span>Posted by <span className="forum-thread-author">Sophia Rodriguez</span></span>
                  <span>·</span>
                  <span>1 day ago</span>
                  <span>·</span>
                  <span>14 replies</span>
                </div>
              </div>
              <span className="forum-thread-status">Active</span>
            </div>
            <p className="forum-thread-content">
              I'm just starting my journey into machine learning and would love recommendations for beginner-friendly books. 
              I have some programming experience but no formal math background beyond college algebra.
            </p>
            <div className="forum-thread-actions">
              <button className="forum-thread-action">💬 Reply</button>
              <button className="forum-thread-action">👍 23</button>
              <button className="forum-thread-action">🔖 Save</button>
            </div>
          </div>
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
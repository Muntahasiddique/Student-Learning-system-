import axios from 'axios';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/signup.css';

export default function Signup() {
  const [name , setname] = useState("")
  const [email, setemail] = useState("")
   const [password , setpassword] = useState("")
   const [confirmpassword , setconfirmpassword] = useState("")
     const [role , setrole] = useState("Student")
     const [errorMsg, setErrorMsg] = useState("");
const [successMsg, setSuccessMsg] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const navigate = useNavigate();

async function handleSubmit(e)
{
 e.preventDefault();
 setErrorMsg("")
 setSuccessMsg("")
if(password !== confirmpassword){
  return setErrorMsg("Passwords do not match")
}
try {
  const response = await axios.post("http://localhost:3000/api/auth/signup" , {
    name,
    email,
    password,
    confirmpassword,
    role
  })
  setSuccessMsg("Response sent Successully");
  navigate('/login');
} catch (error) {
  if(error.response){
  setErrorMsg(error.response.data.message)
  }

  else{
     setErrorMsg("Could not connect to server. Please try again.");
  }
}

}


  return (
    <div className="signup-page">
      <Header />
       
      <main className="signup-main">
        <div className="signup-wrapper">
          <img src="./images/photo-1715538859909-914de12746b8.avif" alt="Background" className="signup-bg-image" />

          <div className="signup-glow-overlay">
            <div className="signup-glow-circle signup-glow-circle--left"></div>
            <div className="signup-glow-circle signup-glow-circle--right"></div>
          </div>

          <div className="signup-card">
            <h2 className="signup-title">
              Join thousands of learners building their future.
            </h2>

            <form id="signupForm" className="signup-form" onSubmit={handleSubmit}>
              {/* Name Field (Needed for backend schema) */}
              <div className="signup-input-group">
                <label className="signup-label">Full Name</label>
                <div className="signup-input-container">
                  <input 
                    type="text" 
                    placeholder="Muntaha" 
                    className="signup-input" 
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    required 
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="signup-input-group">
                <label className="signup-label">Email Address</label>
                <div className="signup-input-container">
                  <input 
                    type="email" 
                    placeholder="you@example.com" 
                    className="signup-input" 
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    required 
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="signup-input-group">
                <label className="signup-label">Password</label>
                <div className="signup-input-container">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Must be at least 6 characters" 
                    className="signup-input" 
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    required 
                  />
                  <span onClick={()=>setShowPassword(!showPassword)} className="signup-eye-icon"> {showPassword ?<FiEye/> : <FiEyeOff/>}</span>
                </div>
                <p className="signup-hint">Use a mix of letters, numbers, and symbols for a strong password.</p>
              </div>

              {/* Confirm pass*/}
              <div className="signup-input-group">
                <label className="signup-label">Confirm Password</label>
                <div className="signup-input-container">
                  <input 
                    type={showConfirmPassword ? "text" : "password"}  
                    placeholder="Confirm Password " 
                    className="signup-input" 
                    value={confirmpassword}
                    onChange={(e) => setconfirmpassword(e.target.value)}
                    required 
                  />
                  <span onClick={()=>setShowConfirmPassword(!showConfirmPassword)} className="signup-eye-icon" >{showConfirmPassword ? <FiEye/>:<FiEyeOff/> }</span>
                </div>
              </div>

                  {/* Role*/}
              <div className="signup-input-group">
                <label className="signup-label">Role</label>
                <div className="signup-input-container">
                <select value={role}  onChange={(e) => setrole(e.target.value) } className="signup-input" >
                <option value={"Student"}>Student</option>
                <option value={"Teacher"}>Teacher</option>
              </select>
                 
                </div>
              </div>
           

              {errorMsg && <p className="signup-error-message" style={{ display: 'block' }}>⚠️ {errorMsg}</p>}
              {successMsg && <p className="signup-success-message" style={{ display: 'block' }}>{successMsg}</p>}

              {/* Sign Up Button */}
              <button type="submit" className="signup-submit-button">
                Sign Up & Start Learning
              </button>
            </form>

            <p className="signup-login-text">
              Already have an account?
              <a href="/login" className="signup-login-link">Log In</a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
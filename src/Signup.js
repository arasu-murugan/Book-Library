// SignUp.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage("Error: " + data.error);
      }
    } catch (error) {
      setMessage("An error occurred during signup");
    }
  };
  

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
    }}>
      <div style={{
        backgroundColor: 'rgba(50, 50, 50, 0.8)',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
        maxWidth: '400px',
        width: '100%',
        color: '#f5f5f5',
        textAlign: 'center',
      }}>
        <h2 style={{
          color: '#e0f7fa',
          fontSize: '2rem',
          marginBottom: '1.5rem',
          textShadow: '0 2px 5px rgba(0, 0, 0, 0.8)',
        }}>Sign Up</h2>
        
        <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#b3e5fc', display: 'block', marginBottom: '0.5rem' }}>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: 'none',
                borderRadius: '5px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                fontSize: '1rem',
              }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#b3e5fc', display: 'block', marginBottom: '0.5rem' }}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: 'none',
                borderRadius: '5px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                fontSize: '1rem',
              }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#b3e5fc', display: 'block', marginBottom: '0.5rem' }}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: 'none',
                borderRadius: '5px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                fontSize: '1rem',
              }}
            />
          </div>
          <button type="submit" style={{
            width: '100%',
            padding: '10px',
            fontSize: '1rem',
            color: '#fff',
            backgroundColor: '#5e35b1',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}>Sign Up</button>
        </form>
        
        {message && <p style={{
          color: '#81d4fa',
          marginTop: '1rem',
          fontSize: '1rem',
        }}>{message}</p>}
      </div>
    </div>
  );
};

export default SignUp;

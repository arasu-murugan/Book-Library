import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // For error or success messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Admin credentials
    const adminUsername = "admin@123";
    const adminPassword = "adminpass";

    // Check for admin login
    if (username === adminUsername && password === adminPassword) {
      onLogin(true);  // Set admin login state
      navigate("/admin/borrowed-books");  // Redirect to AdminBorrowList page
      return;
    }

    try {
      // Make an API call to validate the user login
      const response = await axios.post("http://localhost:5000/api/user/login", {
        username,
        password,
      });

      if (response.data.message === "Login successful") {
        // If login is successful, call onLogin and redirect to the books page
        onLogin(false);  // Set regular user login state
        navigate("/books");  // Redirect to books page after login
      } else {
        setMessage(response.data.message);  // Display the response message
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h1 style={styles.header}>Login</h1>

        {/* Display message (if any) */}
        {message && <p style={styles.errorMessage}>{message}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.submitButton}>
            Login
          </button>
        </form>

        <p style={styles.signupPrompt}>
          Don't have an account?{" "}
          <Link to="/signup" style={styles.signupLink}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

// Style object for better readability and reusability
const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  loginBox: {
    backgroundColor: 'rgba(50, 50, 50, 0.8)',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
    maxWidth: '400px',
    width: '100%',
    color: '#f5f5f5',
    textAlign: 'center',
  },
  header: {
    color: '#e0f7fa',
    fontSize: '2rem',
    marginBottom: '1.5rem',
    textShadow: '0 2px 5px rgba(0, 0, 0, 0.8)',
  },
  errorMessage: {
    color: '#ff6f61',
    marginBottom: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '0.5rem 0',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
    fontSize: '1rem',
  },
  submitButton: {
    width: '100%',
    padding: '10px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#5e35b1',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '1rem',
  },
  signupPrompt: {
    color: '#b3e5fc',
    marginTop: '1rem',
  },
  signupLink: {
    color: '#81d4fa',
    textDecoration: 'none',
  }
};

export default Login;

// Header.js
import React from "react";
import { Link } from "react-router-dom";
import "../src/sass/style.css";

const Header = ({ isLoggedIn, isAdmin, onLogout }) => {
  return (
    <header style={{
      backgroundColor: "rgba(30, 30, 30, 0.9)",
      padding: "1.5rem",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.8)",
     
      top: 0,
      zIndex: 10,
    }}>
      <div>
        <h2
          className="heading-name"
          style={{
            color: "#e0f7fa",
            textAlign: "center",
            textShadow: "2px 2px 10px rgba(255, 255, 255, 0.5)",
            fontSize: "2rem",
            marginBottom: "1rem",
            fontWeight: "bold",
          }}
        >
          A Book Library for All Book Lovers
        </h2>

        <div style={{
          textAlign: "center",
          marginTop: "1rem",
        }}>
          <Link
            to="/books"
            style={{
              color: "#81d4fa",
              textDecoration: "none",
              fontSize: "1.2rem",
              fontWeight: "bold",
              marginRight: "1.5rem",
              transition: "color 0.3s",
            }}
          >
            Books
          </Link>

          {isLoggedIn && (
            <>
              <Link
                to="/borrow"
                style={{
                  color: "#81d4fa",
                  textDecoration: "none",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  marginRight: "1.5rem",
                  transition: "color 0.3s",
                }}
              >
                Borrow
              </Link>
              {isAdmin && (
                <Link
                  to="/admin/borrowed-books"
                  style={{
                    color: "#ff8a80",
                    textDecoration: "none",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    transition: "color 0.3s",
                  }}
                >
                  Admin
                </Link>
              )}
              <button
                onClick={onLogout}
                style={{
                  marginLeft: "1.5rem",
                  color: "#ffffff",
                  backgroundColor: "#d32f2f",
                  border: "none",
                  borderRadius: "5px",
                  padding: "0.5rem 1rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                  transition: "background-color 0.3s",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#b71c1c")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#d32f2f")}
              >
                Logout
              </button>
            </>
          )}

          {!isLoggedIn && (
            <>
              <Link
                to="/login"
                style={{
                  color: "#81d4fa",
                  textDecoration: "none",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  marginRight: "1.5rem",
                  transition: "color 0.3s",
                }}
              >
                Login
              </Link>
              <Link
                to="/signup"
                style={{
                  color: "#81d4fa",
                  textDecoration: "none",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  transition: "color 0.3s",
                }}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./header";
import BorrowPage from "./BorrowPage";
import Signup from "./Signup";
import Login from "./Login";
import Books from "./books";
import ScrollToTop from "./scrolltotop";
import AdminBorrowList from "./AdminBorrowList";
import PaymentForm from "./PaymentForm";
import AddBookForm from "./AddBookForm"; // Import AddBookForm component
import "./sass/style.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [books, setBooks] = useState([]); // State for storing book list

  // Handle login
  const handleLogin = (isAdminUser = false) => {
    setIsLoggedIn(true);
    setIsAdmin(isAdminUser);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("isAdmin", isAdminUser ? "true" : "false");
  };

  // Check login status on initial load
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    const adminStatus = localStorage.getItem("isAdmin") === "true";
    setIsLoggedIn(loggedInStatus);
    setIsAdmin(adminStatus);
  }, []);

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");
  };

  // Handle adding a new book
  const handleAddBook = (newBook) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} isAdmin={isAdmin} />
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/payment" element={<PaymentForm />} />

        {/* Protected Routes */}
        <Route 
          path="/borrow" 
          element={isLoggedIn ? <BorrowPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/books" 
          element={isLoggedIn ? <Books books={books} /> : <Navigate to="/login" />} 
        />

        {/* Admin-only Routes */}
        <Route 
          path="/admin/borrowed-books" 
          element={isLoggedIn && isAdmin ? <AdminBorrowList /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/admin/add-book" 
          element={isLoggedIn && isAdmin ? <AddBookForm onAddBook={handleAddBook} /> : <Navigate to="/login" />} 
        />

        {/* Default Redirect Route */}
        <Route 
          path="/" 
          element={isLoggedIn ? <Navigate to="/books" /> : <Navigate to="/login" />} 
        />
      </Routes>
    </>
  );
};

export default App;

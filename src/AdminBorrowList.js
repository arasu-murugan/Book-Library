import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminBorrowList = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    // Fetch borrowed books data from the backend
    const fetchBorrowedBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/borrowed-books");
        console.log(response.data); // Log the data to check if it's being fetched correctly
        setBorrowedBooks(response.data); // Set the borrowed books data
      } catch (error) {
        console.error("Error fetching borrowed books:", error);
      }
    };

    fetchBorrowedBooks();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.header}>Admin - Borrowed Books List</h2>
        {borrowedBooks.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Borrower Name</th>
                <th style={styles.tableHeader}>Email</th>
                <th style={styles.tableHeader}>Phone Number</th>
                <th style={styles.tableHeader}>Borrow Date</th>
                <th style={styles.tableHeader}>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {borrowedBooks.map((borrow) => (
                <tr key={borrow._id} style={styles.tableRow}>
                  <td style={styles.tableCell}>{borrow.borrowerName}</td>
                  <td style={styles.tableCell}>{borrow.email}</td>
                  <td style={styles.tableCell}>{borrow.phoneNumber}</td>
                  <td style={styles.tableCell}>{borrow.borrowDate}</td>
                  <td style={styles.tableCell}>{borrow.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={styles.noDataMessage}>No borrowed books to display</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundImage: "url('https://wallpapercave.com/wp/wp8191894.jpg')",
    backgroundSize: "cover",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "95vh",
    backgroundPosition: "center",
    color: "#fff",
  },
  formContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: "2rem",
    borderRadius: "12px",
    width: "85%",
    maxWidth: "900px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
    textAlign: "center",
  },
  header: {
    fontSize: "2.2rem",
    color: "#e0f7fa",
    fontWeight: "bold",
    marginBottom: "1.5rem",
    textShadow: "2px 2px 10px rgba(255, 255, 255, 0.5)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#1e1e1e",
    borderRadius: "8px",
  },
  tableHeader: {
    backgroundColor: "#00796b",
    color: "#fff",
    fontSize: "1.1rem",
    padding: "12px",
    textAlign: "center",
    textTransform: "uppercase",
  },
  tableRow: {
    borderBottom: "1px solid #ddd",
    transition: "background-color 0.3s",
  },
  tableCell: {
    padding: "12px",
    textAlign: "center",
    fontSize: "1rem",
    color: "#ddd",
    transition: "background-color 0.3s",
  },
  noDataMessage: {
    fontSize: "1.2rem",
    color: "#ff8a80",
  },
};

export default AdminBorrowList;

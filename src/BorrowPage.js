import React, { useState, useEffect } from 'react';

const BorrowPage = () => {
  const [borrowerName, setBorrowerName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [borrowDate, setBorrowDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [message, setMessage] = useState('');
  const [reminderMessage, setReminderMessage] = useState('');

  const handleBorrowDateChange = (e) => {
    const borrowDateValue = e.target.value;
    setBorrowDate(borrowDateValue);

    // Calculate the due date by adding 14 days to the borrow date
    const borrowDateObj = new Date(borrowDateValue);
    borrowDateObj.setDate(borrowDateObj.getDate() + 14); // Add 14 days
    const calculatedDueDate = borrowDateObj.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    setDueDate(calculatedDueDate);
  };

  useEffect(() => {
    const today = new Date();
    const dueDateObj = new Date(dueDate);
    const daysLeft = Math.floor((dueDateObj - today) / (1000 * 60 * 60 * 24));

    if (daysLeft <= 3 && daysLeft > 0) {
      setReminderMessage(`Reminder: Your book is due in ${daysLeft} days!`);
    } else if (daysLeft <= 0) {
      setReminderMessage('Your book is overdue!');
    } else {
      setReminderMessage('');
    }
  }, [dueDate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/api/borrow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'madhumitha2305',
      },
      body: JSON.stringify({
        borrowerName,
        email,
        phoneNumber,
        borrowDate,
        dueDate,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setMessage('Borrowing details saved successfully!');
        }
      })
      .catch((error) => {
        setMessage('Failed to save data. Please try again.');
        console.error('Error:', error);
      });
  };

  return (
    <div style={styles.borrowPage}>
      <h1 style={styles.borrowHeader}>Borrow Book</h1>
      <div>
        <h2>Borrow a Book</h2>
        {/* Displaying reminderMessage */}
        <p>{reminderMessage}</p>
      </div>
      <form onSubmit={handleSubmit} style={styles.borrowForm}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Borrower's Name:</label>
          <input 
            type="text" 
            value={borrowerName} 
            onChange={(e) => setBorrowerName(e.target.value)} 
            style={styles.formInput}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={styles.formInput}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Phone Number:</label>
          <input 
            type="text" 
            value={phoneNumber} 
            onChange={(e) => setPhoneNumber(e.target.value)} 
            style={styles.formInput}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Borrow Date:</label>
          <input 
            type="date" 
            value={borrowDate} 
            onChange={handleBorrowDateChange} 
            style={styles.formInput}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Due Date:</label>
          <input 
            type="date" 
            value={dueDate} 
            readOnly 
            style={styles.formInput}
          />
        </div>
        <button type="submit" style={styles.submitButton}>Submit</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  borrowPage: {
    color: '#e0f7fa',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  },
  borrowHeader: {
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center',
    textShadow: '2px 2px 10px rgba(255, 255, 255, 0.5)',
    marginBottom: '2rem',
  },
  borrowForm: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.8)',
    width: '100%',
    maxWidth: '400px',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
  },
  formInput: {
    width: '100%',
    padding: '0.8rem',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '2px solid #00796b',
    backgroundColor: '#333',
    color: '#e0f7fa',
  },
  submitButton: {
    backgroundColor: '#00796b',
    color: '#fff',
    padding: '0.8rem 1.5rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    width: '100%',
  },
  message: {
    marginTop: '1rem',
    color: '#ff8a80',
  },
};

export default BorrowPage;

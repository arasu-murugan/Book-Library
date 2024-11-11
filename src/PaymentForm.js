import React, { useState } from 'react';

const PaymentForm = () => {
  const [amount, setAmount] = useState(5000);
  const [email, setEmail] = useState('');
  const [cardDetails, setCardDetails] = useState('');
  const [error, setError] = useState(null);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);

    // Here, handle the form submission as per your requirement
    alert(`Payment request for $${amount / 100} with email: ${email} and card details.`);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.formContainer}>
      <h2 style={styles.header}>Make a Payment</h2>
      <div style={styles.inputContainer}>
        <label style={styles.label}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          style={styles.input}
        />
      </div>
      <div style={styles.inputContainer}>
        <label style={styles.label}>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter amount"
          style={styles.input}
        />
      </div>
      <div style={styles.inputContainer}>
        <label style={styles.label}>Card Details</label>
        <input
          type="text"
          value={cardDetails}
          onChange={(e) => setCardDetails(e.target.value)}
          placeholder="Card Number"
          style={styles.input}
        />
      </div>
      {error && <div style={styles.error}>{error}</div>}
      <button type="submit" style={styles.button}>
        Pay ${amount / 100}
      </button>
    </form>
  );
};

const styles = {
  formContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: "2rem",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "500px",
    margin: "0 auto",
    color: "#ffffff",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
  },
  header: {
    fontSize: "2rem",
    color: "#00E5FF",
    textAlign: "center",
    marginBottom: "1.5rem",
    textShadow: "0 2px 6px rgba(0, 229, 255, 0.8)",
  },
  inputContainer: {
    marginBottom: "1.2rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    color: "#B0BEC5",
  },
  input: {
    width: "100%",
    padding: "0.8rem",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    backgroundColor: "#1e1e1e",
    color: "#ffffff",
    fontSize: "1rem",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
  },
  button: {
    width: "100%",
    padding: "1rem",
    borderRadius: "8px",
    backgroundColor: "#00E676",
    color: "#ffffff",
    fontSize: "1.2rem",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
    boxShadow: "0 4px 10px rgba(0, 229, 118, 0.5)",
  },
  error: {
    color: "#FF5252",
    marginTop: "1rem",
  },
};

const PaymentPage = () => {
  return (
    <div style={styles.container}>
      <PaymentForm />
    </div>
  );
};

export default PaymentPage;

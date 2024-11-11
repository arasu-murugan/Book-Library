const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Borrow = require('../models/borrow');

// Define the Borrow schema
const borrowSchema = new mongoose.Schema({
  borrowerName: String,
  email: String,
  phoneNumber: String,
  borrowDate: String,
  dueDate: String,
});

// POST route to save borrowing details
router.post('/borrow', (req, res) => {
  const { borrowerName, email, phoneNumber, borrowDate, dueDate } = req.body;

  // Create a new borrow record
  const newBorrow = new Borrow({
    borrowerName,
    email,
    phoneNumber,
    borrowDate,
    dueDate,
  });

  newBorrow
    .save()
    .then(() => {
      res.json({ message: 'Borrowing details saved successfully!' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Failed to save data' });
    });
});

// GET route to fetch borrowed books
router.get("/borrowed-books", async (req, res) => {
  try {
    const borrowedBooks = await Borrow.find();
    res.json(borrowedBooks);
  } catch (error) {
    console.error("Error fetching borrowed books:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

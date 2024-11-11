// models/borrow.js
const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema({
  
  borrowerName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  borrowDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
});

// Explicitly set the collection name to "borrows"
const Borrow = mongoose.model('borrow', borrowSchema, 'borrows');

module.exports = Borrow;


const express = require("express");
const bcrypt = require("bcryptjs");      // For comparing hashed passwords
const jwt = require("jsonwebtoken");     // For generating JWTs
const User = require("../models/User");  // User model

const router = express.Router();

// User Signup Route
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// User Login Route
// User Login Route
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find user by username
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(400).json({ message: "User not found. Please sign up first." });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }
  
      // Create and send JWT
      const token = jwt.sign({ userId: user._id }, "your-secret-key", { expiresIn: "1h" });
  
      res.status(200).json({ message: "Login successful", token });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  });
  

module.exports = router;

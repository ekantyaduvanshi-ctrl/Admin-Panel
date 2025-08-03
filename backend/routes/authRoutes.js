const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email already in use' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// External API Proxy Login
router.post('/loginV2', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    console.log('Proxying request to external API:', { username, password: '***' });
    
    // Call external API
    const response = await axios.post('https://backend.cshare.in/v2/loginV2', {
      username,
      password
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 30000 // 30 second timeout
    });
    
    console.log('External API response received');
    
    // Return the external API response
    res.json(response.data);
  } catch (error) {
    console.error('External API error:', error.response?.data || error.message);
    
    if (error.response) {
      // The request was made and the server responded with a status code
      res.status(error.response.status).json({ 
        error: error.response.data?.error || 'External API request failed' 
      });
    } else if (error.request) {
      // The request was made but no response was received
      res.status(500).json({ 
        error: 'No response from external API. Please try again.' 
      });
    } else {
      // Something happened in setting up the request
      res.status(500).json({ 
        error: 'Failed to connect to external API. Please try again.' 
      });
    }
  }
});

module.exports = router; 
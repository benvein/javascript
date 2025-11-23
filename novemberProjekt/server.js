const express = require('express');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Session storage (egyszerű in-memory)
const sessions = new Map();

// Auth middleware
const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  const userId = sessions.get(token);
  
  if (!userId) {
    return res.status(401).json({ error: 'Nincs bejelentkezve' });
  }
  
  req.userId = userId;
  next();
};

// Export
module.exports = { app, sessions, requireAuth };
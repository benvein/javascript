const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static('public'));

const sessions = new Map();

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  const userId = sessions.get(token);
  
  if (!userId) {
    return res.status(401).json({ error: 'Nincs bejelentkezve' });
  }
  
  req.userId = userId;
  next();
};

module.exports = { app, sessions, requireAuth };
const express = require('express');
const path = require('path');
const app = express();

// Serve static files (like favicon, images, css)
app.use(express.static(path.join(__dirname, '../')));

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Success route
app.get('/success', (req, res) => {
  res.sendFile(path.join(__dirname, '../success.html'));
});

// Cancel route
app.get('/cancel', (req, res) => {
  res.sendFile(path.join(__dirname, '../cancel.html'));
});

// Export app for Vercel
module.exports = app;

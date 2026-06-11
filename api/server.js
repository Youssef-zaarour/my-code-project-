const express = require('express');
const app = express();

// Home route
app.get('/', (req, res) => {
  res.send('Hello from Express on Vercel!');
});

// Export the app instead of using app.listen
module.exports = app;

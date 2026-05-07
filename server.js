const express = require("express");
const app = express();
const path = require("path");

// Serve static files (like index.html) from the "public" folder
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Main route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Success page after payment
app.get("/success", (req, res) => {
  res.send("<h1>✅ Payment Successful! Thank you for your purchase.</h1>");
});

// Cancel page if payment is cancelled
app.get("/cancel", (req, res) => {
  res.send("<h1>❌ Payment Cancelled. Please try again.</h1>");
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

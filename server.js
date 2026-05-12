const express = require("express");
const path = require("path");
const fetch = require("node-fetch"); // For calling Paddle API

const app = express();

// Paddle credentials
const PADDLE_VENDOR_ID = "332502"; // Your Seller ID
const PADDLE_API_KEY = process.env.PADDLE_API_KEY; // Store securely in Vercel

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Create Paddle checkout session
app.post("/create-checkout", async (req, res) => {
  try {
    const response = await fetch(
      "https://vendors.paddle.com/api/2.0/product/generate_pay_link",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          vendor_id: PADDLE_VENDOR_ID,
          vendor_auth_code: PADDLE_API_KEY,
          product_id: "pro_01kr10x7r5f79yrx9qs618qgsy", // Your Product ID
          return_url: "https://my-code-project.vercel.app/success",
          cancel_url: "https://my-code-project.vercel.app/cancel",
        }),
      }
    );

    const data = await response.json();
    res.json({ checkout_url: data.response.url });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).send("Error creating checkout session");
  }
});

// Success page
app.get("/success", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "success.html"));
});

// Cancel page
app.get("/cancel", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "cancel.html"));
});

// Webhook endpoint (optional, for payment notifications)
app.post("/webhook", (req, res) => {
  console.log("Webhook received:", req.body);
  res.sendStatus(200);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

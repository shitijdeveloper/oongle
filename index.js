const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const authRoutes = require("./Routers/UserRouters");
const productRoutes = require('./Routers/ProductRouter');
const customerRoutes = require('./Routers/CustomerRouter');
const Razorpay = require('razorpay');

const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Other middleware and routes
app.use(express.json());  // Middleware for JSON parsing
app.use(cors());          // Enable CORS
app.use((req, res, next) => {
res.setHeader('Content-Security-Policy', "default-src 'none'; img-src 'self' https://oongle.onrender.com; connect-src 'self'; script-src 'self'; style-src 'self';");
next();
});

// Your other routes
app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', customerRoutes);

// MongoDB connection
mongoose
  .connect("mongodb+srv://shitijsharma707:a16qWREKlTYbvLYl@cluster0.qwcrf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/test")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error: ", err));

const PORT = process.env.PORT || 5000;
app.post("/api/orders", async (req, res) => {
  try {
    // Initialize Razorpay instance with key_id and key_secret
    const razorpay = new Razorpay({
      key_id: "rzp_test_OidPmW3w9xT9bX",  // Replace with your Razorpay Key ID
      key_secret: "JV2MnFDEiFcTmn92p4vk7rOt"  // Replace with your Razorpay Key Secret
    });

    // Capture the amount from the request body
    const { amount } = req.body;  // Ensure amount is passed in the request body

    // Define the payment order options
    const options = {
      amount: amount * 100, // Convert amount to paise (Razorpay takes amount in paise)
      currency: 'INR', // Currency type (INR for Indian Rupees)
      receipt: `order_rcptid_${Math.floor(Math.random() * 1000)}`, // Optional, a unique receipt ID
      payment_capture: 1  // Automatically capture payment
    };

    // Create the order using Razorpay API
    const order = await razorpay.orders.create(options);

    // Send back the order details to the client
    res.status(200).json({
      id: order.id,
      amount: order.amount,
      currency: order.currency
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Error creating Razorpay order", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

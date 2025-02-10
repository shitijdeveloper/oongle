const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const authRoutes = require("./Routers/UserRouters");
const productRoutes = require('./Routers/ProductRouter');
const customerRoutes = require('./Routers/CustomerRouter');

const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Other middleware and routes
app.use(express.json());  // Middleware for JSON parsing
app.use(cors());          // Enable CORS
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'none'; img-src 'self' http://localhost:5000; connect-src 'self'; script-src 'self'; style-src 'self';");
  next();
});

// Your other routes
app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', customerRoutes);

// MongoDB connection
mongoose
  // .connect("mongodb+srv://shitijsharma707:a16qWREKlTYbvLYl@cluster0.qwcrf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/test")
  .connect("mongodb://localhost:27017/oongole")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error: ", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

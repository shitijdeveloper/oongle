const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createProduct } = require('../Controllers/ProductController');  // Assuming the createProduct function is in ProductController.js

// Define upload directory and ensure it exists
const uploadDir = path.join(__dirname, '..', 'public', 'images');

// Set up multer for image upload, limiting to 10 images and accepting specific image formats
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);  // Specify where to store the uploaded images
  },
  filename: (req, file, cb) => {
    // Create a unique filename by appending timestamp to the original file extension
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// File validation - Only allow images (jpg, jpeg, png, webp)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.jpg', '.jpeg', '.png', '.webp'];
  const fileExtension = path.extname(file.originalname).toLowerCase();
  
  if (allowedTypes.includes(fileExtension)) {
    cb(null, true);  // Allow the file to be uploaded
  } else {
    cb(new Error('Invalid file type. Only .jpg, .jpeg, .png, .webp are allowed.'), false);  // Reject the file
  }
};

// Set up multer with storage configuration, limits, and file validation
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },  // 10MB file size limit
  fileFilter: fileFilter,  // Apply file validation
}).array('images', 10);  // Allow up to 10 images to be uploaded

// POST route to create a product, using the upload middleware
router.post('/products', upload, createProduct);

module.exports = router;

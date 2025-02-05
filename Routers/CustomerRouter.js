const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadDir = 'uploads';
const { createCustomer } = require('../Controllers/CustomerController');
const uploads = multer({ dest: uploadDir }).single('ProfileImg');
router.post("/customer", uploads, createCustomer);
module.exports = router;

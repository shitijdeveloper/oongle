const express = require('express');
const router = express.Router();
const { Registration, verifyOtp, login } = require("../Controllers/UserControllers")
// Route for user registration
router.post('/register', Registration);
// Route for OTP verification
router.post('/verify-otp', verifyOtp);
// Route for user login
router.post('/login', login);

module.exports = router;

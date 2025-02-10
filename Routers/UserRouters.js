const express = require('express');
const router = express.Router();
const { Registration, verifyOtp, login, getUser, deleteUser, UpdateUser, getByIdUser } = require("../Controllers/UserControllers")
// Route for user registration
router.post('/register', Registration);
// Route for OTP verification
router.post('/verify-otp', verifyOtp);
// Route for user login
router.post('/login', login);

router.get("/user", getUser)

router.delete("/user/:id", deleteUser)

router.put("/user/:id", UpdateUser)

router.get("/user/:id", getByIdUser)
module.exports = router;

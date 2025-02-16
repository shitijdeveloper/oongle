const User = require("../Models/User");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dfsadfsdfdsdsfsdafdsaf@gmail.com",
    pass: "mwcw drdx fyff hcjj",
  },
});
let otpStorage = {};
const generateOtp = () => {
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: true,
    specialChars: true,
  });
  return otp;
};

const Registration = async (req, res) => {
  try {
    const { name, email, mobileno, password, role } = req.body;
    if (!name || !email || !mobileno || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const otpCode = generateOtp();
    otpStorage[email] = { otpCode, expiresAt: Date.now() + 300000 }; // OTP expires in 5 minutes

    const mailOptions = {
      from: "dfsadfsdfdsdsfsdafdsaf@gmail.com",
      to: email,
      subject: 'OTP for Registration',
      text: `Hello ${name},\n\nYour OTP for registration is: ${otpCode}\n\nBest regards, Your Team`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error sending email' });
      }

      return res.status(200).json({ message: 'OTP sent to your email. Please verify.' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// OTP verification route
const verifyOtp = async (req, res) => {
  try {
    const { email, otp, name, mobileno, password, role } = req.body;

    if (!email || !otp || !name || !mobileno || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check OTP expiration
    if (otpStorage[email]?.expiresAt < Date.now()) {
      return res.status(400).json({ message: 'OTP expired. Please request a new one.' });
    }

    // Verify OTP
    if (otpStorage[email]?.otpCode === otp) {
      const hashedPassword = await bcrypt.hash(password.trim(), 10);

      const user = new User({
        name: name.trim(),
        email: email.trim(),
        mobileno: mobileno.trim(),
        password: hashedPassword,
        role,
      });

      await user.save();
      delete otpStorage[email]; // Remove OTP from storage after verification

      return res.status(200).json({ message: 'Registration successful!' });
    } else {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const jwtKey = process.env.JWT_SECRET || "default_secret_key"; // Fallback for development
    console.log("JWT Key:", jwtKey); // Debugging purpose
    if (!jwtKey) {
      throw new Error("JWT key is not defined");
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, jwtKey, { expiresIn: "3h" });
    const { password: _, ...userWithoutPassword } = user._doc || user;
    res.status(200).json({ message: "Login successful", token, user: userWithoutPassword });
  } catch (error) {
    console.error("Error in login:", error.message, error.stack);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
const getUser = async (req, res) => {
  try {
    const AllUsers = await User.find();
    res.status(200).json({ AllUsers });
  } catch (error) {
    console.error("Error in fetching users:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
const getByIdUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
const deleteUser = async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    if (!deleteUser) {
      res.status(400).json({ message: "User not Found" })
    }
    res.status(200).json({ message: "User Deleted Successfully" })
  } catch (error) {
    console.error("Error in login:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
}
const UpdateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.error("Error in updating user:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

module.exports = { Registration, verifyOtp, login, getUser, getByIdUser, deleteUser, UpdateUser };

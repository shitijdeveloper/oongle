const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileno: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  Is_active: {
    type: Boolean,
    default: false,
  },
  Is_approved: {
    type: Boolean,
    default: false,
  }

});

const User = mongoose.model("User", userSchema);
module.exports = User

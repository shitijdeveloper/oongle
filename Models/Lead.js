const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobileno: { type: String, required: true, match: /^[0-9]{10}$/ },
  password: { type: String },
  whatsapp_no: { type: String, default: null },
  House_FlatNO: { type: String, default: null },
  Tower_Block: { type: String, default: null },
  Sector: { type: String, default: null },
  Floor: { type: String, default: null },
  Society: { type: String, default: null },
  state: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  Zipcode: { type: String, type: Number },
  Select_Customer_Type: { type: String, required: true },
  Select_Customer_BusinessType: { type: String, required: true },
  Select_Invoice_Mode: { type: String, required: true },
  Select_Customer_Group: { type: String, required: true },
  status: { type: String, default: 'pending' },
  canceled: { type: Boolean, default: false },
  ProfileImg: { type: String, },
  createby: { type: mongoose.Schema.Types.ObjectId, ref: 'user', default: null }
}, { timestamps: true });
const Customer = mongoose.model('customers', customerSchema);
module.exports = Customer;

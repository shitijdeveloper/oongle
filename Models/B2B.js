const mongoose = require("mongoose")
const customerSchema = new mongoose.Schema({
    BusinessName: { type: String },
    BusinessType: { type: String },
    BrandName: { type: String },
    name: { type: String },
    email: { type: String },
    mobileno: { type: String, match: /^[0-9]{10}$/ },
    password: { type: String },
    whatsapp_no: { type: String },
    Gst_no: { type: String }, // Optional
    Pan: { type: String }, // Optional
    BranchName: { type: String },
    Account_no: { type: String }, // Optional
    Ifsc_no: { type: String }, // Optional
    Bank_address: { type: String },
    BankName: { type: String },  // Add BankName if it's part of the request
    status: { type: Boolean, default: false },
    isApporved: { type: Boolean, default: false },
}, { timestamps: true });

const Customer = mongoose.model('Details', customerSchema);
module.exports = Customer;

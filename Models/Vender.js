const mongoose = require("mongoose")
const customerSchema = new mongoose.Schema({
    ServiceName: { type: String },
    BusinessType: { type: String },
    BrandName: { type: String },
    name: { type: String },
    email: { type: String },
    mobileno: { type: String, match: /^[0-9]{10}$/ },
    password: { type: String },
    whatsapp_no: { type: String },
    Gst_no: { type: String },
    Pan: { type: String },
    BranchName: { type: String },
    Account_no: { type: String },
    Ifsc_no: { type: String },
    Bank_address: { type: String },
    BankName: { type: String },
    status: { type: Boolean, default: false },
    isApporved: { type: Boolean, default: false },
}, { timestamps: true });

const Customer = mongoose.model('Vender', customerSchema);
module.exports = Customer;

const Customer = require('../Models/Lead');
const Detials = require("../Models/B2B")
const Vender = require("../Models/Vender")
const createCustomer = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const {
      name,
      email,
      mobileno,
      password,
      whatsapp_no,
      House_FlatNO,
      Tower_Block,
      Sector,
      Floor,
      Society,
      state,
      city,
      address,
      Zipcode,
      Select_Customer_Type,
      Select_Customer_BusinessType,
      Select_Invoice_Mode,
      Select_Customer_Group,
      status,
      canceled,
      createby,
    } = req.body;
    const normalizedCreateBy = (createby === "null" || createby === null) ? null : createby;
    const ProfileImg = req.file ? req.file.filename : null;
    const newCustomer = new Customer({
      name,
      email,
      mobileno,
      password,
      whatsapp_no,
      House_FlatNO,
      Tower_Block,
      Sector,
      Floor,
      Society,
      state,
      city,
      address,
      Zipcode,
      Select_Customer_Type,
      Select_Customer_BusinessType,
      Select_Invoice_Mode,
      Select_Customer_Group,
      status,
      canceled,
      ProfileImg,
      createby: normalizedCreateBy,
    });
    await newCustomer.save();
    res.status(201).json({
      message: 'Customer created successfully!',
      data: newCustomer
    });
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ message: 'Server Error. Please try again later.' });
  }
};
const B2B = async (req, res) => {
  console.log("Request Body:", req.body);
  try {
    const {
      BusinessName,
      BusinessType,
      BrandName,
      BranchName,
      name,
      mobileno,
      email,
      whatsapp_no,
      Gst_no,
      BankName,
      Account_no,
      Ifsc_no,
      Bank_address,
    } = req.body;
    const customer = new Detials({
      BusinessName,
      BusinessType,
      BrandName,
      BranchName,
      name,
      mobileno,
      email,
      whatsapp_no,
      Gst_no,
      BankName,
      Account_no,
      Ifsc_no,
      Bank_address,
    });

    await customer.save();
    res.status(200).json({ message: "Customer saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving customer data", error });
  }
};
const GETB2B = async (req, res) => {
  try {
    const B2B = await Detials.find()
    res.status(200).json({ B2B })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error Please Wait" })
  }
}
const GETB2BDelete = async (req, res) => {
  try {
    const B2B = await Detials.findByIdAndDelete(req.params.id)
    if (!B2B) {
      res.status(400).json({ message: "User not found" })
    }
    res.status(200).json({ message: "User Delte successfully" })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error Please Wait" })
  }
}
const GETB2BUpdate = async (req, res) => {
  try {
    const B2B = await Detials.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!B2B) {
      res.status(400).json({ message: "User not found" })
    }
    res.status(200).json({ message: "User Update successfully" })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error Please Wait" })
  }
}
const GETB2BById = async (req, res) => {
  try {
    const B2BGET = await Detials.findById(req.params.id);  // Fetch user by ID
    if (!B2BGET) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User Found successfully", B2BGET });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error Please Wait" });
  }
}

const Venderss = async (req, res) => {
  console.log("Request Body:", req.body);
  try {
    const {
      ServiceName,
      BusinessType,
      BrandName,
      BranchName,
      name,
      mobileno,
      email,
      whatsapp_no,
      Gst_no,
      BankName,
      Account_no,
      Ifsc_no,
      Bank_address,
    } = req.body;
    const customer = new Vender({
      ServiceName,
      BusinessType,
      BrandName,
      BranchName,
      name,
      mobileno,
      email,
      whatsapp_no,
      Gst_no,
      BankName,
      Account_no,
      Ifsc_no,
      Bank_address,
    });

    await customer.save();
    res.status(200).json({ message: "Customer saved successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving customer data", error });
  }
};
module.exports = { createCustomer, B2B, GETB2B, GETB2BDelete, GETB2BById, GETB2BUpdate, Venderss };

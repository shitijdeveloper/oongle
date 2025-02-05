const Customer = require('../Models/Lead');
const createCustomer = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { 
      name,
      email,
      mobileno,
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
    const ProfileImg = req.file ? req.file.path : null;  

    const newCustomer = new Customer({
      name,
      email,
      mobileno,
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
module.exports={createCustomer}

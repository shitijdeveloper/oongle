const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createCustomer, B2B, GETB2B, GETB2BById, GETB2BDelete, GETB2BUpdate, Venderss } = require('../Controllers/CustomerController');

const uploadDir = path.join(__dirname, '..', 'public', 'images');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['.jpg', '.jpeg', '.png', '.webp'];
    const fileExtension = path.extname(file.originalname).toLowerCase();

    if (allowedTypes.includes(fileExtension)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only .jpg, .jpeg, .png, .webp are allowed.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
}).single('ProfileImg');
router.post("/customer", upload, createCustomer);
router.post("/vender", Venderss);
router.post("/B2B", B2B);
router.get("/getb2b", GETB2B);
router.get("/getb2b/:id", GETB2BById);
router.delete("/getb2b/:id", GETB2BDelete);
router.put("/getb2b/:id", GETB2BUpdate);
module.exports = router;

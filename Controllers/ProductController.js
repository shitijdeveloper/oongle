const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const Product = require('../Models/Categories');  // Assuming you have a Product model

// Controller to handle product creation
const createProduct = async (req, res) => {
  const {
    name, underGroup, barcode, stockQuality, stockUnit, hsnsac, gstClassification, brand, 
    gstExclusiveInclude, status, saleRate, purchaseRate, mrp, fssai, specialty, description, 
    bestBefore, instructions, recipe, howToUse, benefits, storage, additionalInfo, ingredients, 
    nutrition, manufacturedBy, packedBy, marketedBy, itemCode, itemContent, itemWeight, variants
  } = req.body;
  if (!name || !underGroup || !barcode || !status || !itemCode) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No images uploaded" });
  }

  try {
    // Process images and store compressed versions
    const compressedImages = [];
    for (const file of req.files) {
      const filePath = file.path;
      const outputPath = path.join(__dirname, '..', 'public', 'images', 'compressed', file.filename);

      // Compress and resize the image using sharp
      let image = sharp(filePath).resize(1920); // Resize image to 1920px wide
      const fileExtension = path.extname(file.originalname).toLowerCase();
      if (fileExtension === '.jpg' || fileExtension === '.jpeg') {
        image = image.jpeg({ quality: 70 });
      } else if (fileExtension === '.png') {
        image = image.png({ quality: 80 });
      } else if (fileExtension === '.webp') {
        image = image.webp({ quality: 80 });
      }

      // Save the compressed image to the correct output path
      await image.toFile(outputPath);
      // Store the relative URL for the compressed image, so the client can access it
      compressedImages.push(`/images/compressed/${file.filename}`);

      // Delete the original file after compression
      fs.unlinkSync(filePath);
    }

    // Parse the variants and bestBefore date
    const parsedVariants = JSON.parse(variants || '[]');
    const parsedBestBefore = bestBefore ? new Date(bestBefore) : null;
    if (bestBefore && isNaN(parsedBestBefore.getTime())) {
      return res.status(400).json({ error: 'Invalid bestBefore date format.' });
    }

    // Create a new product in the database
    const newProduct = new Product({
      name,
      underGroup,
      barcode,
      stockQuality,
      stockUnit,
      hsnsac,
      gstClassification,
      brand,
      gstExclusiveInclude,
      status,
      saleRate,
      purchaseRate,
      mrp,
      fssai,
      specialty,
      description,
      bestBefore: parsedBestBefore,
      instructions,
      recipe,
      howToUse,
      benefits,
      storage,
      additionalInfo,
      ingredients,
      nutrition,
      manufacturedBy,
      packedBy,
      marketedBy,
      itemCode,
      itemContent,
      itemWeight,
      images: compressedImages,  // Store the relative image URLs
      variants: parsedVariants,
    });

    // Save the product to the database
    await newProduct.save();
    res.status(201).json(newProduct);  // Return the created product data with image URLs

  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Error registering product. Please try again.' });
  }
};

module.exports = { createProduct };

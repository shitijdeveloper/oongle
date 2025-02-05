const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Product Schema
const productSchema = new Schema({
  name: { type: String, required: true },
  underGroup: { type: String },
  barcode: { type: String },
  stockQuality: { type: String },
  stockUnit: { type: Number },
  hsnsac: { type: String },
  gstClassification: { type: String },
  brand: { type: String },
  gstExclusiveInclude: { type: String },
  status: { type: String, default: 'active' },
  saleRate: { type: Number },
  purchaseRate: { type: Number },
  mrp: { type: Number },
  fssai: { type: String },
  specialty: { type: String },
  description: { type: String },
  bestBefore: { type: Date },
  instructions: { type: String },
  recipe: { type: String },
  howToUse: { type: String },
  benefits: { type: String },
  storage: { type: String },
  additionalInfo: { type: String },
  ingredients: { type: String },
  nutrition: { type: String },
  manufacturedBy: { type: String },
  packedBy: { type: String },
  marketedBy: { type: String },
  itemCode: { type: String },
  itemContent: { type: String },
  itemWeight: { type: String },
  images: [{ type: String }],
  variants: [{
    Ingredients_Heading: { type: String },
    Nutrition_Heading: { type: String },
    additionalVariantDetails: { type: String },
  }],
}, {
  timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create the Product Model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;

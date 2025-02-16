const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1 },
      selectedSize: String,
      selectedColor: String,
    },
  ],
});

// Check if the model already exists before defining it
module.exports = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

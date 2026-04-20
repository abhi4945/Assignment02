const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    default: "https://via.placeholder.com/150"
  }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
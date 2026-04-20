const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Simple Cart Schema
const cartSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String
});

const Cart = mongoose.model("Cart", cartSchema);

// ADD to cart
router.post("/add", async (req, res) => {
  const item = new Cart(req.body);
  const saved = await item.save();
  res.json(saved);
});

// GET cart items
router.get("/", async (req, res) => {
  const items = await Cart.find();
  res.json(items);
});

// ❗ REMOVE item (NEW)
router.delete("/:id", async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.json({ message: "Item removed" });
});

module.exports = router;
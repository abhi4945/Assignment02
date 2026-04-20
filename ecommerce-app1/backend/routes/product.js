const router = require("express").Router();
const Product = require("../models/Product");

// Create
router.post("/", async (req,res)=>{
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

// Read
router.get("/", async (req,res)=>{
  const products = await Product.find();
  res.json(products);
});

// Delete
router.delete("/:id", async (req,res)=>{
  await Product.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

module.exports = router;
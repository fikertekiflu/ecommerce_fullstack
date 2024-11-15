// controllers/ProductController.js
const Product = require('../models/Product');

// Get all products (accessible by both admin and users)
const getProducts = async (req, res) => { 
    try {
      const { searchTerm, category } = req.query; // Extract search term and category from query parameters
  
      const query = {}; // Initialize the query object
  
      // Add search term condition if provided
      if (searchTerm) {
        query.$or = [
          { name: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search in product name
          { description: { $regex: searchTerm, $options: 'i' } } // Case-insensitive search in product description
        ];
      }
  
      // Add category condition if provided
      if (category) {
        query.category = category; // Filter by selected category
      }
  
      // Fetch products based on the constructed query
      const products = await Product.find(query);
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  // Get product by ID (accessible by both admin and users)
  const getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

// Create a new product (only accessible by admin)
const createProduct = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admin can add products' });
  }

  const { name, description, price, category, images, availableColors, stock } = req.body;

  const newProduct = new Product({
    name,
    description,
    price,
    category,
    images,
    availableColors,
    stock,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update product (only accessible by admin)
const updateProduct = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admin can update products' });
  }

  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete product (only accessible by admin)
const deleteProduct = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admin can delete products' });
  }

  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

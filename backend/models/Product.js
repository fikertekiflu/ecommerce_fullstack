const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  images: {
    type: [String], // Array of image URLs
    required: true,
  },
  availableColors: {
    type: [String], // Array of color options
    required: false,
  },
  stock: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  // Additional fields based on category
  ram: { // For smartphones and laptops
    type: String,
    required: function() { return this.category === 'Smartphone' || this.category === 'Laptop'; }
  },
  storage: { // For smartphones, laptops, and tablets
    type: String,
    required: function() { return this.category === 'Smartphone' || this.category === 'Laptop' || this.category === 'Tablet'; }
  },
  processor: { // For laptops, smartphones
    type: String,
    required: function() { return this.category === 'Laptop' || this.category === 'Smartphone'; }
  },
  screenSize: { // For smartphones, laptops, tablets, and smartwatches
    type: String,
    required: function() { return ['Smartphone', 'Laptop', 'Tablet', 'Smartwatch'].includes(this.category); }
  },
  batteryCapacity: { // For smartphones, tablets, smartwatches
    type: String,
    required: function() { return ['Smartphone', 'Tablet', 'Smartwatch'].includes(this.category); }
  },
});

module.exports = mongoose.model('Product', productSchema);

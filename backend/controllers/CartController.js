const Cart = require('../models/Cart');

// Get cart items for a user with full product details
exports.getCart = async (req, res) => {
  try {
    const userId = req.params.userId; // Fetch userId from URL parameters

    // Find the cart with the given userId and populate product details
    const cart = await Cart.findOne({ userId }).populate('products.productId').exec();

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart); // Return cart if found
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Add product to cart
exports.addToCart = async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;
  
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        // Create a new cart if none exists
        cart = new Cart({ userId, products: [{ productId, quantity }] });
      } else {
        // Check if product exists in cart and if `productId` is defined
        const productIndex = cart.products.findIndex(
          (p) => p.productId && p.productId.equals(productId)
        );
  
        if (productIndex > -1) {
          // If product is already in cart, update the quantity
          cart.products[productIndex].quantity += quantity;
        } else {
          // Add new product to cart
          cart.products.push({ productId, quantity });
        }
      }
  
      await cart.save();
      res.status(200).json(cart);
    } catch (error) {
      console.error("Error in addToCart:", error); // Log the error for debugging
      res.status(500).json({ message: 'Server error', error });
    }
  };



  exports.removeFromCart = async (req, res) => {
    try {
      const { userId, productId } = req.body;
  
      const cart = await Cart.findOne({ userId });
      if (cart) {
        // Convert productId to a string for comparison
        cart.products = cart.products.filter((p) => p.productId.toString() !== productId.toString());
        await cart.save(); // Save cart changes
      }
  
      res.status(200).json(cart); // Return updated cart
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
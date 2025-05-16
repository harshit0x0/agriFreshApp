import Cart from "../models/cart.model.js"
import Product from "../models/product.model.js"
import { asyncHandler } from "../middleware/async.middleware.js"
import ErrorResponse from "../utils/errorResponse.js"

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
export const getCart = asyncHandler(async (req, res, next) => {
  let cart = await Cart.findOne({ user: req.user._id }).populate({
    path: "items.product",
    select: "name price images stock packageSizes",
  })

  if (!cart) {
    // Create cart if it doesn't exist
    cart = await Cart.create({
      user: req.user._id,
      items: [],
    })
  }

  // Calculate totals
  const cartItems = cart.items.map((item) => {
    const product = item.product

    // Find package size price if applicable
    let price = product.price
    if (item.packageSize && product.packageSizes && product.packageSizes.length > 0) {
      const packageSize = product.packageSizes.find((p) => p.size === item.packageSize)
      if (packageSize) {
        price = packageSize.price
      }
    }

    return {
      product: {
        _id: product._id,
        name: product.name,
        price,
        image: product.images && product.images.length > 0 ? product.images[0].url : "/placeholder.svg",
        stock: product.stock,
      },
      quantity: item.quantity,
      packageSize: item.packageSize,
      total: price * item.quantity,
    }
  })

  const subtotal = cartItems.reduce((acc, item) => acc + item.total, 0)
  const shipping = subtotal > 2000 ? 0 : 150 // Free shipping over ₹2000
  const total = subtotal + shipping

  res.status(200).json({
    success: true,
    data: {
      items: cartItems,
      subtotal,
      shipping,
      total,
    },
  })
})

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
export const addToCart = asyncHandler(async (req, res, next) => {
  const { productId, quantity, packageSize } = req.body

  // Validate request
  if (!productId) {
    return next(new ErrorResponse("Please provide a product ID", 400))
  }

  // Check if product exists
  const product = await Product.findById(productId)
  if (!product) {
    return next(new ErrorResponse(`Product not found with id of ${productId}`, 404))
  }

  // Check if product is in stock
  if (product.stock < quantity) {
    return next(new ErrorResponse(`Product is out of stock. Only ${product.stock} available.`, 400))
  }

  // Find user's cart or create new one
  let cart = await Cart.findOne({ user: req.user._id })
  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      items: [],
    })
  }

  // Check if product already in cart
  const itemIndex = cart.items.findIndex(
    (item) =>
      item.product.toString() === productId &&
      ((!packageSize && !item.packageSize) || item.packageSize === packageSize),
  )

  if (itemIndex > -1) {
    // Product exists in cart, update quantity
    cart.items[itemIndex].quantity += quantity
  } else {
    // Product not in cart, add new item
    cart.items.push({
      product: productId,
      quantity,
      packageSize,
    })
  }

  await cart.save()

  res.status(200).json({
    success: true,
    message: "Item added to cart",
    data: cart,
  })
})

// @desc    Update cart item
// @route   PUT /api/cart/:productId
// @access  Private
export const updateCartItem = asyncHandler(async (req, res, next) => {
  const { productId } = req.params
  const { quantity, packageSize } = req.body

  // Validate request
  if (!quantity || quantity < 1) {
    return next(new ErrorResponse("Please provide a valid quantity", 400))
  }

  // Find user's cart
  const cart = await Cart.findOne({ user: req.user._id })
  if (!cart) {
    return next(new ErrorResponse("Cart not found", 404))
  }

  // Find the item in the cart
  const itemIndex = cart.items.findIndex(
    (item) =>
      item.product.toString() === productId &&
      ((!packageSize && !item.packageSize) || item.packageSize === packageSize),
  )

  if (itemIndex === -1) {
    return next(new ErrorResponse("Item not found in cart", 404))
  }

  // Check if product is in stock
  const product = await Product.findById(productId)
  if (!product) {
    return next(new ErrorResponse(`Product not found with id of ${productId}`, 404))
  }

  if (product.stock < quantity) {
    return next(new ErrorResponse(`Product is out of stock. Only ${product.stock} available.`, 400))
  }

  // Update quantity
  cart.items[itemIndex].quantity = quantity

  // Update package size if provided
  if (packageSize) {
    cart.items[itemIndex].packageSize = packageSize
  }

  await cart.save()

  res.status(200).json({
    success: true,
    message: "Cart updated",
    data: cart,
  })
})

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
export const removeFromCart = asyncHandler(async (req, res, next) => {
  const { productId } = req.params
  const { packageSize } = req.query

  // Find user's cart
  const cart = await Cart.findOne({ user: req.user._id })
  if (!cart) {
    return next(new ErrorResponse("Cart not found", 404))
  }

  // Remove the item from cart
  cart.items = cart.items.filter(
    (item) =>
      !(
        item.product.toString() === productId &&
        ((!packageSize && !item.packageSize) || item.packageSize === packageSize)
      ),
  )

  await cart.save()

  res.status(200).json({
    success: true,
    message: "Item removed from cart",
    data: cart,
  })
})

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = asyncHandler(async (req, res, next) => {
  // Find user's cart
  const cart = await Cart.findOne({ user: req.user._id })
  if (!cart) {
    return next(new ErrorResponse("Cart not found", 404))
  }

  // Clear all items
  cart.items = []
  await cart.save()

  res.status(200).json({
    success: true,
    message: "Cart cleared",
    data: cart,
  })
})

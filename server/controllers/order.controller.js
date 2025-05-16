import Order from "../models/order.model.js"
import Product from "../models/product.model.js"
import Cart from "../models/cart.model.js"
import { asyncHandler } from "../middleware/async.middleware.js"
import ErrorResponse from "../utils/errorResponse.js"

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = asyncHandler(async (req, res, next) => {
  const { items, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice } = req.body

  if (!items || items.length === 0) {
    return next(new ErrorResponse("No order items", 400))
  }

  // Verify stock and update product quantities
  for (const item of items) {
    const product = await Product.findById(item.product)

    if (!product) {
      return next(new ErrorResponse(`Product not found with id of ${item.product}`, 404))
    }

    if (product.stock < item.quantity) {
      return next(new ErrorResponse(`Product ${product.name} is out of stock`, 400))
    }

    // Update product stock
    product.stock -= item.quantity
    await product.save()
  }

  // Create order
  const order = await Order.create({
    user: req.user._id,
    items,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  })

  // Clear user's cart after successful order
  await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] })

  res.status(201).json({
    success: true,
    data: order,
  })
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user", "name email")

  if (!order) {
    return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 404))
  }

  // Make sure user is order owner or admin
  if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    return next(new ErrorResponse("Not authorized to access this order", 403))
  }

  res.status(200).json({
    success: true,
    data: order,
  })
})

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id)

  if (!order) {
    return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 404))
  }

  if (order.isPaid) {
    return next(new ErrorResponse("Order is already paid", 400))
  }

  // Update order
  order.isPaid = true
  order.paidAt = Date.now()
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    updateTime: req.body.updateTime,
    email: req.body.email,
  }

  const updatedOrder = await order.save()

  res.status(200).json({
    success: true,
    data: updatedOrder,
  })
})

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private (Admin/Seller)
export const updateOrderStatus = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id)

  if (!order) {
    return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 404))
  }

  // Check if user is admin
  if (req.user.role !== "admin" && req.user.role !== "seller") {
    return next(new ErrorResponse("Not authorized to update order status", 403))
  }

  // Update order
  order.status = req.body.status

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now()
  }

  if (req.body.trackingNumber) {
    order.trackingNumber = req.body.trackingNumber
  }

  const updatedOrder = await order.save()

  res.status(200).json({
    success: true,
    data: updatedOrder,
  })
})

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id }).sort("-createdAt")

  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders,
  })
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private (Admin)
export const getOrders = asyncHandler(async (req, res, next) => {
  // Pagination
  const page = Number.parseInt(req.query.page, 10) || 1
  const limit = Number.parseInt(req.query.limit, 10) || 10
  const startIndex = (page - 1) * limit

  // Filter options
  const filter = {}

  if (req.query.status) {
    filter.status = req.query.status
  }

  // For sellers, only show orders with their products
  if (req.user.role === "seller") {
    // This is a simplified approach - in a real app, you'd need to filter orders
    // that contain products from this seller
    // This would require a more complex query or additional processing
  }

  const orders = await Order.find(filter)
    .populate("user", "name email")
    .sort("-createdAt")
    .skip(startIndex)
    .limit(limit)

  const total = await Order.countDocuments(filter)

  res.status(200).json({
    success: true,
    count: orders.length,
    total,
    pagination: {
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
    data: orders,
  })
})

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private (Admin)
export const deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id)

  if (!order) {
    return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 404))
  }

  // Check if user is admin
  if (req.user.role !== "admin") {
    return next(new ErrorResponse("Not authorized to delete orders", 403))
  }

  await order.deleteOne()

  res.status(200).json({
    success: true,
    data: {},
  })
})

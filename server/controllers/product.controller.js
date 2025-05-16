import Product from "../models/product.model.js"
import Category from "../models/category.model.js"
import { asyncHandler } from "../middleware/async.middleware.js"
import ErrorResponse from "../utils/errorResponse.js"

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res, next) => {
  // Build query
  const { category, brand, minPrice, maxPrice, sort, search, page = 1, limit = 10 } = req.query

  const query = {}

  // Filter by category
  if (category) {
    const categoryObj = await Category.findOne({ slug: category })
    if (categoryObj) {
      query.category = categoryObj._id
    }
  }

  // Filter by brand
  if (brand) {
    query.brand = brand
  }

  // Filter by price range
  if (minPrice || maxPrice) {
    query.price = {}
    if (minPrice) query.price.$gte = Number(minPrice)
    if (maxPrice) query.price.$lte = Number(maxPrice)
  }

  // Search by text
  if (search) {
    query.$text = { $search: search }
  }

  // Only show active products
  query.isActive = true

  // Execute query with pagination
  const skip = (Number(page) - 1) * Number(limit)

  let sortOptions = {}
  if (sort === "price-low") {
    sortOptions = { price: 1 }
  } else if (sort === "price-high") {
    sortOptions = { price: -1 }
  } else if (sort === "newest") {
    sortOptions = { createdAt: -1 }
  } else if (sort === "rating") {
    sortOptions = { ratings: -1 }
  } else {
    // Default sort (featured)
    sortOptions = { createdAt: -1 }
  }

  const products = await Product.find(query)
    .populate("category", "name slug")
    .sort(sortOptions)
    .skip(skip)
    .limit(Number(limit))

  // Get total count for pagination
  const total = await Product.countDocuments(query)

  res.status(200).json({
    success: true,
    count: products.length,
    total,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
    data: products,
  })
})

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
    .populate("category", "name slug")
    .populate("seller", "name businessName")

  if (!product) {
    return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404))
  }

  res.status(200).json({
    success: true,
    data: product,
  })
})

// @desc    Create new product
// @route   POST /api/products
// @access  Private (Seller/Admin)
export const createProduct = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.seller = req.user._id

  // Check if user is seller or admin
  if (req.user.role !== "seller" && req.user.role !== "admin") {
    return next(new ErrorResponse(`User with role ${req.user.role} is not authorized to create a product`, 403))
  }

  const product = await Product.create(req.body)

  res.status(201).json({
    success: true,
    data: product,
  })
})

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Seller/Admin)
export const updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id)

  if (!product) {
    return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404))
  }

  // Make sure user is product owner or admin
  if (product.seller.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this product`, 403))
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    data: product,
  })
})

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Seller/Admin)
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404))
  }

  // Make sure user is product owner or admin
  if (product.seller.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this product`, 403))
  }

  await product.deleteOne()

  res.status(200).json({
    success: true,
    data: {},
  })
})

// @desc    Create product review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = asyncHandler(async (req, res, next) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (!product) {
    return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404))
  }

  // Check if user already reviewed
  const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString())

  if (alreadyReviewed) {
    return next(new ErrorResponse("Product already reviewed", 400))
  }

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  }

  product.reviews.push(review)
  product.numReviews = product.reviews.length
  product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0)

  await product.save()

  res.status(201).json({
    success: true,
    message: "Review added",
  })
})

// @desc    Get related products
// @route   GET /api/products/:id/related
// @access  Public
export const getRelatedProducts = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    return next(new ErrorResponse(`Product not found with id of ${req.params.id}`, 404))
  }

  const relatedProducts = await Product.find({
    _id: { $ne: req.params.id },
    category: product.category,
    isActive: true,
  }).limit(4)

  res.status(200).json({
    success: true,
    count: relatedProducts.length,
    data: relatedProducts,
  })
})

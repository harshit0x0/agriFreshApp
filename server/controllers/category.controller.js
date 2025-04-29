import Category from "../models/category.model.js"
import { asyncHandler } from "../middleware/async.middleware.js"
import ErrorResponse from "../utils/errorResponse.js"

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({ isActive: true }).sort("name")

  res.status(200).json({
    success: true,
    count: categories.length,
    data: categories,
  })
})

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
export const getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id)

  if (!category) {
    return next(new ErrorResponse(`Category not found with id of ${req.params.id}`, 404))
  }

  res.status(200).json({
    success: true,
    data: category,
  })
})

// @desc    Create new category
// @route   POST /api/categories
// @access  Private (Admin)
export const createCategory = asyncHandler(async (req, res, next) => {
  // Check if user is admin
  if (req.user.role !== "admin") {
    return next(new ErrorResponse("Not authorized to create categories", 403))
  }

  const category = await Category.create(req.body)

  res.status(201).json({
    success: true,
    data: category,
  })
})

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private (Admin)
export const updateCategory = asyncHandler(async (req, res, next) => {
  // Check if user is admin
  if (req.user.role !== "admin") {
    return next(new ErrorResponse("Not authorized to update categories", 403))
  }

  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!category) {
    return next(new ErrorResponse(`Category not found with id of ${req.params.id}`, 404))
  }

  res.status(200).json({
    success: true,
    data: category,
  })
})

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private (Admin)
export const deleteCategory = asyncHandler(async (req, res, next) => {
  // Check if user is admin
  if (req.user.role !== "admin") {
    return next(new ErrorResponse("Not authorized to delete categories", 403))
  }

  const category = await Category.findById(req.params.id)

  if (!category) {
    return next(new ErrorResponse(`Category not found with id of ${req.params.id}`, 404))
  }

  await category.deleteOne()

  res.status(200).json({
    success: true,
    data: {},
  })
})

// @desc    Get category by slug
// @route   GET /api/categories/slug/:slug
// @access  Public
export const getCategoryBySlug = asyncHandler(async (req, res, next) => {
  const category = await Category.findOne({ slug: req.params.slug, isActive: true })

  if (!category) {
    return next(new ErrorResponse(`Category not found with slug of ${req.params.slug}`, 404))
  }

  res.status(200).json({
    success: true,
    data: category,
  })
})

// @desc    Get subcategories
// @route   GET /api/categories/:id/subcategories
// @access  Public
export const getSubcategories = asyncHandler(async (req, res, next) => {
  const subcategories = await Category.find({
    parent: req.params.id,
    isActive: true,
  }).sort("name")

  res.status(200).json({
    success: true,
    count: subcategories.length,
    data: subcategories,
  })
})

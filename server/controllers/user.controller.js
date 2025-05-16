import User from "../models/user.model.js"
import { asyncHandler } from "../middleware/async.middleware.js"
import ErrorResponse from "../utils/errorResponse.js"

// @desc    Get all users
// @route   GET /api/users
// @access  Private (Admin)
export const getUsers = asyncHandler(async (req, res, next) => {
  // Check if user is admin
  if (req.user.role !== "admin") {
    return next(new ErrorResponse("Not authorized to access this route", 403))
  }

  const users = await User.find().select("-password")

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  })
})

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private (Admin)
export const getUser = asyncHandler(async (req, res, next) => {
  // Check if user is admin
  if (req.user.role !== "admin") {
    return next(new ErrorResponse("Not authorized to access this route", 403))
  }

  const user = await User.findById(req.params.id).select("-password")

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404))
  }

  res.status(200).json({
    success: true,
    data: user,
  })
})

// @desc    Create user
// @route   POST /api/users
// @access  Private (Admin)
export const createUser = asyncHandler(async (req, res, next) => {
  // Check if user is admin
  if (req.user.role !== "admin") {
    return next(new ErrorResponse("Not authorized to access this route", 403))
  }

  const user = await User.create(req.body)

  res.status(201).json({
    success: true,
    data: user,
  })
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private (Admin)
export const updateUser = asyncHandler(async (req, res, next) => {
  // Check if user is admin
  if (req.user.role !== "admin") {
    return next(new ErrorResponse("Not authorized to access this route", 403))
  }

  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).select("-password")

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404))
  }

  res.status(200).json({
    success: true,
    data: user,
  })
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private (Admin)
export const deleteUser = asyncHandler(async (req, res, next) => {
  // Check if user is admin
  if (req.user.role !== "admin") {
    return next(new ErrorResponse("Not authorized to access this route", 403))
  }

  const user = await User.findById(req.params.id)

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404))
  }

  await user.deleteOne()

  res.status(200).json({
    success: true,
    data: {},
  })
})

// @desc    Update user address
// @route   PUT /api/users/address
// @access  Private
export const updateAddress = asyncHandler(async (req, res, next) => {
  const { street, city, state, pincode } = req.body

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      address: {
        street,
        city,
        state,
        pincode,
      },
    },
    {
      new: true,
      runValidators: true,
    },
  )

  res.status(200).json({
    success: true,
    data: user,
  })
})

// @desc    Get seller profile
// @route   GET /api/users/seller/:id
// @access  Public
export const getSellerProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("name businessName businessType")

  if (!user || user.role !== "seller") {
    return next(new ErrorResponse(`Seller not found with id of ${req.params.id}`, 404))
  }

  res.status(200).json({
    success: true,
    data: user,
  })
})

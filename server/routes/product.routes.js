import express from "express"
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getRelatedProducts,
} from "../controllers/product.controller.js"
import { protect } from "../middleware/auth.middleware.js"

const router = express.Router()

router.route("/").get(getProducts).post(protect, createProduct)

router.route("/:id").get(getProduct).put(protect, updateProduct).delete(protect, deleteProduct)

router.route("/:id/reviews").post(protect, createProductReview)

router.route("/:id/related").get(getRelatedProducts)

export default router

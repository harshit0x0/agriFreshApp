import express from "express"
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryBySlug,
  getSubcategories,
} from "../controllers/category.controller.js"
import { protect } from "../middleware/auth.middleware.js"

const router = express.Router()

router.route("/").get(getCategories).post(protect, createCategory)

router.route("/:id").get(getCategory).put(protect, updateCategory).delete(protect, deleteCategory)

router.get("/slug/:slug", getCategoryBySlug)
router.get("/:id/subcategories", getSubcategories)

export default router

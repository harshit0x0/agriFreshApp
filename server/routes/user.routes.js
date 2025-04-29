import express from "express"
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateAddress,
  getSellerProfile,
} from "../controllers/user.controller.js"
import { protect } from "../middleware/auth.middleware.js"

const router = express.Router()

router.use(protect)

router.route("/").get(getUsers).post(createUser)

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser)

router.put("/address", updateAddress)
router.get("/seller/:id", getSellerProfile)

export default router

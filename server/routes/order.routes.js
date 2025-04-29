import express from "express"
import {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderStatus,
  getMyOrders,
  getOrders,
  deleteOrder,
} from "../controllers/order.controller.js"
import { protect } from "../middleware/auth.middleware.js"

const router = express.Router()

router.use(protect)

router.route("/").post(createOrder).get(getOrders)

router.get("/myorders", getMyOrders)

router.route("/:id").get(getOrderById).delete(deleteOrder)

router.put("/:id/pay", updateOrderToPaid)
router.put("/:id/status", updateOrderStatus)

export default router

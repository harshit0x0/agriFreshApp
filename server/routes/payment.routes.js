import express from "express"
import {
  createPaymentIntent,
  verifyPayment,
  getPaymentMethods,
  processRefund,
} from "../controllers/payment.controller.js"
import { protect } from "../middleware/auth.middleware.js"

const router = express.Router()

router.use(protect)

router.post("/create-payment-intent", createPaymentIntent)
router.post("/verify", verifyPayment)
router.get("/methods", getPaymentMethods)
router.post("/refund", processRefund)

export default router

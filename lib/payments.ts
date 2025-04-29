import api from "./api"
import type { PaymentIntent, PaymentVerification, ApiResponse } from "@/types"

// Create payment intent
export const createPaymentIntent = async (amount: number): Promise<ApiResponse<PaymentIntent>> => {
  try {
    const response = await api.post<ApiResponse<PaymentIntent>>("/payments/create-payment-intent", { amount })
    return response.data
  } catch (error: any) {
    throw error.response?.data || { success: false, error: "Failed to create payment intent" }
  }
}

// Verify payment
export const verifyPayment = async (paymentData: PaymentVerification): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post<ApiResponse<any>>("/payments/verify", paymentData)
    return response.data
  } catch (error: any) {
    throw error.response?.data || { success: false, error: "Failed to verify payment" }
  }
}

// Get payment methods
export const getPaymentMethods = async (): Promise<
  ApiResponse<{ id: string; name: string; description: string; isActive: boolean }[]>
> => {
  try {
    const response =
      await api.get<ApiResponse<{ id: string; name: string; description: string; isActive: boolean }[]>>(
        "/payments/methods",
      )
    return response.data
  } catch (error: any) {
    throw error.response?.data || { success: false, error: "Failed to fetch payment methods" }
  }
}

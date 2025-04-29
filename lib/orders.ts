import api from "./api"
import type { Order, ShippingAddress, OrderItem, PaymentResult, ApiResponse } from "@/types"

interface CreateOrderData {
  items: OrderItem[]
  shippingAddress: ShippingAddress
  paymentMethod: "card" | "bank" | "cod"
  itemsPrice: number
  shippingPrice: number
  taxPrice: number
  totalPrice: number
  paymentResult?: PaymentResult | null
}

// Create new order
export const createOrder = async (orderData: CreateOrderData): Promise<ApiResponse<Order>> => {
  try {
    const response = await api.post<ApiResponse<Order>>("/orders", orderData)
    return response.data
  } catch (error: any) {
    throw error.response?.data || { success: false, error: "Failed to create order" }
  }
}

// Get order by ID
export const getOrder = async (id: string): Promise<ApiResponse<Order>> => {
  try {
    const response = await api.get<ApiResponse<Order>>(`/orders/${id}`)
    return response.data
  } catch (error: any) {
    throw error.response?.data || { success: false, error: "Failed to fetch order" }
  }
}

// Get logged in user orders
export const getMyOrders = async (): Promise<ApiResponse<Order[]>> => {
  try {
    const response = await api.get<ApiResponse<Order[]>>("/orders/myorders")
    return response.data
  } catch (error: any) {
    throw error.response?.data || { success: false, error: "Failed to fetch orders" }
  }
}

// Update order to paid
export const updateOrderToPaid = async (orderId: string, paymentResult: PaymentResult): Promise<ApiResponse<Order>> => {
  try {
    const response = await api.put<ApiResponse<Order>>(`/orders/${orderId}/pay`, paymentResult)
    return response.data
  } catch (error: any) {
    throw error.response?.data || { success: false, error: "Failed to update payment status" }
  }
}

// Update order status (admin/seller)
export const updateOrderStatus = async (
  orderId: string,
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled",
  trackingNumber: string | null = null,
): Promise<ApiResponse<Order>> => {
  try {
    const response = await api.put<ApiResponse<Order>>(`/orders/${orderId}/status`, { status, trackingNumber })
    return response.data
  } catch (error: any) {
    throw error.response?.data || { success: false, error: "Failed to update order status" }
  }
}

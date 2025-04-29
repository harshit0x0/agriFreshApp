import api from "./api"
import type { Cart, ApiResponse } from "@/types"

// Get user cart
export const getCart = async (): Promise<ApiResponse<Cart>> => {
  try {
    const response = await api.get<ApiResponse<Cart>>("/cart")
    return response.data
  } catch (error: any) {
    throw error.response?.data || { success: false, error: "Failed to fetch cart" }
  }
}

// Add item to cart
export const addToCart = async (
  productId: string,
  quantity: number,
  packageSize: string | null = null,
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.post<ApiResponse<any>>("/cart", { productId, quantity, packageSize })
    return response.data
  } catch (error: any) {
    throw error.response?.data || { success: false, error: "Failed to add item to cart" }
  }
}

// Update cart item
export const updateCartItem = async (
  productId: string,
  quantity: number,
  packageSize: string | null = null,
): Promise<ApiResponse<any>> => {
  try {
    const response = await api.put<ApiResponse<any>>(`/cart/${productId}`, { quantity, packageSize })
    return response.data
  } catch (error: any) {
    throw error.response?.data || { success: false, error: "Failed to update cart item" }
  }
}

// Remove item from cart
export const removeFromCart = async (
  productId: string,
  packageSize: string | null = null,
): Promise<ApiResponse<any>> => {
  try {
    const queryParams = packageSize ? `?packageSize=${packageSize}` : ""
    const response = await api.delete<ApiResponse<any>>(`/cart/${productId}${queryParams}`)
    return response.data
  } catch (error: any) {
    throw error.response?.data || { success: false, error: "Failed to remove item from cart" }
  }
}

// Clear cart
export const clearCart = async (): Promise<ApiResponse<any>> => {
  try {
    const response = await api.delete<ApiResponse<any>>("/cart")
    return response.data
  } catch (error: any) {
    throw error.response?.data || { success: false, error: "Failed to clear cart" }
  }
}

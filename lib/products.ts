import api from "./api"
import type { Product, ProductFilters, ReviewData, PaginatedApiResponse, ApiResponse } from "@/types"

// Get all products with filters
export const getProducts = async (filters: ProductFilters = {}): Promise<PaginatedApiResponse<Product>> => {
  try {
    const queryParams = new URLSearchParams()

    // Add filters to query params
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        queryParams.append(key, String(value))
      }
    })

    const response = await api.get<PaginatedApiResponse<Product>>(`/products?${queryParams.toString()}`)
    return response.data
  } catch (error: any) {
    throw error.response?.data || { success: false, error: "Failed to fetch products" }
  }
}

// Get single product
export const getProduct = async (id: string): Promise<ApiResponse<Product>> => {
  try {
    const response = await api.get<ApiResponse<Product>>(`/products/${id}`)
    return response.data
  } catch (error: any) {
    throw error.response?.data || { success: false, error: "Failed to fetch product" }
  }
}

// Create product review
export const createProductReview = async (
  productId: string,
  reviewData: ReviewData,
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await api.post<{ success: boolean; message: string }>(`/products/${productId}/reviews`, reviewData)
    return response.data
  } catch (error: any) {
    throw error.response?.data || { success: false, error: "Failed to create review" }
  }
}

// Get related products
export const getRelatedProducts = async (productId: string): Promise<ApiResponse<Product[]>> => {
  try {
    const response = await api.get<ApiResponse<Product[]>>(`/products/${productId}/related`)
    return response.data
  } catch (error: any) {
    throw error.response?.data || { success: false, error: "Failed to fetch related products" }
  }
}

// Create product (seller/admin)
export const createProduct = async (productData: Partial<Product>): Promise<ApiResponse<Product>> => {
  try {
    const response = await api.post<ApiResponse<Product>>("/products", productData)
    return response.data
  } catch (error: any) {
    throw error.response?.data || { success: false, error: "Failed to create product" }
  }
}

// Update product (seller/admin)
export const updateProduct = async (id: string, productData: Partial<Product>): Promise<ApiResponse<Product>> => {
  try {
    const response = await api.put<ApiResponse<Product>>(`/products/${id}`, productData)
    return response.data
  } catch (error: any) {
    throw error.response?.data || { success: false, error: "Failed to update product" }
  }
}

// Delete product (seller/admin)
export const deleteProduct = async (id: string): Promise<{ success: boolean; data: {} }> => {
  try {
    const response = await api.delete<{ success: boolean; data: {} }>(`/products/${id}`)
    return response.data
  } catch (error: any) {
    throw error.response?.data || { success: false, error: "Failed to delete product" }
  }
}

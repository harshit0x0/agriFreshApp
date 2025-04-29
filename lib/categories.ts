import api from "./api"
import type { Category, ApiResponse } from "@/types"

// Get all categories
export const getCategories = async (): Promise<ApiResponse<Category[]>> => {
  try {
    const response = await api.get<ApiResponse<Category[]>>("/categories")
    return response.data
  } catch (error: any) {
    throw error.response?.data || { success: false, error: "Failed to fetch categories" }
  }
}

// Get category by slug
export const getCategoryBySlug = async (slug: string): Promise<ApiResponse<Category>> => {
  try {
    const response = await api.get<ApiResponse<Category>>(`/categories/slug/${slug}`)
    return response.data
  } catch (error: any) {
    throw error.response?.data || { success: false, error: "Failed to fetch category" }
  }
}

// Get subcategories
export const getSubcategories = async (categoryId: string): Promise<ApiResponse<Category[]>> => {
  try {
    const response = await api.get<ApiResponse<Category[]>>(`/categories/${categoryId}/subcategories`)
    return response.data
  } catch (error: any) {
    throw error.response?.data || { success: false, error: "Failed to fetch subcategories" }
  }
}

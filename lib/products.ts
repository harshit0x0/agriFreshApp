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

// Add the createProduct function implementation

// Create product (seller/admin)
export const createProduct = async (productData: Partial<Product>): Promise<ApiResponse<Product>> => {
  try {
    // In a real app, this would call the API
    // For now, we'll simulate a successful product creation
    const mockProduct: Product = {
      _id: "prod_" + Date.now(),
      name: productData.name || "",
      description: productData.description || "",
      price: productData.price || 0,
      images: productData.images || [{ url: "/placeholder.svg", alt: "Product Image" }],
      category: productData.category || "",
      stock: productData.stock || 0,
      brand: productData.brand || "",
      seller: "user123",
      ratings: 0,
      numReviews: 0,
      reviews: [],
      specifications: productData.specifications || [],
      packageSizes: productData.packageSizes || [],
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // In a real app, we would save this to the database
    console.log("Created product:", mockProduct)

    return {
      success: true,
      data: mockProduct,
    }
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

// Get seller products
export const getSellerProducts = async (): Promise<ApiResponse<Product[]>> => {
  try {
    // In a real app, this would call the API
    // For now, we'll return mock data
    const mockProducts: Product[] = [
      {
        _id: "prod123",
        name: "Organic Basmati Rice",
        description: "Premium quality organic basmati rice",
        price: 180,
        images: [{ url: "/placeholder.svg", alt: "Basmati Rice" }],
        category: { _id: "cat1", name: "Grains & Pulses" } as any,
        stock: 100,
        brand: "Kumar Farms",
        seller: "user123",
        ratings: 4.5,
        numReviews: 10,
        reviews: [],
        specifications: [
          { name: "Type", value: "Organic" },
          { name: "Weight", value: "5kg" },
        ],
        packageSizes: [
          { size: "1kg", price: 180, stock: 40 },
          { size: "5kg", price: 850, stock: 35 },
          { size: "10kg", price: 1650, stock: 25 },
        ],
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        _id: "prod456",
        name: "Premium Wheat Seeds",
        description: "High-yield wheat seeds for better crop production",
        price: 1200,
        images: [{ url: "/placeholder.svg", alt: "Wheat Seeds" }],
        category: { _id: "cat2", name: "Seeds & Plants" } as any,
        stock: 50,
        brand: "GrowWell",
        seller: "user123",
        ratings: 4.2,
        numReviews: 8,
        reviews: [],
        specifications: [
          { name: "Variety", value: "HD-2967" },
          { name: "Germination Rate", value: "95%" },
        ],
        packageSizes: [
          { size: "5kg", price: 1200, stock: 20 },
          { size: "10kg", price: 2300, stock: 15 },
          { size: "25kg", price: 5500, stock: 15 },
        ],
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        _id: "prod789",
        name: "Organic Fertilizer",
        description: "100% organic fertilizer for all types of crops",
        price: 850,
        images: [{ url: "/placeholder.svg", alt: "Organic Fertilizer" }],
        category: { _id: "cat3", name: "Fertilizers" } as any,
        stock: 75,
        brand: "EcoNutrients",
        seller: "user123",
        ratings: 4.7,
        numReviews: 15,
        reviews: [],
        specifications: [
          { name: "Type", value: "Organic" },
          { name: "Composition", value: "NPK 5-3-2" },
        ],
        packageSizes: [],
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]

    return {
      success: true,
      data: mockProducts,
    }
  } catch (error: any) {
    throw error.response?.data || { success: false, error: "Failed to fetch seller products" }
  }
}

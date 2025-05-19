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

// Get logged in user orders
export const getMyOrders = async (): Promise<ApiResponse<Order[]>> => {
  try {
    // In a real app, this would call the API
    // For now, we'll return mock data
    const mockOrders: Order[] = [
      {
        _id: "ord1234567890",
        user: "user123",
        items: [
          {
            product: "prod123",
            name: "Organic Basmati Rice",
            quantity: 2,
            price: 180,
            image: "/placeholder.svg",
          },
          {
            product: "prod456",
            name: "Premium Wheat Seeds",
            quantity: 1,
            price: 1200,
            image: "/placeholder.svg",
          },
        ],
        shippingAddress: {
          firstName: "Test",
          lastName: "User",
          address: "123 Test Street",
          city: "Test City",
          state: "Test State",
          pincode: "123456",
          phone: "9876543210",
          email: "test@example.com",
        },
        paymentMethod: "card",
        itemsPrice: 1560,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: 1560,
        isPaid: true,
        paidAt: new Date().toISOString(),
        status: "Delivered",
        deliveredAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        _id: "ord0987654321",
        user: "user123",
        items: [
          {
            product: "prod789",
            name: "Organic Fertilizer",
            quantity: 1,
            price: 850,
            image: "/placeholder.svg",
          },
        ],
        shippingAddress: {
          firstName: "Test",
          lastName: "User",
          address: "123 Test Street",
          city: "Test City",
          state: "Test State",
          pincode: "123456",
          phone: "9876543210",
          email: "test@example.com",
        },
        paymentMethod: "cod",
        itemsPrice: 850,
        shippingPrice: 150,
        taxPrice: 0,
        totalPrice: 1000,
        isPaid: false,
        status: "Processing",
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ]

    return {
      success: true,
      data: mockOrders,
    }
  } catch (error: any) {
    throw error.response?.data || { success: false, error: "Failed to fetch orders" }
  }
}

// Get order by ID
export const getOrder = async (id: string): Promise<ApiResponse<Order>> => {
  try {
    // In a real app, this would call the API
    // For now, we'll return mock data based on the ID
    const mockOrder: Order = {
      _id: id,
      user: "user123",
      items: [
        {
          product: "prod123",
          name: "Organic Basmati Rice",
          quantity: 2,
          price: 180,
          image: "/placeholder.svg",
        },
        {
          product: "prod456",
          name: "Premium Wheat Seeds",
          quantity: 1,
          price: 1200,
          image: "/placeholder.svg",
        },
      ],
      shippingAddress: {
        firstName: "Test",
        lastName: "User",
        address: "123 Test Street",
        city: "Test City",
        state: "Test State",
        pincode: "123456",
        phone: "9876543210",
        email: "test@example.com",
      },
      paymentMethod: "card",
      itemsPrice: 1560,
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: 1560,
      isPaid: true,
      paidAt: new Date().toISOString(),
      status: "Delivered",
      deliveredAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return {
      success: true,
      data: mockOrder,
    }
  } catch (error: any) {
    throw error.response?.data || { success: false, error: "Failed to fetch order" }
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

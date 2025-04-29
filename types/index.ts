// User types
export interface User {
  id: string
  name: string
  email: string
  role: "buyer" | "seller" | "admin"
  phone?: string
  businessName?: string
  businessType?: "farmer" | "supplier" | "processor"
  address?: Address
  isVerified?: boolean
}

export interface Address {
  street?: string
  city?: string
  state?: string
  pincode?: string
  country?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  phone: string
  role: "buyer" | "seller" | "admin"
  businessName?: string
  businessType?: "farmer" | "supplier" | "processor"
}

// Product types
export interface Product {
  _id: string
  name: string
  description: string
  price: number
  images: ProductImage[]
  category: string | Category
  stock: number
  brand: string
  seller: string | User
  ratings: number
  numReviews: number
  reviews: Review[]
  specifications: Specification[]
  packageSizes: PackageSize[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface ProductImage {
  url: string
  alt?: string
}

export interface Specification {
  name: string
  value: string
}

export interface PackageSize {
  size: string
  price: number
  stock: number
}

export interface Review {
  _id: string
  user: string
  name: string
  rating: number
  comment: string
  date: string
}

export interface ReviewData {
  rating: number
  comment: string
}

// Category types
export interface Category {
  _id: string
  name: string
  slug: string
  description: string
  image?: string
  parent?: string | null
  isActive: boolean
}

// Cart types
export interface CartItem {
  product: {
    _id: string
    name: string
    price: number
    image: string
    stock: number
  }
  quantity: number
  packageSize?: string | null
  total: number
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  shipping: number
  total: number
}

// Order types
export interface Order {
  _id: string
  user: string | User
  items: OrderItem[]
  shippingAddress: ShippingAddress
  paymentMethod: "card" | "bank" | "cod"
  paymentResult?: PaymentResult
  itemsPrice: number
  shippingPrice: number
  taxPrice: number
  totalPrice: number
  isPaid: boolean
  paidAt?: string
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled"
  deliveredAt?: string
  notes?: string
  trackingNumber?: string
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  product: string
  name: string
  quantity: number
  price: number
  packageSize?: string | null
  image: string
}

export interface ShippingAddress {
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  pincode: string
  phone: string
  email?: string
}

export interface PaymentResult {
  id: string
  status: string
  updateTime: string
  email: string
}

// API response types
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

export interface PaginatedApiResponse<T> extends ApiResponse<T[]> {
  count: number
  total: number
  pagination: {
    page: number
    limit: number
    totalPages: number
  }
}

export interface AuthResponse {
  success: boolean
  token: string
  user: User
  error?: string
}

// Filter types
export interface ProductFilters {
  category?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  sort?: "featured" | "price-low" | "price-high" | "rating" | "newest"
  search?: string
  page?: number
  limit?: number
}

// Payment types
export interface CardInfo {
  cardNumber: string
  expiry: string
  cvv: string
  nameOnCard: string
}

export interface PaymentIntent {
  clientSecret: string
  amount: number
}

export interface PaymentVerification {
  paymentId: string
  orderId: string
  signature?: string
}

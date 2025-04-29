import api from "./api"
import type { AuthResponse, User, LoginCredentials, RegisterData } from "@/types"

// Register user
export const register = async (userData: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>("/auth/register", userData)
    if (response.data.success) {
      // Store token and user data
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))
    }
    return response.data
  } catch (error: any) {
    throw error.response?.data || { success: false, error: "An error occurred during registration" }
  }
}

// Login user
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const credentials: LoginCredentials = { email, password }
    const response = await api.post<AuthResponse>("/auth/login", credentials)
    if (response.data.success) {
      // Store token and user data
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))
    }
    return response.data
  } catch (error: any) {
    throw error.response?.data || { success: false, error: "Invalid credentials" }
  }
}

// Logout user
export const logout = async (): Promise<{ success: boolean }> => {
  try {
    await api.get("/auth/logout")
    // Clear local storage
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    return { success: true }
  } catch (error: any) {
    throw error.response?.data || { success: false, error: "An error occurred during logout" }
  }
}

// Get current user
export const getCurrentUser = async (): Promise<{ success: boolean; data: User }> => {
  try {
    const response = await api.get<{ success: boolean; data: User }>("/auth/me")
    return response.data
  } catch (error: any) {
    throw error.response?.data || { success: false, error: "Failed to get user data" }
  }
}

// Update user details
export const updateUserDetails = async (userData: Partial<User>): Promise<{ success: boolean; data: User }> => {
  try {
    const response = await api.put<{ success: boolean; data: User }>("/auth/updatedetails", userData)
    return response.data
  } catch (error: any) {
    throw error.response?.data || { success: false, error: "Failed to update user details" }
  }
}

// Update password
export const updatePassword = async (passwordData: {
  currentPassword: string
  newPassword: string
}): Promise<AuthResponse> => {
  try {
    const response = await api.put<AuthResponse>("/auth/updatepassword", passwordData)
    return response.data
  } catch (error: any) {
    throw error.response?.data || { success: false, error: "Failed to update password" }
  }
}

// Forgot password
export const forgotPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await api.post<{ success: boolean; message: string }>("/auth/forgotpassword", { email })
    return response.data
  } catch (error: any) {
    throw error.response?.data || { success: false, error: "Failed to process forgot password request" }
  }
}

// Reset password
export const resetPassword = async (
  resetToken: string,
  password: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await api.put<{ success: boolean; message: string }>(`/auth/resetpassword/${resetToken}`, {
      password,
    })
    return response.data
  } catch (error: any) {
    throw error.response?.data || { success: false, error: "Failed to reset password" }
  }
}

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") {
    return false
  }

  const token = localStorage.getItem("token")
  return !!token
}

// Get user role
export const getUserRole = (): string | null => {
  if (typeof window === "undefined") {
    return null
  }

  const user = JSON.parse(localStorage.getItem("user") || "{}")
  return user.role || null
}

// Get user data
export const getUserData = (): User | null => {
  if (typeof window === "undefined") {
    return null
  }

  const userData = localStorage.getItem("user")
  return userData ? JSON.parse(userData) : null
}

"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { login as loginApi, register as registerApi, logout as logoutApi, getUserData } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in
    const storedUser = getUserData()
    if (storedUser && Object.keys(storedUser).length > 0) {
      setUser(storedUser)
    }
    setLoading(false)
  }, [])

  // Register user
  const register = async (userData) => {
    setLoading(true)
    try {
      const data = await registerApi(userData)
      setUser(data.user)
      toast({
        title: "Registration successful",
        description: "Welcome to AgriFresh!",
      })
      router.push("/")
      return data
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error.error || "An error occurred during registration",
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Login user
  const login = async (email, password) => {
    setLoading(true)
    try {
      const data = await loginApi(email, password)
      setUser(data.user)
      toast({
        title: "Login successful",
        description: "Welcome back!",
      })
      router.push("/")
      return data
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.error || "Invalid credentials",
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Logout user
  const logout = async () => {
    setLoading(true)
    try {
      await logoutApi()
      setUser(null)
      toast({
        title: "Logout successful",
        description: "You have been logged out",
      })
      router.push("/")
    } catch (error) {
      toast({
        title: "Logout failed",
        description: error.error || "An error occurred during logout",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        isSeller: user?.role === "seller",
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

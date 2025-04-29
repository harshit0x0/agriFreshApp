"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { login as loginApi, register as registerApi, logout as logoutApi, getUserData } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"
import type { User, RegisterData } from "@/types"

interface AuthContextType {
  user: User | null
  loading: boolean
  register: (userData: RegisterData) => Promise<any>
  login: (email: string, password: string) => Promise<any>
  logout: () => Promise<void>
  isAuthenticated: boolean
  isAdmin: boolean
  isSeller: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
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
  const register = async (userData: RegisterData) => {
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
    } catch (error: any) {
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
  const login = async (email: string, password: string) => {
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
    } catch (error: any) {
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
    } catch (error: any) {
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

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

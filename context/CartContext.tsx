"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from "@/lib/cart"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "./AuthContext"
import type { Cart } from "@/types"

interface CartContextType {
  cart: Cart
  loading: boolean
  addItem: (productId: string, quantity: number, packageSize?: string | null) => Promise<void>
  updateItem: (productId: string, quantity: number, packageSize?: string | null) => Promise<void>
  removeItem: (productId: string, packageSize?: string | null) => Promise<void>
  emptyCart: () => Promise<void>
  fetchCart: () => Promise<void>
}

const defaultCart: Cart = { items: [], subtotal: 0, shipping: 0, total: 0 }

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart>(defaultCart)
  const [loading, setLoading] = useState<boolean>(false)
  const { toast } = useToast()
  const { isAuthenticated } = useAuth()

  // Fetch cart on auth change
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart()
    } else {
      // If not authenticated, try to get cart from local storage
      const localCart = localStorage.getItem("cart")
      if (localCart) {
        setCart(JSON.parse(localCart))
      } else {
        setCart(defaultCart)
      }
    }
  }, [isAuthenticated])

  // Fetch cart from API
  const fetchCart = async (): Promise<void> => {
    if (!isAuthenticated) return

    setLoading(true)
    try {
      const response = await getCart()
      if (response.success) {
        setCart(response.data)
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.error || "Failed to fetch cart",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Add item to cart
  const addItem = async (productId: string, quantity: number, packageSize: string | null = null): Promise<void> => {
    setLoading(true)
    try {
      if (isAuthenticated) {
        // If authenticated, use API
        const response = await addToCart(productId, quantity, packageSize)
        if (response.success) {
          await fetchCart() // Refresh cart after adding item
          toast({
            title: "Success",
            description: "Item added to cart",
          })
        }
      } else {
        // If not authenticated, handle locally
        // This is a simplified version - in a real app, you'd need to fetch product details
        toast({
          title: "Please login",
          description: "You need to login to add items to cart",
        })
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.error || "Failed to add item to cart",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Update cart item
  const updateItem = async (productId: string, quantity: number, packageSize: string | null = null): Promise<void> => {
    setLoading(true)
    try {
      if (isAuthenticated) {
        // If authenticated, use API
        const response = await updateCartItem(productId, quantity, packageSize)
        if (response.success) {
          await fetchCart() // Refresh cart after updating item
          toast({
            title: "Success",
            description: "Cart updated",
          })
        }
      } else {
        // If not authenticated, handle locally
        toast({
          title: "Please login",
          description: "You need to login to update your cart",
        })
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.error || "Failed to update cart",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Remove item from cart
  const removeItem = async (productId: string, packageSize: string | null = null): Promise<void> => {
    setLoading(true)
    try {
      if (isAuthenticated) {
        // If authenticated, use API
        const response = await removeFromCart(productId, packageSize)
        if (response.success) {
          await fetchCart() // Refresh cart after removing item
          toast({
            title: "Success",
            description: "Item removed from cart",
          })
        }
      } else {
        // If not authenticated, handle locally
        toast({
          title: "Please login",
          description: "You need to login to remove items from your cart",
        })
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.error || "Failed to remove item from cart",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Clear cart
  const emptyCart = async (): Promise<void> => {
    setLoading(true)
    try {
      if (isAuthenticated) {
        // If authenticated, use API
        const response = await clearCart()
        if (response.success) {
          setCart(defaultCart)
          toast({
            title: "Success",
            description: "Cart cleared",
          })
        }
      } else {
        // If not authenticated, handle locally
        setCart(defaultCart)
        localStorage.removeItem("cart")
        toast({
          title: "Success",
          description: "Cart cleared",
        })
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.error || "Failed to clear cart",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addItem,
        updateItem,
        removeItem,
        emptyCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = (): CartContextType => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

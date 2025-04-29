"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from "@/lib/cart"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "./AuthContext"

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], subtotal: 0, shipping: 0, total: 0 })
  const [loading, setLoading] = useState(false)
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
        setCart({ items: [], subtotal: 0, shipping: 0, total: 0 })
      }
    }
  }, [isAuthenticated])

  // Fetch cart from API
  const fetchCart = async () => {
    if (!isAuthenticated) return

    setLoading(true)
    try {
      const response = await getCart()
      if (response.success) {
        setCart(response.data)
      }
    } catch (error) {
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
  const addItem = async (productId, quantity, packageSize = null) => {
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
    } catch (error) {
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
  const updateItem = async (productId, quantity, packageSize = null) => {
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
    } catch (error) {
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
  const removeItem = async (productId, packageSize = null) => {
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
    } catch (error) {
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
  const emptyCart = async () => {
    setLoading(true)
    try {
      if (isAuthenticated) {
        // If authenticated, use API
        const response = await clearCart()
        if (response.success) {
          setCart({ items: [], subtotal: 0, shipping: 0, total: 0 })
          toast({
            title: "Success",
            description: "Cart cleared",
          })
        }
      } else {
        // If not authenticated, handle locally
        setCart({ items: [], subtotal: 0, shipping: 0, total: 0 })
        localStorage.removeItem("cart")
        toast({
          title: "Success",
          description: "Cart cleared",
        })
      }
    } catch (error) {
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

export const useCart = () => useContext(CartContext)

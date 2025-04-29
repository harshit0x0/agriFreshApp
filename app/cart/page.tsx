"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { useAuth } from "@/context/AuthContext"
import { useToast } from "@/hooks/use-toast"
import type { JSX } from "react"

export default function CartPage(): JSX.Element {
  const { cart, loading, updateItem, removeItem, emptyCart } = useCart()
  const { isAuthenticated } = useAuth()
  const { toast } = useToast()

  if (loading) {
    return (
      <div className="container px-4 py-8 mx-auto text-center">
        <h2 className="text-xl">Loading cart...</h2>
      </div>
    )
  }

  const handleUpdateQuantity = async (
    productId: string,
    newQuantity: number,
    packageSize: string | null = null,
  ): Promise<void> => {
    if (newQuantity < 1) return

    try {
      await updateItem(productId, newQuantity, packageSize)
    } catch (error) {
      console.error("Failed to update cart:", error)
    }
  }

  const handleRemoveItem = async (productId: string, packageSize: string | null = null): Promise<void> => {
    try {
      await removeItem(productId, packageSize)
    } catch (error) {
      console.error("Failed to remove item:", error)
    }
  }

  const handleClearCart = async (): Promise<void> => {
    try {
      await emptyCart()
    } catch (error) {
      console.error("Failed to clear cart:", error)
    }
  }

  const handleApplyCoupon = (): void => {
    toast({
      title: "Feature not available",
      description: "Coupon functionality is not implemented yet",
    })
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {!isAuthenticated ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-4">Please login to view your cart</h2>
          <p className="text-muted-foreground mb-6">You need to be logged in to manage your cart</p>
          <Link href="/auth/login">
            <Button className="bg-green-700 hover:bg-green-800">Login</Button>
          </Link>
        </div>
      ) : cart.items.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Link href="/products">
            <Button className="bg-green-700 hover:bg-green-800">Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="space-y-4">
              {cart.items.map((item) => (
                <Card key={`${item.product._id}-${item.packageSize || "default"}`}>
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="relative h-24 w-24 overflow-hidden rounded-md">
                        <Image
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="font-medium">{item.product.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Unit Price: ₹{item.product.price}
                            {item.packageSize && ` (${item.packageSize})`}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                handleUpdateQuantity(item.product._id, item.quantity - 1, item.packageSize)
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-12 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                handleUpdateQuantity(item.product._id, item.quantity + 1, item.packageSize)
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-4">
                            <p className="font-medium">₹{item.total}</p>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                              onClick={() => handleRemoveItem(item.product._id, item.packageSize)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 flex justify-between">
              <Link href="/products">
                <Button variant="outline">Continue Shopping</Button>
              </Link>
              <Button variant="outline" onClick={handleClearCart}>
                Clear Cart
              </Button>
            </div>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{cart.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{cart.shipping === 0 ? "Free" : `₹${cart.shipping}`}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>₹{cart.total}</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <div className="space-y-2 w-full">
                  <Label htmlFor="coupon">Coupon Code</Label>
                  <div className="flex gap-2">
                    <Input id="coupon" placeholder="Enter coupon code" />
                    <Button variant="outline" onClick={handleApplyCoupon}>
                      Apply
                    </Button>
                  </div>
                </div>
                <Link href="/checkout" className="w-full">
                  <Button className="w-full bg-green-700 hover:bg-green-800">Proceed to Checkout</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

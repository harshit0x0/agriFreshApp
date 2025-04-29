"use client"

import { useState, useEffect, type FormEvent, type ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { CreditCard, Landmark, Truck, Wallet } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { useAuth } from "@/context/AuthContext"
import { useToast } from "@/hooks/use-toast"
import { createOrder } from "@/lib/orders"
import { createPaymentIntent, verifyPayment } from "@/lib/payments"
import type { ShippingAddress, OrderItem, PaymentResult, CardInfo } from "@/types"

interface ShippingInfo extends ShippingAddress {
  notes: string
}

export default function CheckoutPage(): JSX.Element {
  const router = useRouter()
  const { cart, loading: cartLoading, emptyCart } = useCart()
  const { isAuthenticated, user } = useAuth()
  const { toast } = useToast()

  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank" | "cod">("card")
  const [loading, setLoading] = useState<boolean>(false)

  // Form state
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    notes: "",
  })

  // Card payment state
  const [cardInfo, setCardInfo] = useState<CardInfo>({
    cardNumber: "",
    expiry: "",
    cvv: "",
    nameOnCard: "",
  })

  // Bank payment state
  const [selectedBank, setSelectedBank] = useState<string>("sbi")

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated && !cartLoading) {
      toast({
        title: "Authentication required",
        description: "Please login to proceed with checkout",
      })
      router.push("/auth/login")
    }

    // Redirect to cart if cart is empty
    if (!cartLoading && cart.items.length === 0) {
      toast({
        title: "Empty cart",
        description: "Your cart is empty. Please add items before checkout.",
      })
      router.push("/cart")
    }

    // Pre-fill user information if available
    if (user) {
      setShippingInfo((prev) => ({
        ...prev,
        email: user.email || "",
        phone: user.phone || "",
      }))
    }
  }, [isAuthenticated, cartLoading, cart.items.length, user, router, toast])

  const handleShippingInfoChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { id, value } = e.target
    setShippingInfo((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleCardInfoChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target
    setCardInfo((prev) => ({
      ...prev,
      [id.replace("card-", "")]: value,
    }))
  }

  const handlePlaceOrder = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to place an order",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      // Validate form
      const requiredFields = ["firstName", "lastName", "email", "phone", "address", "city", "state", "pincode"]
      for (const field of requiredFields) {
        if (!shippingInfo[field as keyof ShippingInfo]) {
          throw new Error(`Please fill in all required fields: ${field} is missing`)
        }
      }

      // Process payment (simulated)
      let paymentResult: { success: boolean; data: PaymentResult } | null = null
      if (paymentMethod === "card") {
        // Validate card info
        if (!cardInfo.cardNumber || !cardInfo.expiry || !cardInfo.cvv || !cardInfo.nameOnCard) {
          throw new Error("Please fill in all card details")
        }

        // Create payment intent
        const paymentIntent = await createPaymentIntent(cart.total)

        // Simulate payment verification
        paymentResult = await verifyPayment({
          paymentId: "sim_" + Date.now(),
          orderId: "ord_" + Date.now(),
          signature: "sig_" + Date.now(),
        })
      }

      // Create order
      const orderItems: OrderItem[] = cart.items.map((item) => ({
        product: item.product._id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        packageSize: item.packageSize || null,
        image: item.product.image,
      }))

      const { notes, ...shippingAddress } = shippingInfo

      const orderData = {
        items: orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: cart.subtotal,
        shippingPrice: cart.shipping,
        taxPrice: 0, // No tax in this example
        totalPrice: cart.total,
        paymentResult: paymentResult?.data || null,
      }

      const response = await createOrder(orderData)

      if (response.success) {
        // Clear cart after successful order
        await emptyCart()

        toast({
          title: "Order placed successfully",
          description: "Thank you for your purchase!",
        })

        // Redirect to order confirmation page
        router.push(`/dashboard/orders/${response.data._id}`)
      }
    } catch (error: any) {
      console.error("Failed to place order:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to place order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (cartLoading) {
    return (
      <div className="container px-4 py-8 mx-auto text-center">
        <h2 className="text-xl">Loading checkout information...</h2>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="Enter your first name"
                    value={shippingInfo.firstName}
                    onChange={handleShippingInfoChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Enter your last name"
                    value={shippingInfo.lastName}
                    onChange={handleShippingInfoChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={shippingInfo.email}
                  onChange={handleShippingInfoChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  value={shippingInfo.phone}
                  onChange={handleShippingInfoChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="Enter your street address"
                  value={shippingInfo.address}
                  onChange={handleShippingInfoChange}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="Enter your city"
                    value={shippingInfo.city}
                    onChange={handleShippingInfoChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="Enter your state"
                    value={shippingInfo.state}
                    onChange={handleShippingInfoChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">PIN Code</Label>
                  <Input
                    id="pincode"
                    placeholder="Enter your PIN code"
                    value={shippingInfo.pincode}
                    onChange={handleShippingInfoChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Order Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Special instructions for delivery"
                  value={shippingInfo.notes}
                  onChange={handleShippingInfoChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={paymentMethod}
                onValueChange={(value) => setPaymentMethod(value as "card" | "bank" | "cod")}
              >
                <div className="flex flex-col space-y-4">
                  <div
                    className={`flex items-center justify-between rounded-lg border p-4 ${paymentMethod === "card" ? "border-green-600 bg-green-50" : ""}`}
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                        <CreditCard className="h-5 w-5" />
                        Credit/Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src="/placeholder.svg?height=30&width=40" alt="Visa" width={40} height={30} />
                      <Image src="/placeholder.svg?height=30&width=40" alt="Mastercard" width={40} height={30} />
                    </div>
                  </div>

                  <div
                    className={`flex items-center justify-between rounded-lg border p-4 ${paymentMethod === "bank" ? "border-green-600 bg-green-50" : ""}`}
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank" className="flex items-center gap-2 cursor-pointer">
                        <Landmark className="h-5 w-5" />
                        Net Banking
                      </Label>
                    </div>
                  </div>

                  <div
                    className={`flex items-center justify-between rounded-lg border p-4 ${paymentMethod === "cod" ? "border-green-600 bg-green-50" : ""}`}
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="cursor-pointer">
                        Cash on Delivery
                      </Label>
                    </div>
                  </div>
                </div>
              </RadioGroup>

              {paymentMethod === "card" && (
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-cardNumber">Card Number</Label>
                    <Input
                      id="card-cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardInfo.cardNumber}
                      onChange={handleCardInfoChange}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-expiry">Expiry Date</Label>
                      <Input
                        id="card-expiry"
                        placeholder="MM/YY"
                        value={cardInfo.expiry}
                        onChange={handleCardInfoChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="card-cvv">CVV</Label>
                      <Input id="card-cvv" placeholder="123" value={cardInfo.cvv} onChange={handleCardInfoChange} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="card-nameOnCard">Name on Card</Label>
                    <Input
                      id="card-nameOnCard"
                      placeholder="Enter name as on card"
                      value={cardInfo.nameOnCard}
                      onChange={handleCardInfoChange}
                    />
                  </div>
                </div>
              )}

              {paymentMethod === "bank" && (
                <div className="mt-4">
                  <Tabs defaultValue="sbi" value={selectedBank} onValueChange={setSelectedBank}>
                    <TabsList className="grid grid-cols-4 w-full">
                      <TabsTrigger value="sbi">SBI</TabsTrigger>
                      <TabsTrigger value="hdfc">HDFC</TabsTrigger>
                      <TabsTrigger value="icici">ICICI</TabsTrigger>
                      <TabsTrigger value="axis">Axis</TabsTrigger>
                    </TabsList>
                    <TabsContent value="sbi" className="p-4 border rounded-lg mt-4">
                      <p className="text-sm">
                        You will be redirected to SBI NetBanking portal to complete your payment.
                      </p>
                    </TabsContent>
                    <TabsContent value="hdfc" className="p-4 border rounded-lg mt-4">
                      <p className="text-sm">
                        You will be redirected to HDFC NetBanking portal to complete your payment.
                      </p>
                    </TabsContent>
                    <TabsContent value="icici" className="p-4 border rounded-lg mt-4">
                      <p className="text-sm">
                        You will be redirected to ICICI NetBanking portal to complete your payment.
                      </p>
                    </TabsContent>
                    <TabsContent value="axis" className="p-4 border rounded-lg mt-4">
                      <p className="text-sm">
                        You will be redirected to Axis NetBanking portal to complete your payment.
                      </p>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {cart.items.map((item) => (
                  <div
                    key={`${item.product._id}-${item.packageSize || "default"}`}
                    className="flex justify-between py-2"
                  >
                    <div className="flex items-center gap-2">
                      <div className="relative h-10 w-10 overflow-hidden rounded-md">
                        <Image
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-sm">
                        {item.product.name} <span className="text-muted-foreground">x{item.quantity}</span>
                      </span>
                    </div>
                    <span>₹{item.total}</span>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{cart.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{cart.shipping === 0 ? "Free" : `₹${cart.shipping}`}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>₹{cart.total}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-green-700 hover:bg-green-800"
                onClick={(e) => handlePlaceOrder(e as any)}
                disabled={loading}
              >
                {loading ? "Processing..." : "Place Order"}
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            <p>By placing your order, you agree to our</p>
            <div className="flex justify-center gap-2">
              <Link href="/terms" className="text-green-700 hover:underline">
                Terms of Service
              </Link>
              <span>&</span>
              <Link href="/privacy" className="text-green-700 hover:underline">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

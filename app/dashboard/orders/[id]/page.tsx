"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Truck, CreditCard, Calendar, CheckCircle2 } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { getOrder } from "@/lib/orders"
import { useToast } from "@/hooks/use-toast"
import type { Order } from "@/types"

interface OrderDetailPageProps {
  params: {
    id: string
  }
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const { isAuthenticated } = useAuth()
  const { toast } = useToast()
  const orderId = params.id

  useEffect(() => {
    if (isAuthenticated && orderId) {
      fetchOrder()
    }
  }, [isAuthenticated, orderId])

  const fetchOrder = async () => {
    setLoading(true)
    try {
      const response = await getOrder(orderId)
      if (response.success) {
        setOrder(response.data)
      }
    } catch (error: any) {
      console.error("Failed to fetch order:", error)
      toast({
        title: "Error",
        description: error.error || "Failed to load order details",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string): JSX.Element => {
    const statusMap: Record<string, { color: string; label: string }> = {
      Processing: { color: "bg-blue-100 text-blue-800", label: "Processing" },
      Shipped: { color: "bg-purple-100 text-purple-800", label: "Shipped" },
      Delivered: { color: "bg-green-100 text-green-800", label: "Delivered" },
      Cancelled: { color: "bg-red-100 text-red-800", label: "Cancelled" },
    }

    const { color, label } = statusMap[status] || { color: "bg-gray-100 text-gray-800", label: status }

    return (
      <Badge className={`${color} border-0`} variant="outline">
        {label}
      </Badge>
    )
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="container px-4 py-8 mx-auto text-center">
        <h2 className="text-xl font-medium mb-4">Please login to view order details</h2>
        <p className="text-muted-foreground mb-6">You need to be logged in to access your order information</p>
        <Link href="/auth/login">
          <Button className="bg-green-700 hover:bg-green-800">Login</Button>
        </Link>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container px-4 py-8 mx-auto text-center">
        <h2 className="text-xl">Loading order details...</h2>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container px-4 py-8 mx-auto text-center">
        <h2 className="text-xl font-medium mb-4">Order not found</h2>
        <p className="text-muted-foreground mb-6">
          The order you're looking for doesn't exist or you don't have permission to view it
        </p>
        <Link href="/dashboard/orders">
          <Button className="bg-green-700 hover:bg-green-800">Back to Orders</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex items-center mb-6">
        <Link href="/dashboard/orders">
          <Button variant="ghost" className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Order Details</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Order Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Order #{order._id.substring(0, 8)}...</span>
                {getStatusBadge(order.status)}
              </CardTitle>
              <CardDescription>Placed on {formatDate(order.createdAt)}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium">Order Date</p>
                      <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium">Payment Method</p>
                      <p className="text-sm text-gray-500">
                        {order.paymentMethod === "card"
                          ? "Credit/Debit Card"
                          : order.paymentMethod === "bank"
                            ? "Net Banking"
                            : "Cash on Delivery"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Truck className="h-5 w-5 text-gray-500 mr-2" />
                    <div>
                      <p className="text-sm font-medium">Delivery Status</p>
                      <p className="text-sm text-gray-500">{order.status}</p>
                    </div>
                  </div>
                </div>

                {order.trackingNumber && (
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm font-medium">Tracking Number</p>
                    <p className="text-sm">{order.trackingNumber}</p>
                  </div>
                )}

                {/* Order Timeline */}
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-3">Order Timeline</h3>
                  <div className="relative border-l border-gray-200 pl-6 ml-3 space-y-6">
                    <div className="relative">
                      <div className="absolute -left-[27px] flex items-center justify-center w-6 h-6 rounded-full bg-green-100">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      </div>
                      <p className="text-sm font-medium">Order Placed</p>
                      <p className="text-xs text-gray-500">{formatDate(order.createdAt)}</p>
                    </div>

                    {order.isPaid && order.paidAt && (
                      <div className="relative">
                        <div className="absolute -left-[27px] flex items-center justify-center w-6 h-6 rounded-full bg-green-100">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                        <p className="text-sm font-medium">Payment Confirmed</p>
                        <p className="text-xs text-gray-500">{formatDate(order.paidAt)}</p>
                      </div>
                    )}

                    {order.status === "Shipped" && (
                      <div className="relative">
                        <div className="absolute -left-[27px] flex items-center justify-center w-6 h-6 rounded-full bg-green-100">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                        <p className="text-sm font-medium">Order Shipped</p>
                        <p className="text-xs text-gray-500">Your order is on the way</p>
                      </div>
                    )}

                    {order.status === "Delivered" && order.deliveredAt && (
                      <div className="relative">
                        <div className="absolute -left-[27px] flex items-center justify-center w-6 h-6 rounded-full bg-green-100">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                        <p className="text-sm font-medium">Order Delivered</p>
                        <p className="text-xs text-gray-500">{formatDate(order.deliveredAt)}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
              <CardDescription>Items included in your order</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 py-3">
                    <div className="relative h-16 w-16 overflow-hidden rounded-md">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <div className="flex flex-wrap gap-x-4 text-sm text-gray-500 mt-1">
                        <p>Quantity: {item.quantity}</p>
                        {item.packageSize && <p>Size: {item.packageSize}</p>}
                        <p>Price: ₹{item.price}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{order.itemsPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{order.shippingPrice === 0 ? "Free" : `₹${order.shippingPrice}`}</span>
              </div>
              {order.taxPrice > 0 && (
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{order.taxPrice}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>₹{order.totalPrice}</span>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium">
                  {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                </p>
                <p>{order.shippingAddress.address}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}
                </p>
                <p>Phone: {order.shippingAddress.phone}</p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-3">
            <Button className="w-full bg-green-700 hover:bg-green-800">Need Help?</Button>
            {order.status !== "Cancelled" && (
              <Button variant="outline" className="w-full">
                Cancel Order
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

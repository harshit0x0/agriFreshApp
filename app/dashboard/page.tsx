"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  Box,
  DollarSign,
  LayoutDashboard,
  Leaf,
  LogOut,
  Menu,
  Package,
  Settings,
  ShoppingCart,
  Truck,
  User,
  Users,
} from "lucide-react"

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar for desktop */}
      <aside
        className={`fixed inset-y-0 z-50 flex w-72 flex-col bg-white dark:bg-gray-950 shadow-lg lg:static ${isSidebarOpen ? "left-0" : "-left-full"} lg:left-0 transition-all duration-300`}
      >
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px]">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Leaf className="h-6 w-6 text-green-600" />
            <span>AgriFresh</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid gap-1 px-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg bg-gray-100 dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-50 transition-all hover:text-gray-900 dark:hover:text-gray-50"
            >
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/orders"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-gray-900 dark:hover:text-gray-50"
            >
              <ShoppingCart className="h-5 w-5" />
              Orders
            </Link>
            <Link
              href="/dashboard/products"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-gray-900 dark:hover:text-gray-50"
            >
              <Package className="h-5 w-5" />
              Products
            </Link>
            <Link
              href="/dashboard/inventory"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-gray-900 dark:hover:text-gray-50"
            >
              <Box className="h-5 w-5" />
              Inventory
            </Link>
            <Link
              href="/dashboard/customers"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-gray-900 dark:hover:text-gray-50"
            >
              <Users className="h-5 w-5" />
              Customers
            </Link>
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-gray-900 dark:hover:text-gray-50"
            >
              <User className="h-5 w-5" />
              Profile
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-gray-900 dark:hover:text-gray-50"
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </div>
        <div className="mt-auto border-t p-4">
          <Button variant="outline" className="w-full justify-start gap-2">
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-white dark:bg-gray-950 px-4 sm:h-[60px] lg:px-6">
          <Button variant="outline" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <div className="w-full flex-1">
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
          </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold tracking-tight">Welcome back, Rajesh!</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹45,231.89</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Orders</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12</div>
                  <p className="text-xs text-muted-foreground">+19% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Products</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+3 new this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+573</div>
                  <p className="text-xs text-muted-foreground">+201 since last month</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="lg:col-span-4">
                    <CardHeader>
                      <CardTitle>Recent Sales</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-8">
                        {recentSales.map((sale) => (
                          <div key={sale.id} className="flex items-center">
                            <div className="space-y-1">
                              <p className="text-sm font-medium leading-none">{sale.customer}</p>
                              <p className="text-sm text-muted-foreground">{sale.email}</p>
                            </div>
                            <div className="ml-auto font-medium">+₹{sale.amount}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="lg:col-span-3">
                    <CardHeader>
                      <CardTitle>Recent Orders</CardTitle>
                      <CardDescription>You have {recentOrders.length} orders this month.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-8">
                        {recentOrders.map((order) => (
                          <div key={order.id} className="flex items-center">
                            <div className="flex items-center gap-4">
                              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                                <Image
                                  src="/placeholder.svg?height=40&width=40"
                                  alt={order.product}
                                  width={40}
                                  height={40}
                                  className="object-cover"
                                />
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">{order.product}</p>
                                <div className="flex items-center gap-2">
                                  <p className="text-sm text-muted-foreground">Qty: {order.quantity}</p>
                                  <span className="flex h-2 w-2 rounded-full bg-green-500" />
                                  <p className="text-xs text-muted-foreground">{order.status}</p>
                                </div>
                              </div>
                            </div>
                            <div className="ml-auto font-medium">₹{order.amount}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="lg:col-span-3">
                    <CardHeader>
                      <CardTitle>Inventory Status</CardTitle>
                      <CardDescription>Products that need restocking.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {lowInventory.map((item) => (
                          <div key={item.id} className="flex items-center">
                            <div className="space-y-1">
                              <p className="text-sm font-medium leading-none">{item.name}</p>
                              <p className="text-sm text-muted-foreground">{item.stock} left in stock</p>
                            </div>
                            <Button size="sm" variant="outline" className="ml-auto">
                              Restock
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="lg:col-span-4">
                    <CardHeader>
                      <CardTitle>Upcoming Deliveries</CardTitle>
                      <CardDescription>Scheduled for the next 7 days.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {upcomingDeliveries.map((delivery) => (
                          <div key={delivery.id} className="flex items-center">
                            <div className="flex items-center gap-4">
                              <Truck className="h-5 w-5 text-muted-foreground" />
                              <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">Order #{delivery.orderNumber}</p>
                                <p className="text-sm text-muted-foreground">
                                  {delivery.customer} - {delivery.date}
                                </p>
                              </div>
                            </div>
                            <div className="ml-auto">
                              <Button size="sm" variant="outline">
                                Track
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="analytics" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Sales Analytics</CardTitle>
                    <CardDescription>View your sales performance over time.</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center">
                    <BarChart3 className="h-16 w-16 text-muted-foreground" />
                    <p className="ml-4 text-muted-foreground">Analytics charts would be displayed here</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reports" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Reports</CardTitle>
                    <CardDescription>Generate and download reports.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Sales Report</p>
                          <p className="text-sm text-muted-foreground">Monthly sales breakdown</p>
                        </div>
                        <Button size="sm">Generate</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Inventory Report</p>
                          <p className="text-sm text-muted-foreground">Current stock levels</p>
                        </div>
                        <Button size="sm">Generate</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Customer Report</p>
                          <p className="text-sm text-muted-foreground">Customer activity and demographics</p>
                        </div>
                        <Button size="sm">Generate</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

const recentSales = [
  {
    id: 1,
    customer: "Anita Sharma",
    email: "anita@example.com",
    amount: 2500,
  },
  {
    id: 2,
    customer: "Suresh Patel",
    email: "suresh@example.com",
    amount: 1800,
  },
  {
    id: 3,
    customer: "Vikram Singh",
    email: "vikram@example.com",
    amount: 3200,
  },
  {
    id: 4,
    customer: "Priya Desai",
    email: "priya@example.com",
    amount: 950,
  },
]

const recentOrders = [
  {
    id: 1,
    product: "Premium Wheat Seeds",
    quantity: 3,
    status: "Shipped",
    amount: 3600,
  },
  {
    id: 2,
    product: "Organic Fertilizer",
    quantity: 2,
    status: "Processing",
    amount: 1700,
  },
  {
    id: 3,
    product: "Drip Irrigation Kit",
    quantity: 1,
    status: "Delivered",
    amount: 3200,
  },
]

const lowInventory = [
  {
    id: 1,
    name: "Rice Seeds (5kg)",
    stock: 5,
  },
  {
    id: 2,
    name: "NPK Fertilizer",
    stock: 8,
  },
  {
    id: 3,
    name: "Pesticide Sprayer",
    stock: 3,
  },
]

const upcomingDeliveries = [
  {
    id: 1,
    orderNumber: "ORD-7829",
    customer: "Rajesh Kumar",
    date: "Tomorrow",
  },
  {
    id: 2,
    orderNumber: "ORD-7830",
    customer: "Anita Sharma",
    date: "May 2, 2024",
  },
  {
    id: 3,
    orderNumber: "ORD-7835",
    customer: "Vikram Singh",
    date: "May 3, 2024",
  },
]

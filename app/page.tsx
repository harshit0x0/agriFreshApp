import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Tractor, ShoppingCart, Search, BarChart3, CreditCard } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f0f7ea] dark:bg-green-950">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-green-800 dark:text-green-100">
                  AgriFresh: Connecting Farmers & Buyers
                </h1>
                <p className="max-w-[600px] text-gray-700 dark:text-gray-300 md:text-xl">
                  Buy seeds, fertilizers, and equipment. Sell your produce directly. Eliminate middlemen and maximize
                  profits.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/products">
                  <Button size="lg" className="bg-green-700 hover:bg-green-800">
                    Shop Now
                  </Button>
                </Link>
                <Link href="/sell">
                  <Button size="lg" variant="outline" className="border-green-700 text-green-700 hover:bg-green-100">
                    Sell Your Produce
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=550&width=550"
                width={550}
                height={550}
                alt="Farm fresh produce"
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-800 dark:text-green-100">
                Why Choose AgriFresh?
              </h2>
              <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform is designed to revolutionize agricultural trade by connecting farmers directly with buyers.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <Card className="border-green-200">
              <CardHeader className="pb-2">
                <Leaf className="w-10 h-10 text-green-600 mb-2" />
                <CardTitle>Quality Agricultural Inputs</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Access verified seeds, fertilizers, pesticides, and tools from trusted suppliers at competitive
                  prices.
                </p>
              </CardContent>
            </Card>
            <Card className="border-green-200">
              <CardHeader className="pb-2">
                <ShoppingCart className="w-10 h-10 text-green-600 mb-2" />
                <CardTitle>Direct Market Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Sell your crops, fruits, vegetables, and dairy products directly to buyers without intermediaries.
                </p>
              </CardContent>
            </Card>
            <Card className="border-green-200">
              <CardHeader className="pb-2">
                <Tractor className="w-10 h-10 text-green-600 mb-2" />
                <CardTitle>Equipment & Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Rent machinery, book soil testing services, and access irrigation equipment with ease.</p>
              </CardContent>
            </Card>
            <Card className="border-green-200">
              <CardHeader className="pb-2">
                <Search className="w-10 h-10 text-green-600 mb-2" />
                <CardTitle>Smart Search & Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Find exactly what you need with our intelligent search system and comprehensive filtering options.
                </p>
              </CardContent>
            </Card>
            <Card className="border-green-200">
              <CardHeader className="pb-2">
                <BarChart3 className="w-10 h-10 text-green-600 mb-2" />
                <CardTitle>Real-Time Inventory</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Track your stock levels, monitor sales, and manage your agricultural business efficiently.</p>
              </CardContent>
            </Card>
            <Card className="border-green-200">
              <CardHeader className="pb-2">
                <CreditCard className="w-10 h-10 text-green-600 mb-2" />
                <CardTitle>Secure Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Enjoy safe and reliable transactions with our integrated payment gateway and escrow services.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-[#f8faf5] dark:bg-green-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-800 dark:text-green-100">
                Explore Categories
              </h2>
              <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Browse through our wide range of agricultural products and services.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
            {categories.map((category) => (
              <Link key={category.name} href={`/products?category=${category.slug}`} className="group">
                <Card className="overflow-hidden border-green-200 transition-all hover:border-green-500 hover:shadow-md">
                  <div className="aspect-square relative">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <CardFooter className="p-4 bg-white dark:bg-gray-950">
                    <CardTitle className="text-center w-full text-base">{category.name}</CardTitle>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-800 dark:text-green-100">
                Success Stories
              </h2>
              <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from farmers and buyers who have transformed their agricultural business with AgriFresh.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-green-200">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-green-700 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Transform Your Agricultural Business?
              </h2>
              <p className="max-w-[900px] text-green-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of farmers and buyers who are already benefiting from our platform.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/register">
                <Button size="lg" className="bg-white text-green-700 hover:bg-green-100">
                  Register Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-green-800">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const categories = [
  {
    name: "Seeds & Plants",
    slug: "seeds-plants",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Fertilizers",
    slug: "fertilizers",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Pesticides",
    slug: "pesticides",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Farm Equipment",
    slug: "farm-equipment",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Irrigation",
    slug: "irrigation",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Fruits & Vegetables",
    slug: "fruits-vegetables",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Dairy Products",
    slug: "dairy",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Grains & Pulses",
    slug: "grains-pulses",
    image: "/placeholder.svg?height=200&width=200",
  },
]

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Wheat Farmer, Punjab",
    avatar: "/placeholder.svg?height=50&width=50",
    quote:
      "AgriFresh helped me sell my wheat harvest directly to processors, increasing my profit by 30% compared to traditional markets.",
  },
  {
    name: "Anita Sharma",
    role: "Vegetable Grower, Maharashtra",
    avatar: "/placeholder.svg?height=50&width=50",
    quote:
      "I can now source quality seeds and fertilizers at better prices, and sell my vegetables to urban customers who pay premium rates.",
  },
  {
    name: "Vijay Reddy",
    role: "Agricultural Supplier, Telangana",
    avatar: "/placeholder.svg?height=50&width=50",
    quote:
      "This platform has expanded my customer base beyond my local area. The inventory management system makes tracking stock effortless.",
  },
]

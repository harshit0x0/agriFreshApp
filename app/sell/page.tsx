"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, ShieldCheck } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

export default function SellPage(): JSX.Element {
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">Sell on AgriFresh</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Connect directly with buyers and grow your agricultural business with our trusted platform
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href={isAuthenticated ? "/sell/dashboard" : "/sell/register"}>
            <Button size="lg" className="bg-green-700 hover:bg-green-800">
              Start Selling
            </Button>
          </Link>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Why Sell on AgriFresh?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Expand Your Reach</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Access a nationwide customer base of buyers looking for quality agricultural products and services.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Direct Customer Connection</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Build relationships directly with your customers without intermediaries, increasing your profits.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <ShieldCheck className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Secure Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Our platform ensures timely payments and secure transactions, so you can focus on your business.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-green-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-700">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Register</h3>
            <p className="text-gray-600">
              Create your seller account with basic information about your farm or business
            </p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-700">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">List Products</h3>
            <p className="text-gray-600">Add your products with descriptions, prices, and availability</p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-700">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Receive Orders</h3>
            <p className="text-gray-600">Get notified when customers place orders for your products</p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-700">4</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Ship & Get Paid</h3>
            <p className="text-gray-600">Fulfill orders and receive secure payments directly to your account</p>
          </div>
        </div>
      </div>

      {/* Seller Categories */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Who Can Sell on AgriFresh?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Farmers</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Sell your fresh produce, grains, dairy products, and more directly to consumers and businesses.</p>
            </CardContent>
            <CardFooter>
              <Link href="/sell/register?type=farmer">
                <Button variant="outline">Register as Farmer</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Agri-Input Suppliers</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Offer seeds, fertilizers, pesticides, and other agricultural inputs to farmers across the country.</p>
            </CardContent>
            <CardFooter>
              <Link href="/sell/register?type=supplier">
                <Button variant="outline">Register as Supplier</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Equipment Manufacturers</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Sell farm equipment, machinery, tools, and irrigation systems to modernize agricultural practices.</p>
            </CardContent>
            <CardFooter>
              <Link href="/sell/register?type=manufacturer">
                <Button variant="outline">Register as Manufacturer</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold mb-2">What are the fees for selling on AgriFresh?</h3>
            <p className="text-gray-600">
              We charge a small commission of 5% on each successful sale. There are no listing fees or monthly charges.
            </p>
          </div>
          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold mb-2">How do I get paid for my sales?</h3>
            <p className="text-gray-600">
              Payments are processed every 7 days and transferred directly to your registered bank account.
            </p>
          </div>
          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold mb-2">How do I handle shipping and delivery?</h3>
            <p className="text-gray-600">
              You can choose to handle your own shipping or use our logistics partners for discounted rates. For
              perishable items, we offer cold chain logistics solutions.
            </p>
          </div>
          <div className="border-b pb-4">
            <h3 className="text-xl font-semibold mb-2">What documents do I need to register as a seller?</h3>
            <p className="text-gray-600">
              You'll need basic KYC documents (ID proof, address proof), bank account details, and any relevant business
              registration or farming certificates.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-50 rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Agricultural Business?</h2>
        <p className="text-xl mb-6 max-w-2xl mx-auto">
          Join thousands of successful sellers on AgriFresh and reach customers nationwide.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/sell/register">
            <Button size="lg" className="bg-green-700 hover:bg-green-800">
              Start Selling Today
            </Button>
          </Link>
          {/* <Link href="/contact">
            <Button size="lg" variant="outline">
              Contact Sales Team
            </Button>
          </Link> */}
        </div>
      </div>
    </div>
  )
}

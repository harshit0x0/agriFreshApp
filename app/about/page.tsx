import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Sprout, Globe } from "lucide-react"

export default function AboutPage(): JSX.Element {
  return (
    <div className="container mx-auto py-12 px-4">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">About AgriFresh</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Connecting farmers and consumers for a sustainable agricultural ecosystem
        </p>
      </div>

      {/* Our Story Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-gray-600 mb-4">
            AgriFresh was founded in 2025 with a simple mission: to create a direct connection between farmers and
            consumers, eliminating middlemen and ensuring fair prices for both parties.
          </p>
          <p className="text-gray-600 mb-4">
            This project has been made by Harshit Pandey, Monal Ghansela and Siddhart Verma from Information technology
            Department of GBPUAT Pantnagar.
          </p>
          <p className="text-gray-600">
            AgriFresh wants to become: A platform which provides a direct marketplace where: - Farmers can list their
            products, set their own prices, and reach a wider customer base - Consumers can purchase fresh produce
            directly from the source - The platform handles logistics, payments, and customer service - Both parties
            benefit from a transparent, efficient system
          </p>
        </div>
        <div className="relative h-80 rounded-lg overflow-hidden">
          <Image src="/hero.jpg" alt="Farmers in a field" fill className="object-cover" />
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="bg-green-50 rounded-lg p-8 mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We're on a mission to transform agriculture by creating a sustainable ecosystem that benefits farmers,
            consumers, and the environment.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Sprout className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Empower Farmers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We help farmers get better prices for their produce, access modern farming techniques, and connect
                directly with consumers.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Serve Consumers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We provide consumers with access to fresh, high-quality agricultural products at fair prices, with
                complete transparency about their source.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Globe className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Promote Sustainability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We encourage sustainable farming practices that protect the environment and ensure long-term food
                security.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Our Impact Section */}
      {/* <div className="mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Since our inception, we've made a significant impact on the agricultural ecosystem in India.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-green-700 mb-2">5,000+</p>
            <p className="text-gray-600">Farmers Empowered</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-green-700 mb-2">50,000+</p>
            <p className="text-gray-600">Consumers Served</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-green-700 mb-2">₹10Cr+</p>
            <p className="text-gray-600">Additional Farmer Income</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-green-700 mb-2">20+</p>
            <p className="text-gray-600">States Covered</p>
          </div>
        </div>
      </div> */}

      {/* Our Team Section */}
      <div className="mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Our Team</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Meet the passionate individuals behind AgriFresh who are working to transform agriculture.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <Image src="/monal.jpg" alt="Monal Ghansela" fill className="object-cover" />
                </div>
                <h3 className="text-xl font-bold mb-1">Monal Ghansela</h3>
                {/* <p className="text-gray-600 text-sm">
                  A third-generation farmer with a vision to transform agriculture through technology.
                </p> */}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <Image src="/harshit.jpg" alt="Harshit Pandey" fill className="object-cover" />
                </div>
                <h3 className="text-xl font-bold mb-1">Harshit Pandey</h3>
                {/* <p className="text-gray-600 text-sm">
                  An agricultural economist with expertise in supply chain management and rural development.
                </p> */}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <Image src="/siddharth.jpg" alt="Vikram Singh" fill className="object-cover" />
                </div>
                <h3 className="text-xl font-bold mb-1">Siddhart Verma</h3>
                {/* <p className="text-gray-600 text-sm">
                  A tech enthusiast with a background in agricultural engineering and software development.
                </p> */}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Join Us Section */}
      <div className="bg-green-50 rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Join the AgriFresh Revolution</h2>
        <p className="text-xl mb-6 max-w-2xl mx-auto">
          Whether you're a farmer looking to sell your produce or a consumer seeking fresh, quality products, AgriFresh
          is here for you.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/sell">
            <Button size="lg" className="bg-green-700 hover:bg-green-800">
              Sell on AgriFresh
            </Button>
          </Link>
          <Link href="/products">
            <Button size="lg" variant="outline">
              Shop Now
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

export default function SellerRegistrationSuccess(): JSX.Element {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-md mx-auto text-center">
        <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4">Registration Successful!</h1>
        <p className="text-gray-600 mb-8">
          Your seller account has been created successfully. We've sent a verification email to your registered email
          address. Please verify your email to activate your account.
        </p>
        <div className="space-y-4">
          <Link href="/sell/dashboard">
            <Button className="w-full bg-green-700 hover:bg-green-800">Go to Seller Dashboard</Button>
          </Link>
          <Link href="/sell/add-product">
            <Button variant="outline" className="w-full">
              Add Your First Product
            </Button>
          </Link>
        </div>
        <p className="mt-8 text-sm text-gray-500">
          Didn't receive the verification email?{" "}
          <Link href="#" className="text-blue-600 hover:underline">
            Resend Email
          </Link>
        </p>
      </div>
    </div>
  )
}

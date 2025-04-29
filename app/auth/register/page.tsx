"use client"

import { useState, type FormEvent, type ChangeEvent } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import type { RegisterData } from "@/types"

interface BuyerFormState {
  name: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

interface SellerFormState {
  businessName: string
  email: string
  phone: string
  businessType: "farmer" | "supplier" | "processor"
  password: string
  confirmPassword: string
}

export default function RegisterPage(): JSX.Element {
  const [accountType, setAccountType] = useState<"buyer" | "seller">("buyer")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Buyer form state
  const [buyerForm, setBuyerForm] = useState<BuyerFormState>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  // Seller form state
  const [sellerForm, setSellerForm] = useState<SellerFormState>({
    businessName: "",
    email: "",
    phone: "",
    businessType: "farmer",
    password: "",
    confirmPassword: "",
  })

  const { register } = useAuth()

  const handleBuyerChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target
    setBuyerForm({
      ...buyerForm,
      [id]: value,
    })
  }

  const handleSellerChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target
    setSellerForm({
      ...sellerForm,
      [id.replace("seller-", "")]: value,
    })
  }

  const handleBusinessTypeChange = (value: "farmer" | "supplier" | "processor"): void => {
    setSellerForm({
      ...sellerForm,
      businessType: value,
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData: RegisterData =
        accountType === "buyer"
          ? {
              ...buyerForm,
              role: "buyer",
            }
          : {
              name: sellerForm.businessName, // Using business name as name
              email: sellerForm.email,
              phone: sellerForm.phone,
              password: sellerForm.password,
              role: "seller",
              businessName: sellerForm.businessName,
              businessType: sellerForm.businessType,
            }

      // Check if passwords match
      if (
        (accountType === "buyer" && buyerForm.password !== buyerForm.confirmPassword) ||
        (accountType === "seller" && sellerForm.password !== sellerForm.confirmPassword)
      ) {
        throw new Error("Passwords do not match")
      }

      // Remove confirmPassword before sending to API
      delete (formData as any).confirmPassword

      await register(formData)
      // Redirect is handled in the AuthContext
    } catch (error) {
      // Error handling is done in the AuthContext
      console.error("Registration error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <Leaf className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
          <CardDescription className="text-center">
            Enter your details below to create your AgriFresh account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <Tabs defaultValue="buyer" onValueChange={(value) => setAccountType(value as "buyer" | "seller")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="buyer">Buyer</TabsTrigger>
                <TabsTrigger value="seller">Seller</TabsTrigger>
              </TabsList>
              <TabsContent value="buyer" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={buyerForm.name}
                    onChange={handleBuyerChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={buyerForm.email}
                    onChange={handleBuyerChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Enter your phone number"
                    value={buyerForm.phone}
                    onChange={handleBuyerChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={buyerForm.password}
                    onChange={handleBuyerChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={buyerForm.confirmPassword}
                    onChange={handleBuyerChange}
                    required
                  />
                </div>
              </TabsContent>
              <TabsContent value="seller" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="business-name">Business Name</Label>
                  <Input
                    id="business-name"
                    placeholder="Enter your business name"
                    value={sellerForm.businessName}
                    onChange={handleSellerChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seller-email">Email</Label>
                  <Input
                    id="seller-email"
                    type="email"
                    placeholder="Enter your email"
                    value={sellerForm.email}
                    onChange={handleSellerChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seller-phone">Phone Number</Label>
                  <Input
                    id="seller-phone"
                    placeholder="Enter your phone number"
                    value={sellerForm.phone}
                    onChange={handleSellerChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-type">Business Type</Label>
                  <RadioGroup
                    defaultValue="farmer"
                    value={sellerForm.businessType}
                    onValueChange={(value) => handleBusinessTypeChange(value as "farmer" | "supplier" | "processor")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="farmer" id="farmer" />
                      <Label htmlFor="farmer">Farmer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="supplier" id="supplier" />
                      <Label htmlFor="supplier">Supplier</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="processor" id="processor" />
                      <Label htmlFor="processor">Processor</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seller-password">Password</Label>
                  <Input
                    id="seller-password"
                    type="password"
                    placeholder="Create a password"
                    value={sellerForm.password}
                    onChange={handleSellerChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seller-confirmPassword">Confirm Password</Label>
                  <Input
                    id="seller-confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={sellerForm.confirmPassword}
                    onChange={handleSellerChange}
                    required
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full bg-green-700 hover:bg-green-800" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
            <p className="mt-4 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-green-700 hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

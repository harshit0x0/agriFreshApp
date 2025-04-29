"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Trash2, Plus, Upload } from "lucide-react"
import { getCategories } from "@/lib/categories"
import { useEffect } from "react"
import type { Category } from "@/types"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  stock: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Stock must be a non-negative number.",
  }),
  brand: z.string().min(2, {
    message: "Brand must be at least 2 characters.",
  }),
})

export default function AddProduct(): JSX.Element {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [specifications, setSpecifications] = useState<{ name: string; value: string }[]>([])
  const [packageSizes, setPackageSizes] = useState<{ size: string; price: string; stock: string }[]>([])
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchCategories = async (): Promise<void> => {
      try {
        const response = await getCategories()
        if (response.success) {
          setCategories(response.data)
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error)
      }
    }

    fetchCategories()
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      brand: "",
    },
  })

  const addSpecification = (): void => {
    setSpecifications([...specifications, { name: "", value: "" }])
  }

  const removeSpecification = (index: number): void => {
    const newSpecs = [...specifications]
    newSpecs.splice(index, 1)
    setSpecifications(newSpecs)
  }

  const updateSpecification = (index: number, field: "name" | "value", value: string): void => {
    const newSpecs = [...specifications]
    newSpecs[index][field] = value
    setSpecifications(newSpecs)
  }

  const addPackageSize = (): void => {
    setPackageSizes([...packageSizes, { size: "", price: "", stock: "" }])
  }

  const removePackageSize = (index: number): void => {
    const newSizes = [...packageSizes]
    newSizes.splice(index, 1)
    setPackageSizes(newSizes)
  }

  const updatePackageSize = (index: number, field: "size" | "price" | "stock", value: string): void => {
    const newSizes = [...packageSizes]
    newSizes[index][field] = value
    setPackageSizes(newSizes)
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // Here you would normally call your API to add the product
      const productData = {
        ...values,
        price: Number.parseFloat(values.price),
        stock: Number.parseInt(values.stock),
        specifications,
        packageSizes: packageSizes.map((pkg) => ({
          ...pkg,
          price: Number.parseFloat(pkg.price),
          stock: Number.parseInt(pkg.stock),
        })),
      }

      console.log(productData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Product Added",
        description: "Your product has been added successfully.",
      })

      router.push("/sell/dashboard")
    } catch (error) {
      toast({
        title: "Failed to Add Product",
        description: "There was an error adding your product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Add New Product</h1>
          <p className="text-gray-600 mt-2">Fill out the form below to list your product on AgriFresh</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
            <CardDescription>Provide detailed information about your product</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Organic Basmati Rice" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your product in detail"
                          className="min-h-32 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Include details about quality, usage, benefits, etc.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Base Price (₹)</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category._id} value={category._id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock Quantity</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" step="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand</FormLabel>
                        <FormControl>
                          <Input placeholder="Your brand name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Product Images</h3>
                    <Button type="button" variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" /> Upload Images
                    </Button>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="border border-dashed rounded-md aspect-square flex items-center justify-center bg-gray-50">
                      <Plus className="h-6 w-6 text-gray-400" />
                    </div>
                  </div>
                  <FormDescription>Upload up to 5 images. First image will be the main product image.</FormDescription>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Specifications</h3>
                    <Button type="button" variant="outline" size="sm" onClick={addSpecification}>
                      <Plus className="h-4 w-4 mr-2" /> Add Specification
                    </Button>
                  </div>
                  {specifications.map((spec, index) => (
                    <div key={index} className="flex gap-4 items-start">
                      <div className="grid grid-cols-2 gap-4 flex-1">
                        <div>
                          <Input
                            placeholder="Name (e.g. Weight)"
                            value={spec.name}
                            onChange={(e) => updateSpecification(index, "name", e.target.value)}
                          />
                        </div>
                        <div>
                          <Input
                            placeholder="Value (e.g. 5kg)"
                            value={spec.value}
                            onChange={(e) => updateSpecification(index, "value", e.target.value)}
                          />
                        </div>
                      </div>
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeSpecification(index)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Package Sizes (Optional)</h3>
                    <Button type="button" variant="outline" size="sm" onClick={addPackageSize}>
                      <Plus className="h-4 w-4 mr-2" /> Add Package Size
                    </Button>
                  </div>
                  {packageSizes.map((pkg, index) => (
                    <div key={index} className="flex gap-4 items-start">
                      <div className="grid grid-cols-3 gap-4 flex-1">
                        <div>
                          <Input
                            placeholder="Size (e.g. 5kg)"
                            value={pkg.size}
                            onChange={(e) => updatePackageSize(index, "size", e.target.value)}
                          />
                        </div>
                        <div>
                          <Input
                            placeholder="Price (₹)"
                            type="number"
                            min="0"
                            step="0.01"
                            value={pkg.price}
                            onChange={(e) => updatePackageSize(index, "price", e.target.value)}
                          />
                        </div>
                        <div>
                          <Input
                            placeholder="Stock"
                            type="number"
                            min="0"
                            step="1"
                            value={pkg.stock}
                            onChange={(e) => updatePackageSize(index, "stock", e.target.value)}
                          />
                        </div>
                      </div>
                      <Button type="button" variant="ghost" size="icon" onClick={() => removePackageSize(index)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Button type="submit" className="w-full bg-green-700 hover:bg-green-800" disabled={isSubmitting}>
                  {isSubmitting ? "Adding Product..." : "Add Product"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

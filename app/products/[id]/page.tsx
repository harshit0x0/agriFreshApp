"use client"

import { useState, useEffect, type FormEvent, type ChangeEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Minus, Plus, ShoppingCart, Star, Truck } from "lucide-react"
import { getProduct, getRelatedProducts, createProductReview } from "@/lib/products"
import { useCart } from "@/context/CartContext"
import { useAuth } from "@/context/AuthContext"
import { useToast } from "@/hooks/use-toast"
import type { Product, ReviewData } from "@/types"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps): JSX.Element {
  const productId = params.id
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [quantity, setQuantity] = useState<number>(1)
  const [selectedImage, setSelectedImage] = useState<number>(0)
  const [packageSize, setPackageSize] = useState<string>("")
  const [reviewRating, setReviewRating] = useState<number>(5)
  const [reviewComment, setReviewComment] = useState<string>("")
  const [reviewSubmitting, setReviewSubmitting] = useState<boolean>(false)

  const { addItem } = useCart()
  const { isAuthenticated, user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    fetchProduct()
  }, [productId])

  const fetchProduct = async (): Promise<void> => {
    setLoading(true)
    try {
      const response = await getProduct(productId)
      if (response.success) {
        setProduct(response.data)

        // Set default package size if available
        if (response.data.packageSizes && response.data.packageSizes.length > 0) {
          setPackageSize(response.data.packageSizes[0].size)
        }

        // Fetch related products
        fetchRelatedProducts(productId)
      }
    } catch (error) {
      console.error("Failed to fetch product:", error)
      toast({
        title: "Error",
        description: "Failed to load product details",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchRelatedProducts = async (id: string): Promise<void> => {
    try {
      const response = await getRelatedProducts(id)
      if (response.success) {
        setRelatedProducts(response.data)
      }
    } catch (error) {
      console.error("Failed to fetch related products:", error)
    }
  }

  const handleAddToCart = async (): Promise<void> => {
    try {
      await addItem(productId, quantity, packageSize)
    } catch (error) {
      console.error("Failed to add item to cart:", error)
    }
  }

  const incrementQuantity = (): void => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = (): void => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleSubmitReview = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to submit a review",
        variant: "destructive",
      })
      return
    }

    setReviewSubmitting(true)
    try {
      const reviewData: ReviewData = {
        rating: reviewRating,
        comment: reviewComment,
      }

      const response = await createProductReview(productId, reviewData)
      if (response.success) {
        toast({
          title: "Review submitted",
          description: "Thank you for your feedback!",
        })
        setReviewComment("")
        // Refresh product to show the new review
        fetchProduct()
      }
    } catch (error: any) {
      console.error("Failed to submit review:", error)
      toast({
        title: "Error",
        description: error.error || "Failed to submit review",
        variant: "destructive",
      })
    } finally {
      setReviewSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="container px-4 py-8 mx-auto text-center">
        <h2 className="text-xl">Loading product details...</h2>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container px-4 py-8 mx-auto text-center">
        <h2 className="text-xl">Product not found</h2>
        <Link href="/products">
          <Button className="mt-4 bg-green-700 hover:bg-green-800">Back to Products</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative rounded-lg overflow-hidden border">
            <Image
              src={product.images && product.images.length > 0 ? product.images[selectedImage].url : "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex space-x-2 overflow-auto pb-2">
            {product.images &&
              product.images.map((image, index) => (
                <button
                  key={index}
                  className={`relative w-20 h-20 rounded-md overflow-hidden border-2 ${
                    selectedImage === index ? "border-green-600" : "border-transparent"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.ratings)
                        ? "fill-yellow-400 text-yellow-400"
                        : i < product.ratings
                          ? "fill-yellow-400 text-yellow-400" // For half stars, we'd need a different approach
                          : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {product.ratings || 0} ({product.numReviews || 0} reviews)
                </span>
              </div>
            </div>
            <p className="text-2xl font-bold mt-4">₹{product.price}</p>
            <div className="flex items-center mt-2">
              <Truck className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-sm text-green-600">Free shipping on orders over ₹2000</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            {product.packageSizes && product.packageSizes.length > 0 && (
              <div>
                <label htmlFor="package-size" className="block text-sm font-medium mb-2">
                  Package Size
                </label>
                <Select value={packageSize} onValueChange={setPackageSize}>
                  <SelectTrigger id="package-size" className="w-full">
                    <SelectValue placeholder="Select package size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.packageSizes.map((pkg) => (
                      <SelectItem key={pkg.size} value={pkg.size}>
                        {pkg.size} - ₹{pkg.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <label htmlFor="quantity" className="block text-sm font-medium mb-2">
                Quantity
              </label>
              <div className="flex items-center">
                <Button variant="outline" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-4 w-8 text-center">{quantity}</span>
                <Button variant="outline" size="icon" onClick={incrementQuantity} disabled={quantity >= product.stock}>
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="ml-4 text-sm text-gray-500">{product.stock} available</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                className="flex-1 bg-green-700 hover:bg-green-800"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>
              <Button variant="outline" className="flex-1">
                <Heart className="h-5 w-5 mr-2" />
                Add to Wishlist
              </Button>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-2">Product Description</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <Tabs defaultValue="specifications" className="mb-12">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
        </TabsList>
        <TabsContent value="specifications" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.specifications &&
              product.specifications.map((spec, index) => (
                <div key={index} className="flex justify-between py-2 border-b">
                  <span className="font-medium">{spec.name}</span>
                  <span className="text-gray-600">{spec.value}</span>
                </div>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="pt-4">
          <div className="space-y-6">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <Card key={review._id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{review.name}</h4>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                    <p className="mt-4">{review.comment}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center text-gray-500">No reviews yet. Be the first to review this product!</p>
            )}

            {isAuthenticated ? (
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Write a Review</h3>
                <form onSubmit={handleSubmitReview}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="rating" className="block text-sm font-medium mb-2">
                        Rating
                      </label>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            type="button"
                            onClick={() => setReviewRating(rating)}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`h-6 w-6 ${
                                rating <= reviewRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="comment" className="block text-sm font-medium mb-2">
                        Comment
                      </label>
                      <textarea
                        id="comment"
                        rows={4}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Share your thoughts about this product..."
                        value={reviewComment}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setReviewComment(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="bg-green-700 hover:bg-green-800" disabled={reviewSubmitting}>
                      {reviewSubmitting ? "Submitting..." : "Submit Review"}
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center mt-6">
                <p className="mb-2">Please log in to write a review</p>
                <Link href="/auth/login">
                  <Button className="bg-green-700 hover:bg-green-800">Login</Button>
                </Link>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="shipping" className="pt-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Shipping Information</h3>
              <p className="text-gray-600">
                We offer free shipping on all orders above ₹2000. Standard shipping takes 3-5 business days. Express
                shipping options are available at checkout.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Return Policy</h3>
              <p className="text-gray-600">
                If you're not satisfied with your purchase, you can return it within 7 days of delivery. Please note
                that the product must be unused and in its original packaging. For seeds and perishable items, we can
                only accept returns if the package is unopened.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct._id} className="overflow-hidden">
                <Link href={`/products/${relatedProduct._id}`}>
                  <div className="aspect-square relative">
                    <Image
                      src={
                        relatedProduct.images && relatedProduct.images.length > 0
                          ? relatedProduct.images[0].url
                          : "/placeholder.svg"
                      }
                      alt={relatedProduct.name}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium">{relatedProduct.name}</h3>
                    <div className="flex items-center mt-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm ml-1">{relatedProduct.ratings || 0}</span>
                      </div>
                    </div>
                    <p className="font-semibold mt-2">₹{relatedProduct.price}</p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

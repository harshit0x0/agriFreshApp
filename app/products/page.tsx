"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ChevronLeft, ChevronRight, Filter, ShoppingCart, Star } from "lucide-react"
import { getProducts } from "@/lib/products"
import { getCategories } from "@/lib/categories"
import { useCart } from "@/context/CartContext"
import { useToast } from "@/hooks/use-toast"
import type { Product, Category, ProductFilters } from "@/types"

export default function ProductsPage(): JSX.Element {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")
  const searchParam = searchParams.get("search")

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [brands, setBrands] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [pagination, setPagination] = useState<{ page: number; limit: number; totalPages: number }>({
    page: 1,
    limit: 10,
    totalPages: 1,
  })

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>(categoryParam ? [categoryParam] : [])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [sortOption, setSortOption] = useState<string>("featured")
  const [filtersVisible, setFiltersVisible] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const { addItem } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    fetchCategories()
    fetchProducts()
  }, [categoryParam, searchParam])

  const fetchCategories = async (): Promise<void> => {
    try {
      const response = await getCategories()
      if (response.success) {
        setCategories(response.data)
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error)
      toast({
        title: "Error",
        description: "Failed to load categories",
        variant: "destructive",
      })
    }
  }

  const fetchProducts = async (page = 1): Promise<void> => {
    setLoading(true)
    try {
      const filters: ProductFilters = {
        page,
        limit: 12,
        sort: sortOption as any,
        category: selectedCategories.length > 0 ? selectedCategories[0] : undefined,
        brand: selectedBrands.length > 0 ? selectedBrands.join(",") : undefined,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        search: searchParam || undefined,
      }

      const response = await getProducts(filters)
      if (response.success) {
        setProducts(response.data)
        setPagination(response.pagination)

        // Extract unique brands from products
        const uniqueBrands = [...new Set(response.data.map((product) => product.brand))]
        setBrands(uniqueBrands)
      }
    } catch (error) {
      console.error("Failed to fetch products:", error)
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = async (productId: string): Promise<void> => {
    try {
      await addItem(productId, 1)
    } catch (error) {
      console.error("Failed to add item to cart:", error)
    }
  }

  const applyFilters = (): void => {
    setCurrentPage(1)
    fetchProducts(1)
  }

  const clearFilters = (): void => {
    setPriceRange([0, 10000])
    setSelectedCategories(categoryParam ? [categoryParam] : [])
    setSelectedBrands([])
    setSortOption("featured")
    setCurrentPage(1)
    fetchProducts(1)
  }

  const handlePageChange = (page: number): void => {
    setCurrentPage(page)
    fetchProducts(page)
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const toggleCategory = (category: string): void => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const toggleBrand = (brand: string): void => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile Filter Button */}
        <Button
          variant="outline"
          className="md:hidden mb-4 flex items-center gap-2"
          onClick={() => setFiltersVisible(!filtersVisible)}
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>

        {/* Filters Sidebar */}
        <div className={`${filtersVisible ? "block" : "hidden"} md:block w-full md:w-64 space-y-6`}>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Filters</h2>

            <div>
              <h3 className="font-medium mb-2">Price Range</h3>
              <div className="px-2">
                <Slider
                  defaultValue={[0, 10000]}
                  max={10000}
                  step={100}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-6"
                />
                <div className="flex items-center justify-between">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>
            </div>

            <Accordion type="single" collapsible defaultValue="categories">
              <AccordionItem value="categories">
                <AccordionTrigger>Categories</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {categories.map((category) => {
                      const formattedCategory = category.name

                      return (
                        <div key={category._id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`category-${category.slug}`}
                            checked={selectedCategories.includes(category.slug)}
                            onCheckedChange={() => toggleCategory(category.slug)}
                          />
                          <Label htmlFor={`category-${category.slug}`}>{formattedCategory}</Label>
                        </div>
                      )
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="brands">
                <AccordionTrigger>Brands</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={`brand-${brand}`}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => toggleBrand(brand)}
                        />
                        <Label htmlFor={`brand-${brand}`}>{brand}</Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex flex-col gap-2">
              <Button variant="default" className="w-full bg-green-700 hover:bg-green-800" onClick={applyFilters}>
                Apply Filters
              </Button>
              <Button variant="outline" className="w-full" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h1 className="text-2xl font-bold">Products</h1>
            <div className="flex items-center mt-4 sm:mt-0">
              <Select
                value={sortOption}
                onValueChange={(value) => {
                  setSortOption(value)
                  setCurrentPage(1)
                  fetchProducts(1)
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">Loading products...</h3>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No products found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your filters</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Card key={product._id} className="overflow-hidden">
                    <Link href={`/products/${product._id}`}>
                      <div className="aspect-square relative">
                        <Image
                          src={product.images && product.images.length > 0 ? product.images[0].url : "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium line-clamp-1">{product.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{product.description}</p>
                        <div className="flex items-center mt-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm ml-1">{product.ratings || 0}</span>
                          </div>
                        </div>
                        <p className="font-semibold mt-2">₹{product.price}</p>
                      </CardContent>
                    </Link>
                    <CardFooter className="p-4 pt-0">
                      <Button
                        className="w-full bg-green-700 hover:bg-green-800"
                        onClick={() => handleAddToCart(product._id)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {pagination.totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {[...Array(pagination.totalPages)].map((_, i) => {
                      const page = i + 1
                      // Show current page, first page, last page, and pages around current page
                      if (
                        page === 1 ||
                        page === pagination.totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <Button
                            key={page}
                            variant="outline"
                            size="sm"
                            className={currentPage === page ? "bg-green-700 text-white hover:bg-green-800" : ""}
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </Button>
                        )
                      }

                      // Show ellipsis for skipped pages
                      if (page === 2 || page === pagination.totalPages - 1) {
                        return <span key={page}>...</span>
                      }

                      return null
                    })}

                    <Button
                      variant="outline"
                      size="icon"
                      disabled={currentPage === pagination.totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

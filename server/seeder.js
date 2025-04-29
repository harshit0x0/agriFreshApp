import mongoose from "mongoose"
import dotenv from "dotenv"
import User from "./models/user.model.js"
import Category from "./models/category.model.js"
import Product from "./models/product.model.js"

// Load env vars
dotenv.config()

// Connect to DB
mongoose.connect(process.env.MONGODB_URI)

// Sample data
const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "password123",
    phone: "9876543210",
    role: "admin",
    isVerified: true,
  },
  {
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    password: "password123",
    phone: "9876543211",
    role: "seller",
    businessName: "Kumar Farms",
    businessType: "farmer",
    isVerified: true,
  },
  {
    name: "Anita Sharma",
    email: "anita@example.com",
    password: "password123",
    phone: "9876543212",
    role: "buyer",
    isVerified: true,
  },
]

const categories = [
  {
    name: "Seeds & Plants",
    description: "High-quality seeds and seedlings for various crops and plants",
    image: "/placeholder.svg",
  },
  {
    name: "Fertilizers",
    description: "Organic and chemical fertilizers to enhance soil fertility",
    image: "/placeholder.svg",
  },
  {
    name: "Pesticides",
    description: "Effective pest control solutions for crop protection",
    image: "/placeholder.svg",
  },
  {
    name: "Farm Equipment",
    description: "Modern tools and machinery for efficient farming",
    image: "/placeholder.svg",
  },
  {
    name: "Irrigation",
    description: "Water management systems and equipment for optimal irrigation",
    image: "/placeholder.svg",
  },
  {
    name: "Fruits & Vegetables",
    description: "Fresh produce directly from farmers to consumers",
    image: "/placeholder.svg",
  },
  {
    name: "Dairy Products",
    description: "Fresh milk and dairy products from local farmers",
    image: "/placeholder.svg",
  },
  {
    name: "Grains & Pulses",
    description: "High-quality grains and pulses from verified sources",
    image: "/placeholder.svg",
  },
]

// Import data into DB
const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany()
    await Category.deleteMany()
    await Product.deleteMany()

    // Create users
    const createdUsers = await User.create(users)
    const adminUser = createdUsers[0]._id
    const sellerUser = createdUsers[1]._id

    // Create categories
    const createdCategories = await Category.create(categories)

    // Create sample products
    const seedsCategory = createdCategories.find((c) => c.name === "Seeds & Plants")._id
    const fertilizerCategory = createdCategories.find((c) => c.name === "Fertilizers")._id
    const equipmentCategory = createdCategories.find((c) => c.name === "Farm Equipment")._id

    const products = [
      {
        name: "Premium Wheat Seeds",
        description:
          "High-yield wheat seeds resistant to common diseases. These premium quality seeds are carefully selected and tested to ensure maximum germination rates and crop yields.",
        price: 1200,
        images: [{ url: "/placeholder.svg", alt: "Wheat Seeds" }],
        category: seedsCategory,
        stock: 50,
        brand: "GrowWell",
        seller: sellerUser,
        ratings: 4.5,
        numReviews: 12,
        specifications: [
          { name: "Variety", value: "HD-2967" },
          { name: "Germination Rate", value: "95%" },
          { name: "Treatment", value: "Fungicide Treated" },
        ],
        packageSizes: [
          { size: "5kg", price: 1200, stock: 20 },
          { size: "10kg", price: 2300, stock: 15 },
          { size: "25kg", price: 5500, stock: 15 },
        ],
      },
      {
        name: "Organic Fertilizer",
        description:
          "100% organic fertilizer for all types of crops. Enhances soil fertility and promotes healthy plant growth without harmful chemicals.",
        price: 850,
        images: [{ url: "/placeholder.svg", alt: "Organic Fertilizer" }],
        category: fertilizerCategory,
        stock: 100,
        brand: "EcoNutrients",
        seller: sellerUser,
        ratings: 4.2,
        numReviews: 8,
        specifications: [
          { name: "Type", value: "Organic" },
          { name: "Composition", value: "NPK 5-3-2" },
          { name: "Weight", value: "25kg" },
        ],
      },
      {
        name: "Tractor Attachment Set",
        description:
          "Complete set of attachments for modern tractors. Includes plough, harrow, and cultivator for versatile farming operations.",
        price: 8500,
        images: [{ url: "/placeholder.svg", alt: "Tractor Attachments" }],
        category: equipmentCategory,
        stock: 15,
        brand: "FarmTech",
        seller: sellerUser,
        ratings: 4.7,
        numReviews: 6,
        specifications: [
          { name: "Compatibility", value: "Universal" },
          { name: "Material", value: "High-grade Steel" },
          { name: "Warranty", value: "2 years" },
        ],
      },
    ]

    await Product.create(products)

    console.log("Data Imported!")
    process.exit()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

// Delete data from DB
const destroyData = async () => {
  try {
    await User.deleteMany()
    await Category.deleteMany()
    await Product.deleteMany()

    console.log("Data Destroyed!")
    process.exit()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

// Run script with argument
if (process.argv[2] === "-d") {
  destroyData()
} else {
  importData()
}

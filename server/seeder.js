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
    role: "seller",
    businessName: "Sharma Organics",
    businessType: "farmer",
    isVerified: true,
  },
  {
    name: "Vikram Singh",
    email: "vikram@example.com",
    password: "password123",
    phone: "9876543213",
    role: "seller",
    businessName: "Singh Agro Equipment",
    businessType: "supplier",
    isVerified: true,
  },
  {
    name: "Priya Patel",
    email: "priya@example.com",
    password: "password123",
    phone: "9876543214",
    role: "buyer",
    isVerified: true,
  },
  {
    name: "Suresh Reddy",
    email: "suresh@example.com",
    password: "password123",
    phone: "9876543215",
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
    const sellerUser1 = createdUsers[1]._id
    const sellerUser2 = createdUsers[2]._id
    const sellerUser3 = createdUsers[3]._id

    // Create categories
    const createdCategories = await Category.create(categories)

    // Get category IDs
    const seedsCategory = createdCategories.find((c) => c.name === "Seeds & Plants")._id
    const fertilizerCategory = createdCategories.find((c) => c.name === "Fertilizers")._id
    const pesticidesCategory = createdCategories.find((c) => c.name === "Pesticides")._id
    const equipmentCategory = createdCategories.find((c) => c.name === "Farm Equipment")._id
    const irrigationCategory = createdCategories.find((c) => c.name === "Irrigation")._id
    const fruitsVegetablesCategory = createdCategories.find((c) => c.name === "Fruits & Vegetables")._id
    const dairyCategory = createdCategories.find((c) => c.name === "Dairy Products")._id
    const grainsCategory = createdCategories.find((c) => c.name === "Grains & Pulses")._id

    // Create sample products
    const products = [
      // Seeds & Plants Category
      {
        name: "Premium Wheat Seeds",
        description:
          "High-yield wheat seeds resistant to common diseases. These premium quality seeds are carefully selected and tested to ensure maximum germination rates and crop yields.",
        price: 1200,
        images: [{ url: "/placeholder.svg", alt: "Wheat Seeds" }],
        category: seedsCategory,
        stock: 50,
        brand: "GrowWell",
        seller: sellerUser1,
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
        name: "Hybrid Tomato Seedlings",
        description:
          "Disease-resistant hybrid tomato seedlings that produce high yields. These seedlings are grown in controlled environments and are ready for transplanting.",
        price: 350,
        images: [{ url: "/placeholder.svg", alt: "Tomato Seedlings" }],
        category: seedsCategory,
        stock: 100,
        brand: "GreenHarvest",
        seller: sellerUser2,
        ratings: 4.7,
        numReviews: 18,
        specifications: [
          { name: "Variety", value: "Arka Rakshak" },
          { name: "Growth Period", value: "75-85 days" },
          { name: "Disease Resistance", value: "High" },
        ],
        packageSizes: [
          { size: "10 seedlings", price: 350, stock: 50 },
          { size: "25 seedlings", price: 800, stock: 30 },
          { size: "50 seedlings", price: 1500, stock: 20 },
        ],
      },
      {
        name: "Organic Rice Seeds",
        description:
          "Certified organic rice seeds for chemical-free farming. These seeds are sourced from traditional varieties and are perfect for organic farming practices.",
        price: 950,
        images: [{ url: "/placeholder.svg", alt: "Rice Seeds" }],
        category: seedsCategory,
        stock: 75,
        brand: "OrganicGrow",
        seller: sellerUser1,
        ratings: 4.3,
        numReviews: 9,
        specifications: [
          { name: "Variety", value: "Basmati 1121" },
          { name: "Certification", value: "Organic Certified" },
          { name: "Yield Potential", value: "4-5 tons/hectare" },
        ],
        packageSizes: [
          { size: "5kg", price: 950, stock: 30 },
          { size: "10kg", price: 1800, stock: 25 },
          { size: "20kg", price: 3400, stock: 20 },
        ],
      },

      // Fertilizers Category
      {
        name: "Organic Fertilizer",
        description:
          "100% organic fertilizer for all types of crops. Enhances soil fertility and promotes healthy plant growth without harmful chemicals.",
        price: 850,
        images: [{ url: "/placeholder.svg", alt: "Organic Fertilizer" }],
        category: fertilizerCategory,
        stock: 100,
        brand: "EcoNutrients",
        seller: sellerUser1,
        ratings: 4.2,
        numReviews: 8,
        specifications: [
          { name: "Type", value: "Organic" },
          { name: "Composition", value: "NPK 5-3-2" },
          { name: "Weight", value: "25kg" },
        ],
      },
      {
        name: "NPK Complex Fertilizer",
        description:
          "Balanced NPK fertilizer for improved crop yield and quality. This fertilizer provides essential nutrients in the right proportions for optimal plant growth.",
        price: 1200,
        images: [{ url: "/placeholder.svg", alt: "NPK Fertilizer" }],
        category: fertilizerCategory,
        stock: 150,
        brand: "CropBoost",
        seller: sellerUser2,
        ratings: 4.6,
        numReviews: 15,
        specifications: [
          { name: "Composition", value: "NPK 19-19-19" },
          { name: "Form", value: "Granular" },
          { name: "Application", value: "All Crops" },
        ],
        packageSizes: [
          { size: "10kg", price: 1200, stock: 50 },
          { size: "25kg", price: 2800, stock: 60 },
          { size: "50kg", price: 5400, stock: 40 },
        ],
      },
      {
        name: "Vermicompost Premium",
        description:
          "High-quality vermicompost produced from organic waste using earthworms. Improves soil structure and provides slow-release nutrients.",
        price: 600,
        images: [{ url: "/placeholder.svg", alt: "Vermicompost" }],
        category: fertilizerCategory,
        stock: 200,
        brand: "EarthWorm",
        seller: sellerUser1,
        ratings: 4.8,
        numReviews: 22,
        specifications: [
          { name: "Type", value: "Organic" },
          { name: "pH", value: "6.8-7.2" },
          { name: "Moisture Content", value: "30-40%" },
        ],
        packageSizes: [
          { size: "5kg", price: 600, stock: 80 },
          { size: "15kg", price: 1500, stock: 70 },
          { size: "30kg", price: 2700, stock: 50 },
        ],
      },

      // Pesticides Category
      {
        name: "Neem Oil Organic Pesticide",
        description:
          "Natural neem oil extract for organic pest control. Effective against a wide range of insects while being safe for beneficial organisms.",
        price: 450,
        images: [{ url: "/placeholder.svg", alt: "Neem Oil" }],
        category: pesticidesCategory,
        stock: 120,
        brand: "OrganicDefend",
        seller: sellerUser2,
        ratings: 4.4,
        numReviews: 16,
        specifications: [
          { name: "Type", value: "Organic" },
          { name: "Concentration", value: "1500 ppm" },
          { name: "Target Pests", value: "Aphids, Mites, Whiteflies" },
        ],
        packageSizes: [
          { size: "500ml", price: 450, stock: 50 },
          { size: "1L", price: 850, stock: 40 },
          { size: "5L", price: 3800, stock: 30 },
        ],
      },
      {
        name: "Broad Spectrum Fungicide",
        description:
          "Effective fungicide for controlling various fungal diseases in crops. Provides preventive and curative action against powdery mildew, rust, and other fungal infections.",
        price: 780,
        images: [{ url: "/placeholder.svg", alt: "Fungicide" }],
        category: pesticidesCategory,
        stock: 90,
        brand: "CropGuard",
        seller: sellerUser1,
        ratings: 4.3,
        numReviews: 11,
        specifications: [
          { name: "Active Ingredient", value: "Tebuconazole 25.9%" },
          { name: "Formulation", value: "Emulsifiable Concentrate" },
          { name: "Application", value: "Foliar Spray" },
        ],
        packageSizes: [
          { size: "250ml", price: 780, stock: 40 },
          { size: "500ml", price: 1450, stock: 30 },
          { size: "1L", price: 2700, stock: 20 },
        ],
      },

      // Farm Equipment Category
      {
        name: "Tractor Attachment Set",
        description:
          "Complete set of attachments for modern tractors. Includes plough, harrow, and cultivator for versatile farming operations.",
        price: 8500,
        images: [{ url: "/placeholder.svg", alt: "Tractor Attachments" }],
        category: equipmentCategory,
        stock: 15,
        brand: "FarmTech",
        seller: sellerUser3,
        ratings: 4.7,
        numReviews: 6,
        specifications: [
          { name: "Compatibility", value: "Universal" },
          { name: "Material", value: "High-grade Steel" },
          { name: "Warranty", value: "2 years" },
        ],
      },
      {
        name: "Battery Operated Sprayer",
        description:
          "Rechargeable battery-powered sprayer for efficient pesticide and fertilizer application. Features adjustable nozzle and comfortable straps for ease of use.",
        price: 3200,
        images: [{ url: "/placeholder.svg", alt: "Battery Sprayer" }],
        category: equipmentCategory,
        stock: 25,
        brand: "SprayMaster",
        seller: sellerUser3,
        ratings: 4.5,
        numReviews: 14,
        specifications: [
          { name: "Capacity", value: "16L" },
          { name: "Battery", value: "12V, 8Ah Lithium-ion" },
          { name: "Working Time", value: "4-5 hours" },
        ],
      },
      {
        name: "Manual Seed Drill",
        description:
          "Precision manual seed drill for small and medium farms. Ensures uniform seed placement and proper spacing for optimal germination and growth.",
        price: 4500,
        images: [{ url: "/placeholder.svg", alt: "Seed Drill" }],
        category: equipmentCategory,
        stock: 18,
        brand: "SeedTech",
        seller: sellerUser3,
        ratings: 4.2,
        numReviews: 8,
        specifications: [
          { name: "Rows", value: "4" },
          { name: "Row Spacing", value: "Adjustable 15-30cm" },
          { name: "Weight", value: "25kg" },
        ],
      },

      // Irrigation Category
      {
        name: "Drip Irrigation Kit",
        description:
          "Complete drip irrigation system for water-efficient farming. Includes pipes, drippers, connectors, and filters for easy installation.",
        price: 5800,
        images: [{ url: "/placeholder.svg", alt: "Drip Irrigation" }],
        category: irrigationCategory,
        stock: 20,
        brand: "WaterSave",
        seller: sellerUser3,
        ratings: 4.6,
        numReviews: 13,
        specifications: [
          { name: "Coverage", value: "1 Acre" },
          { name: "Dripper Spacing", value: "30cm" },
          { name: "Flow Rate", value: "4L/hour" },
        ],
        packageSizes: [
          { size: "0.5 Acre Kit", price: 3000, stock: 8 },
          { size: "1 Acre Kit", price: 5800, stock: 7 },
          { size: "2 Acre Kit", price: 11000, stock: 5 },
        ],
      },
      {
        name: "Solar Water Pump",
        description:
          "Energy-efficient solar-powered water pump for irrigation. Reduces electricity costs and provides reliable water supply even in remote areas.",
        price: 15000,
        images: [{ url: "/placeholder.svg", alt: "Solar Pump" }],
        category: irrigationCategory,
        stock: 10,
        brand: "SolarFlow",
        seller: sellerUser3,
        ratings: 4.8,
        numReviews: 9,
        specifications: [
          { name: "Power", value: "1HP" },
          { name: "Solar Panel", value: "1200W" },
          { name: "Max Flow Rate", value: "10,000L/hour" },
        ],
      },

      // Fruits & Vegetables Category
      {
        name: "Organic Tomatoes",
        description:
          "Fresh, organically grown tomatoes harvested at peak ripeness. Rich in flavor and nutrients, perfect for salads and cooking.",
        price: 60,
        images: [{ url: "/placeholder.svg", alt: "Tomatoes" }],
        category: fruitsVegetablesCategory,
        stock: 100,
        brand: "Sharma Organics",
        seller: sellerUser2,
        ratings: 4.7,
        numReviews: 24,
        specifications: [
          { name: "Type", value: "Organic" },
          { name: "Variety", value: "Roma" },
          { name: "Freshness", value: "Harvested within 24 hours" },
        ],
        packageSizes: [
          { size: "1kg", price: 60, stock: 40 },
          { size: "5kg", price: 280, stock: 35 },
          { size: "10kg", price: 550, stock: 25 },
        ],
      },
      {
        name: "Fresh Apples",
        description: "Crisp and juicy apples from Himalayan orchards. Naturally sweet and packed with antioxidants.",
        price: 120,
        images: [{ url: "/placeholder.svg", alt: "Apples" }],
        category: fruitsVegetablesCategory,
        stock: 80,
        brand: "Mountain Harvest",
        seller: sellerUser1,
        ratings: 4.5,
        numReviews: 19,
        specifications: [
          { name: "Variety", value: "Royal Delicious" },
          { name: "Origin", value: "Himachal Pradesh" },
          { name: "Storage", value: "Refrigerate for longer shelf life" },
        ],
        packageSizes: [
          { size: "1kg", price: 120, stock: 30 },
          { size: "5kg", price: 550, stock: 25 },
          { size: "10kg", price: 1050, stock: 25 },
        ],
      },

      // Dairy Products Category
      {
        name: "Farm Fresh Milk",
        description:
          "Pure, pasteurized milk from grass-fed cows. Rich in calcium and protein, delivered fresh from the farm.",
        price: 60,
        images: [{ url: "/placeholder.svg", alt: "Milk" }],
        category: dairyCategory,
        stock: 50,
        brand: "Kumar Farms",
        seller: sellerUser1,
        ratings: 4.9,
        numReviews: 32,
        specifications: [
          { name: "Type", value: "Full Cream" },
          { name: "Fat Content", value: "4.5%" },
          { name: "Pasteurization", value: "HTST Method" },
        ],
        packageSizes: [
          { size: "500ml", price: 30, stock: 20 },
          { size: "1L", price: 60, stock: 15 },
          { size: "5L", price: 290, stock: 15 },
        ],
      },
      {
        name: "Artisanal Cheese",
        description:
          "Handcrafted cheese made from farm-fresh milk. Aged to perfection for a rich, complex flavor profile.",
        price: 350,
        images: [{ url: "/placeholder.svg", alt: "Cheese" }],
        category: dairyCategory,
        stock: 30,
        brand: "Sharma Organics",
        seller: sellerUser2,
        ratings: 4.7,
        numReviews: 15,
        specifications: [
          { name: "Type", value: "Semi-hard" },
          { name: "Aging", value: "3 months" },
          { name: "Milk Source", value: "Cow" },
        ],
        packageSizes: [
          { size: "250g", price: 350, stock: 15 },
          { size: "500g", price: 650, stock: 10 },
          { size: "1kg", price: 1200, stock: 5 },
        ],
      },

      // Grains & Pulses Category
      {
        name: "Organic Basmati Rice",
        description:
          "Premium long-grain basmati rice grown using organic farming practices. Known for its distinctive aroma and flavor.",
        price: 180,
        images: [{ url: "/placeholder.svg", alt: "Basmati Rice" }],
        category: grainsCategory,
        stock: 100,
        brand: "Kumar Farms",
        seller: sellerUser1,
        ratings: 4.8,
        numReviews: 27,
        specifications: [
          { name: "Type", value: "Organic" },
          { name: "Grain Length", value: "Extra Long" },
          { name: "Aging", value: "12 months" },
        ],
        packageSizes: [
          { size: "1kg", price: 180, stock: 40 },
          { size: "5kg", price: 850, stock: 35 },
          { size: "10kg", price: 1650, stock: 25 },
        ],
      },
      {
        name: "Organic Yellow Lentils",
        description:
          "Nutritious yellow lentils (moong dal) grown without chemicals. High in protein and easy to digest.",
        price: 120,
        images: [{ url: "/placeholder.svg", alt: "Yellow Lentils" }],
        category: grainsCategory,
        stock: 80,
        brand: "Sharma Organics",
        seller: sellerUser2,
        ratings: 4.6,
        numReviews: 18,
        specifications: [
          { name: "Type", value: "Organic" },
          { name: "Processing", value: "Split, Polished" },
          { name: "Protein Content", value: "24g per 100g" },
        ],
        packageSizes: [
          { size: "500g", price: 65, stock: 30 },
          { size: "1kg", price: 120, stock: 25 },
          { size: "5kg", price: 580, stock: 25 },
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

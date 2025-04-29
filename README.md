# AgriFresh - Agricultural E-commerce Platform

![AgriFresh Logo](/placeholder.svg?height=200&width=200)

## 🌱 Overview

AgriFresh is a modern e-commerce platform specifically designed for agricultural products, connecting farmers directly with consumers. The platform aims to eliminate intermediaries, ensuring farmers receive fair prices for their produce while consumers get access to fresh, high-quality agricultural products at reasonable prices.

## 🚜 Problem Statement

Traditional agricultural supply chains involve multiple intermediaries, leading to:
- Reduced profits for farmers
- Higher prices for consumers
- Longer transit times affecting product freshness
- Limited product traceability and transparency

## 🌿 Solution

AgriFresh provides a direct marketplace where:
- Farmers can list their products, set their own prices, and reach a wider customer base
- Consumers can purchase fresh produce directly from the source
- The platform handles logistics, payments, and customer service
- Both parties benefit from a transparent, efficient system

## ✨ Key Features

### For Consumers
- **Product Discovery**: Browse a wide range of agricultural products by category
- **Detailed Product Information**: View product details, origin, farming practices, and reviews
- **Secure Shopping**: Add products to cart and checkout securely
- **Order Tracking**: Track orders from purchase to delivery
- **User Profiles**: Manage personal information, addresses, and payment methods
- **Order History**: View past orders and reorder easily

### For Farmers/Sellers
- **Product Management**: Add, edit, and manage product listings
- **Inventory Control**: Track stock levels and receive low-stock notifications
- **Order Management**: View and process incoming orders
- **Sales Analytics**: Access insights on sales performance and customer preferences
- **Direct Communication**: Connect with customers for feedback and support

### Platform Features
- **Authentication & Authorization**: Secure user registration and login
- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **Search & Filters**: Find products by name, category, price range, etc.
- **Payment Integration**: Multiple payment options for convenience
- **Rating & Reviews**: Community feedback on products and sellers
- **Admin Dashboard**: Comprehensive platform management tools

## 🛠️ Tech Stack

### Frontend
- **Next.js**: React framework for server-side rendering and static site generation
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **ShadCN UI**: Component library for consistent UI elements
- **Context API**: For state management

### Backend
- **Express.js**: Node.js web application framework
- **MongoDB**: NoSQL database for flexible data storage
- **Mongoose**: MongoDB object modeling for Node.js
- **JWT**: For secure authentication
- **Bcrypt**: For password hashing

### DevOps & Tools
- **Git**: Version control
- **ESLint & Prettier**: Code quality and formatting
- **Jest**: Testing framework

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.x or later)
- npm or yarn
- MongoDB (local or Atlas connection)

## 🚀 Getting Started

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/agrifresh.git
   cd agrifresh
   \`\`\`

2. Install dependencies for both frontend and backend:
   \`\`\`bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd server
   npm install
   cd ..
   \`\`\`

3. Set up environment variables:
   - Create a `.env` file in the root directory based on `.env.example`
   - Create a `.env` file in the `server` directory based on `server/.env.example`

4. Seed the database (optional):
   \`\`\`bash
   cd server
   npm run seed
   cd ..
   \`\`\`

### Running the Application

1. Start the backend server:
   \`\`\`bash
   cd server
   npm run dev
   \`\`\`

2. In a new terminal, start the frontend:
   \`\`\`bash
   npm run dev
   \`\`\`

3. Access the application:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`

## 🔧 Environment Variables

### Frontend (.env)
\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:5000/api
\`\`\`

### Backend (server/.env)
\`\`\`
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/agrifresh
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30
\`\`\`

## 📁 Project Structure

\`\`\`
agrifresh/
├── app/                    # Next.js pages and routes
│   ├── auth/               # Authentication pages
│   ├── products/           # Product listing and details
│   ├── cart/               # Shopping cart
│   ├── checkout/           # Checkout process
│   ├── dashboard/          # User dashboard
│   └── ...
├── components/             # Reusable React components
├── context/                # React Context providers
├── lib/                    # API services and utilities
├── public/                 # Static assets
├── server/                 # Backend Express.js server
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   └── server.js           # Server entry point
├── types/                  # TypeScript type definitions
├── .env                    # Environment variables
├── .env.example            # Example environment variables
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
\`\`\`

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/logout` - Logout a user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create a product (seller only)
- `PUT /api/products/:id` - Update a product (seller only)
- `DELETE /api/products/:id` - Delete a product (seller only)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create a category (admin only)
- `PUT /api/categories/:id` - Update a category (admin only)
- `DELETE /api/categories/:id` - Delete a category (admin only)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item
- `DELETE /api/cart/:itemId` - Remove item from cart

### Orders
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create an order
- `PUT /api/orders/:id` - Update order status (admin/seller only)

### Payments
- `POST /api/payments` - Process payment
- `GET /api/payments/:orderId` - Get payment status

## 👥 User Roles

1. **Customer**
   - Browse products
   - Add items to cart
   - Place orders
   - Track order status
   - Leave reviews

2. **Farmer/Seller**
   - All customer privileges
   - Manage product listings
   - Process orders
   - View sales analytics

3. **Admin**
   - All seller privileges
   - Manage categories
   - Manage users
   - Platform-wide analytics

## 🤝 Contributing

We welcome contributions to AgriFresh! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

For any questions or feedback, please reach out to:
- Email: support@agrifresh.com
- Twitter: [@AgriFresh](https://twitter.com/agrifresh)
- Website: [www.agrifresh.com](https://www.agrifresh.com)

---

Made with ❤️ for farmers and consumers alike.

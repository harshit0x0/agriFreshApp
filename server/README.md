# AgriFresh Backend API

This is the backend API for the AgriFresh agriculture e-commerce platform. It provides all the necessary endpoints for user authentication, product management, order processing, and more.

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`
3. Create a `.env` file based on `.env.example` and fill in your configuration details
4. Start the development server:
   \`\`\`
   npm run dev
   \`\`\`

### Seeding the Database

To populate the database with sample data:

\`\`\`
npm run seed
\`\`\`

To clear all data:

\`\`\`
npm run seed -- -d
\`\`\`

## API Documentation

### Authentication Routes

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/updatedetails` - Update user details
- `PUT /api/auth/updatepassword` - Update password
- `POST /api/auth/forgotpassword` - Forgot password
- `PUT /api/auth/resetpassword/:resettoken` - Reset password

### User Routes

- `GET /api/users` - Get all users (admin)
- `GET /api/users/:id` - Get single user (admin)
- `POST /api/users` - Create user (admin)
- `PUT /api/users/:id` - Update user (admin)
- `DELETE /api/users/:id` - Delete user (admin)
- `PUT /api/users/address` - Update user address
- `GET /api/users/seller/:id` - Get seller profile

### Product Routes

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (seller/admin)
- `PUT /api/products/:id` - Update product (seller/admin)
- `DELETE /api/products/:id` - Delete product (seller/admin)
- `POST /api/products/:id/reviews` - Create product review
- `GET /api/products/:id/related` - Get related products

### Category Routes

- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category (admin)
- `PUT /api/categories/:id` - Update category (admin)
- `DELETE /api/categories/:id` - Delete category (admin)
- `GET /api/categories/slug/:slug` - Get category by slug
- `GET /api/categories/:id/subcategories` - Get subcategories

### Order Routes

- `POST /api/orders` - Create order
- `GET /api/orders` - Get all orders (admin)
- `GET /api/orders/myorders` - Get logged in user orders
- `GET /api/orders/:id` - Get order by ID
- `DELETE /api/orders/:id` - Delete order (admin)
- `PUT /api/orders/:id/pay` - Update order to paid
- `PUT /api/orders/:id/status` - Update order status (admin/seller)

### Cart Routes

- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:productId` - Update cart item
- `DELETE /api/cart/:productId` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Payment Routes

- `POST /api/payments/create-payment-intent` - Create payment intent
- `POST /api/payments/verify` - Verify payment
- `GET /api/payments/methods` - Get payment methods
- `POST /api/payments/refund` - Process refund (admin)

## License

MIT

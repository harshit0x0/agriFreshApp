import mongoose from "mongoose"

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Cart must belong to a user"],
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "Cart item must have a product"],
        },
        quantity: {
          type: Number,
          required: [true, "Cart item must have a quantity"],
          min: [1, "Quantity must be at least 1"],
        },
        packageSize: {
          type: String,
          default: null,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
)

// Add index for faster queries
cartSchema.index({ user: 1 })

const Cart = mongoose.model("Cart", cartSchema)

export default Cart

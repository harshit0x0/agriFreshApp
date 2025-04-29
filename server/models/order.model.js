import mongoose from "mongoose"

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Order must belong to a user"],
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "Order item must have a product"],
        },
        name: {
          type: String,
          required: [true, "Order item must have a name"],
        },
        quantity: {
          type: Number,
          required: [true, "Order item must have a quantity"],
          min: [1, "Quantity must be at least 1"],
        },
        price: {
          type: Number,
          required: [true, "Order item must have a price"],
        },
        packageSize: {
          type: String,
          default: null,
        },
        image: {
          type: String,
          default: "/placeholder.svg",
        },
      },
    ],
    shippingAddress: {
      firstName: {
        type: String,
        required: [true, "Please provide first name"],
      },
      lastName: {
        type: String,
        required: [true, "Please provide last name"],
      },
      address: {
        type: String,
        required: [true, "Please provide address"],
      },
      city: {
        type: String,
        required: [true, "Please provide city"],
      },
      state: {
        type: String,
        required: [true, "Please provide state"],
      },
      pincode: {
        type: String,
        required: [true, "Please provide pincode"],
      },
      phone: {
        type: String,
        required: [true, "Please provide phone number"],
      },
    },
    paymentMethod: {
      type: String,
      required: [true, "Please provide payment method"],
      enum: ["card", "bank", "cod"],
    },
    paymentResult: {
      id: String,
      status: String,
      updateTime: String,
      email: String,
    },
    itemsPrice: {
      type: Number,
      required: [true, "Please provide items price"],
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: [true, "Please provide shipping price"],
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: [true, "Please provide tax price"],
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: [true, "Please provide total price"],
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    status: {
      type: String,
      required: true,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },
    deliveredAt: {
      type: Date,
    },
    notes: {
      type: String,
    },
    trackingNumber: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

// Add index for faster queries
orderSchema.index({ user: 1, createdAt: -1 })

const Order = mongoose.model("Order", orderSchema)

export default Order

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"]
    },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: [true, "Product is required"] },
            quantity: { type: Number, required: true, min: [1, "Quantity must be at least 1"] },
            price: { type: Number, required: true, min: [0, "Price cannot be negative"] }
        }
    ],
    totalPrice: { type: Number, required: true, min: [0, "Total price cannot be negative"] },
    status: {
        type: String,
        enum: {
            values: ["pending", "shipped", "delivered", "canceled"],
            message: "Status must be one of: pending, shipped, delivered, canceled"
        },
        default: "pending"
    },
    shippingAddress: { type: String, required: [true, "Shipping address is required"], minlength: [5, "Shipping address must be at least 5 characters long"] }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;
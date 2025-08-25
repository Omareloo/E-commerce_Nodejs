import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true, min: 1 },
            price: { type: Number, required: true, min: 0 }
        }
    ],
    totalPrice: { type: Number, required: true, min: 0 },
    status: {
        type: String,
        enum: ["pending", "shipped", "delivered", "canceled"],
        default: "pending"
    },
    shippingAddress: { type: String, required: true, minlength: 5 }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;
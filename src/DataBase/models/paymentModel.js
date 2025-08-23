import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: "usd"
    },
    status: {
        type: String,
        enum: ["pending", "succeeded", "failed"],
        default: "pending"
    },
    stripePaymentIntentId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;

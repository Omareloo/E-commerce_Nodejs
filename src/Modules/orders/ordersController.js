import Order from "../../../DataBase/models/orderModel.js";
import Cart from "../../../DataBase/models/cartModel.js";
import CatchError from "../../utils/CatchAyncError.js";
import { AppError } from "../../utils/CreateError.js";


// user
export const createOrder = CatchError(async (req, res, next) => {
    const userId = req.user.id;
    const { shippingAddress } = req.body;

    const cart = await Cart.findOne({ userId }).populate("items.productId", "price name");
    if (!cart || cart.items.length === 0) return next(new AppError("Cart is empty", 400));

    const items = cart.items.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price
    }));

    const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    let order = await Order.create({ userId, items, totalPrice, shippingAddress });

    // 🟢 populate user name & email
    order = await order.populate("userId", "userName email");

    cart.items = [];
    await cart.save();

    res.status(201).json({ message: "Order created", order });
});

// user
export const getUserOrders = CatchError(async (req, res) => {
    const orders = await Order.find({ userId: req.user.id }).populate("items.productId", "name price").sort({ createdAt: -1 });
    res.json({ orders });
});

// user
export const cancelOrder = CatchError(async (req, res, next) => {
    const { orderId } = req.params;
    const userId = req.user.id;

    const order = await Order.findOne({ _id: orderId, userId });
    if (!order) return next(new AppError("Order not found", 404));

    if (order.status !== "pending") { return next(new AppError("You can only cancel pending orders", 400)); }

    order.status = "canceled";
    await order.save();

    res.json({ message: "Order canceled", order });
});

// user
export const deleteAllUserOrders = CatchError(async (req, res) => {
    const userId = req.user.id;

    await Order.deleteMany({ userId });

    res.json({ message: "All your orders have been deleted" });
});




// admin
export const getAllOrders = CatchError(async (req, res) => {
    const orders = await Order.find()
        .populate("userId", "userName email")  // 🟢 populate user info
        .populate("items.productId", "name price") // optional populate products
        .sort({ createdAt: -1 });
    res.json({ orders });
});

// admin
export const updateOrderStatus = CatchError(async (req, res, next) => {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return next(new AppError("Order not found", 404));

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated", order });
});
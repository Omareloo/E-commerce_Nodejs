import express from "express";
import { createOrder, getUserOrders, cancelOrder, deleteAllUserOrders, getAllOrders, updateOrderStatus } from "./ordersController.js";
import adminMiddleware from "../../MiddleWare/adminMiddleware.js";
import { authuntcation } from "../../MiddleWare/auth.middleware.js";

const orderRouter = express.Router();


// for user
orderRouter.post("/user", authuntcation, createOrder);
orderRouter.get("/user", authuntcation, getUserOrders);
orderRouter.put("/user/:orderId", authuntcation, cancelOrder);
orderRouter.delete("/user", authuntcation, deleteAllUserOrders);

// for admin
orderRouter.get("/admin", authuntcation, adminMiddleware, getAllOrders);
orderRouter.put("/admin/:orderId", authuntcation, adminMiddleware, updateOrderStatus);

export default orderRouter;
import express from "express";
import { createOrder, getUserOrders, cancelOrder, deleteAllUserOrders, getAllOrders, updateOrderStatus } from "../controllers/orderController.js";
import adminMiddleware from "../../MiddleWare/adminMiddleware.js";
// import authMiddleware

const orderRouter = express.Router();


// for user
orderRouter.post("/userorder", authMiddleware, createOrder);
orderRouter.get("/userorder", authMiddleware, getUserOrders);
orderRouter.put("/userorder/:orderId", authMiddleware, cancelOrder);
orderRouter.delete("/userorder", authMiddleware, deleteAllUserOrders);

// for admin
router.get("/allorders", authMiddleware, adminMiddleware, getAllOrders);
router.put("/statusorder/:orderId", authMiddleware, adminMiddleware, updateOrderStatus);

export default orderRouter;
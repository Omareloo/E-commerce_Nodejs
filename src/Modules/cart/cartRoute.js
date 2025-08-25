import express from "express";
// import { authMiddleware } from "../../MiddleWare/verifyToken.js";
import { addToCart, getUserCart, removeFromCart, clearCart, updateCartQuantity } from "./cart.controller.js";

const cartRouter = express.Router();

// postRouter.use(authMiddleware)

cartRouter.post("/cart/:productId", addToCart);
cartRouter.get("/cart", getUserCart);
cartRouter.delete("/cart/:productId", removeFromCart);
cartRouter.delete("/cart", clearCart);
cartRouter.put("/cart/:productId", updateCartQuantity);

export default cartRouter;
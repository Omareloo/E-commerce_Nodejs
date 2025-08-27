import express from "express";
import { addToCart, getUserCart, removeFromCart, clearCart, updateCartQuantity } from "./cartController.js";
import { authuntcation } from "../../MiddleWare/auth.middleware.js";

const cartRouter = express.Router();

cartRouter.use(authuntcation);

cartRouter.post("/:productId", addToCart);
cartRouter.get("/", getUserCart);
cartRouter.delete("/:productId", removeFromCart);
cartRouter.delete("/", clearCart);
cartRouter.put("/:productId", updateCartQuantity);

export default cartRouter;
import express from "express";
import * as product from "./product.Controller.js";
import { upload } from "../../MiddleWare/Multer.js";
import { authuntcation,AllowTo } from "../../MiddleWare/auth.middleware.js";
const productRouter = express.Router();
productRouter
  .route("/")
  .post(authuntcation,AllowTo(["User","Admin"]),upload.single("image"), product.addproduct)
  .get(product.getproducts);

productRouter
  .route("/:id")
  .put( authuntcation,AllowTo(["User","Admin"]) ,upload.single("image"), product.updateCetproduct)
  .get(product.getproductByID)
  .delete(authuntcation,AllowTo(["User","Admin"]) ,product.deleteproduct);

export default productRouter;

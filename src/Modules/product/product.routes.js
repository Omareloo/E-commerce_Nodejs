import express from "express";
import * as product from "./product.Controller.js";
import { upload } from "../../MiddleWare/Multer.js";

const productRouter = express.Router();

productRouter
  .route("/")
  .post(upload.single("image"), product.addproduct)
  .get(product.getproducts);

productRouter
  .route("/:id")
  .put(upload.single("image"), product.updateCetproduct)
  .get(product.getproductByID)
  .delete(product.deleteproduct);

export default productRouter;

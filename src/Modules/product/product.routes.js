import express from "express"
import  * as product from "./product.Controller.js"
const productRouter =express.Router()
productRouter.route("/").get(product.getproducts).post(product.addproduct)
productRouter.route("/:id").put(product.updateCetproduct).get(product.getproductByID).delete(product.deleteproduct)
export default productRouter
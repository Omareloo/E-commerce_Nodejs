import express from "express"
import  * as Brand from "./Brand.controller.js"
const BrandRouter =express.Router()
BrandRouter.route("/").get(Brand.getBrands).post(Brand.addBrand)
BrandRouter.route("/:id").put(Brand.updateCetBrand).get(Brand.getBrandByID).delete(Brand.deleteBrand)
export default BrandRouter
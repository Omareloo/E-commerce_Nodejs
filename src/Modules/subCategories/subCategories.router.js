import express from "express"
import * as subcategory from "./subCategory.controller.js"
const subcategoryRouter =express.Router({mergeParams:true})
subcategoryRouter.route("/").get(subcategory.getsubCategories).post(subcategory.addsubCategory)
subcategoryRouter.route("/:id").put(subcategory.updatesubCetCategory).get(subcategory.getsubCategoryByID).delete(subcategory.deletesubCategory)
export default subcategoryRouter
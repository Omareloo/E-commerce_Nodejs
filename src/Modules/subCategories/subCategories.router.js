import express from "express"
import * as subcategory from "./subCategory.controller.js"
import { authuntcation } from "../../MiddleWare/auth.middleware.js"
import adminMiddleware from "../../MiddleWare/adminMiddleware.js"
const subcategoryRouter =express.Router({mergeParams:true})
subcategoryRouter.route("/").get( authuntcation, adminMiddleware,subcategory.getsubCategories).post(subcategory.addsubCategory)
subcategoryRouter.route("/:id").put( authuntcation, adminMiddleware,subcategory.updatesubCetCategory).get(subcategory.getsubCategoryByID).delete(subcategory.deletesubCategory)
export default subcategoryRouter
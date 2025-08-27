import express from "express"
import { addCategory, deleteCategory, getCategories, getCategoryByID, updateCetCategory } from "./categoryController.js"
import subcategoryRouter from "../subCategories/subCategories.router.js"
import { authuntcation,AllowTo } from "../../MiddleWare/auth.middleware.js";
import adminMiddleware from "../../MiddleWare/adminMiddleware.js";
const categoryRouter =express.Router()
categoryRouter.use("/:CategoryId/subCategories",subcategoryRouter)
categoryRouter.route("/").get( authuntcation, adminMiddleware,getCategories).post(addCategory)
categoryRouter.route("/:id").put( authuntcation, adminMiddleware,updateCetCategory).get( authuntcation, adminMiddleware,getCategoryByID).delete(authuntcation, adminMiddleware,deleteCategory)
export default categoryRouter
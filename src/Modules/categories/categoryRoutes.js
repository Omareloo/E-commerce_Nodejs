import express from "express"
import { addCategory, deleteCategory, getCategories, getCategoryByID, updateCetCategory } from "./categoryController.js"
import subcategoryRouter from "../subCategories/subCategories.router.js"
const categoryRouter =express.Router()
categoryRouter.use("/:CategoryId/subCategories",subcategoryRouter)
categoryRouter.route("/").get(getCategories).post(addCategory)
categoryRouter.route("/:id").put(updateCetCategory).get(getCategoryByID).delete(deleteCategory)
export default categoryRouter
import { Router } from "express";
import * as userservice from "./userController.js"
import { authuntcation,AllowTo } from "../../middlewares/auth.middleware.js";
const router =Router()


router.get("/profile",authuntcation,AllowTo([ "User"]),userservice.getprofile)
//router.patch("",authuntcation,AllowTo(["User","Admin"]),userservice.updateProfile)
export default router;

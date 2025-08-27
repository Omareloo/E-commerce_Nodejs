import { Router } from "express";
import * as userservice from "./userController.js"
import { authuntcation,AllowTo } from "../../MiddleWare/auth.middleware.js";
import { asyncHandler } from "../../utils/error-handling/Asynchandler.js";
import { updateProfileSchema ,changepasswordschema } from "./user.validation.js";
import { validation1 } from "../../MiddleWare/validation.js";
const router =Router()


router.get("/profile",authuntcation,AllowTo([ "User"]),userservice.getprofile)
router.patch("/updateprofile",authuntcation,AllowTo(["User","Admin"]),validation1(updateProfileSchema),asyncHandler(userservice.updateProfile))
router.patch("/changepassowrd",authuntcation,AllowTo(["User","Admin"]),validation1(changepasswordschema),asyncHandler(userservice.changePassword))
router.delete(
  "/delete",
  authuntcation,
  AllowTo(["User", "Admin"]),
  asyncHandler(userservice.deleteUser)
);

//Delete user by admin///
router.delete(
  "/delete/:id",
  authuntcation,
  AllowTo(["Admin"]),
  asyncHandler(userservice.deleteUserById)
);


 



 export default router;

import { Router } from "express";
import * as userservice from "./userController.js"
import { authuntcation,AllowTo } from "../../MiddleWare/auth.middleware.js";
 import { updateProfileSchema ,changepasswordschema } from "./user.validation.js";
import { validation1 } from "../../MiddleWare/validation.js";
import CatchError from "../../utils/CatchAyncError.js";
const router =Router()


router.get("/profile",authuntcation,AllowTo([ "User"]),userservice.getprofile)
router.patch("/updateprofile",authuntcation,AllowTo(["User","Admin"]),validation1(updateProfileSchema),CatchError(userservice.updateProfile))
router.patch("/changepassowrd",authuntcation,AllowTo(["User","Admin"]),validation1(changepasswordschema),CatchError(userservice.changePassword))
router.delete(
  "/delete",
  authuntcation,
  AllowTo(["User", "Admin"]),
  CatchError(userservice.deleteUser)
);

//Delete user by admin///
router.delete(
  "/delete/:id",
  authuntcation,
  AllowTo(["Admin"]),
  CatchError(userservice.deleteUserById)
);


 



 export default router;

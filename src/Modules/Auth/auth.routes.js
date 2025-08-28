import { Router } from "express";
import * as authservice from "./auth.controller.js"
import * as authValidation from "./auth.validation.js"
 import { validation1 } from "../../MiddleWare/validation.js";
import CatchError from "../../utils/CatchAyncError.js";

const router =Router()


router.post("/register",validation1(authValidation.registerSchema),authservice.register)
router.post("/login",validation1(authValidation.loginSchema),authservice.login)
router.get("/activate_account/:token",CatchError(authservice.activate_account))
export default router;


 
import mongoose from "mongoose";
import Joi from "joi";
import { rolesType } from "./auth.middleware.js"
import orderValidationSchema from "../Modules/orders/orderValidation.js";

export const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(...req.body, ...req.params, ...req.query, { abortEarly: false });
    if (error) {
      let errors = []
      error.details.map(key => {
        errors.push({ message: key.message })
      })
      res.status(403).json({ message: "validation Error", errors })
    } else {
      next()
    }
  }
}
export const validation1 = (schema) => {
  return (req, res, next) => {
    const data = { ...req.body, ...req.params, ...req.query }
    const results = schema.validate(data, { abortEarly: false });
    if (results.error) {
      const errorMessage = results.error.details.map((obj) => obj.message)
      return next(new Error(errorMessage, { cause: 400 }));
    }
    return next()
  };
};
// validation.middleware.js
export const isValidObjectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message("Invalid ObjectId");
  }
  return true;
};



export const generalField = {
  userName: Joi.string().min(3).max(30).trim(),

  email: Joi.string().email().required(),

  password: Joi.string().required(),

  confirmpassword: Joi.any().valid(Joi.ref("password")),

  phoneNumber: Joi.string().pattern(/^\+?\d{10,15}$/),

  role: Joi.string().valid(...Object.values(rolesType)).optional(),
  gender: Joi.string().valid(),
  ///objectId
  id: Joi.custom((value, helpers) => {
    if (value > 20) return true;
    return helpers.message("id must be less than 20")
  })

}



export const orderValidationMiddleware = (req, res, next) => {
  const validation = orderValidationSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    return res.status(400).json({
      errors: validation.error.details.map(err => err.message)
    })
  }
  next();
}

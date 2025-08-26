import Joi from "joi";

const orderValidationSchema = Joi.object({
    shippingAddress: Joi.string().trim().min(5).required().messages({
        "string.empty": "Shipping address is required",
        "string.min": "Shipping address must be at least 5 characters long"
    }),

    items: Joi.forbidden().messages({
        "any.unknown": "You cannot provide items manually, they will be taken from your cart"
    }),

    totalPrice: Joi.forbidden().messages({
        "any.unknown": "You cannot provide totalPrice manually, it will be calculated automatically"
    }),

    status: Joi.string()
        .valid("pending", "shipped", "delivered", "canceled")
        .default("pending")
        .messages({
            "any.only": "Status must be one of: pending, shipped, delivered, canceled"
        })
});

export default orderValidationSchema;
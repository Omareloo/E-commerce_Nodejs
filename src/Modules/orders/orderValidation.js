import Joi from "joi";

const orderValidationSchema = Joi.object({
    shippingAddress: Joi.string().trim().min(5).required().messages({
        "string.empty": "Shipping address is required",
        "string.min": "Shipping address must be at least 5 characters long"
    }),

    items: Joi.array().items(
        Joi.object({
            productId: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required()
                .messages({
                    "string.pattern.base": "Invalid productId format",
                    "string.empty": "ProductId is required"
                }),
            quantity: Joi.number().integer().min(1).required().messages({
                "number.base": "Quantity must be a number",
                "number.min": "Quantity must be at least 1",
                "any.required": "Quantity is required"
            }),
            price: Joi.number().min(0).required().messages({
                "number.base": "Price must be a number",
                "number.min": "Price cannot be negative",
                "any.required": "Price is required"
            })
        })
    ).min(1).required().messages({
        "array.min": "Order must have at least one item",
        "array.base": "Items must be an array"
    }),

    totalPrice: Joi.number().min(0).required().messages({
        "number.base": "Total price must be a number",
        "number.min": "Total price cannot be negative",
        "any.required": "Total price is required"
    }),

    status: Joi.string().valid("pending", "shipped", "delivered", "canceled").default("pending")
});

export default orderValidationSchema;
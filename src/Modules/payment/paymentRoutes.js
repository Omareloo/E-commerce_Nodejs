import express from "express";
import bodyParser from "body-parser";
import { createPayment, confirmPayment, handleWebhook } from "./paymentController.js";
import { authuntcation } from "../../MiddleWare/auth.middleware.js";

const paymentRouter = express.Router();

paymentRouter.post("/create", authuntcation, createPayment);


paymentRouter.post("/confirm", confirmPayment);

paymentRouter.post("/webhook", bodyParser.raw({ type: "application/json" }), handleWebhook);

export default paymentRouter;

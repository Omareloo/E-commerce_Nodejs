import express from "express";
import bodyParser from "body-parser";
import { createPayment, handleWebhook } from "./paymentController.js";

const paymentRouter = express.Router();

paymentRouter.post("/create", createPayment);

paymentRouter.post("/webhook", bodyParser.raw({ type: "application/json" }), handleWebhook);

export default paymentRouter;



/*
import express from "express";
import bodyParser from "body-parser";
import { createPayment, handleWebhook } from "./paymentController.js";
import { authuntcation } from "../../MiddleWare/auth.middleware.js";

const paymentRouter = express.Router();

paymentRouter.post("/create", authuntcation, createPayment);

// webhook يستخدم bodyParser.raw
paymentRouter.post("/webhook", bodyParser.raw({ type: "application/json" }), handleWebhook);

export default paymentRouter;

*/
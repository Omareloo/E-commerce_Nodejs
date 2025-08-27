import 'dotenv/config';
import Stripe from "stripe";
import Payment from "../../../DataBase/models/paymentModel.js";
import Order from "../../../DataBase/models/orderModel.js";
import CatchError from "../../utils/CatchAyncError.js";
import { AppError } from "../../utils/CreateError.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPayment = CatchError(async (req, res, next) => {
  const userObjId = req.user._id;

  const order = await Order.findOne({ userId: userObjId, status: "pending" });
  if (!order) return next(new AppError("No pending order found", 404));

  const orderObjId = order._id;
  const amount = order.totalPrice;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: "usd",
    metadata: { orderId: orderObjId.toString(), userId: userObjId.toString() },
    automatic_payment_methods: { enabled: true, allow_redirects: "never" }
  });

  const payment = await Payment.create({
    userId: userObjId,
    orderId: orderObjId,
    amount,
    currency: "usd",
    status: "pending",
    stripePaymentIntentId: paymentIntent.id
  });

  console.log("PaymentIntent created:", paymentIntent.id);

  res.status(201).json({
    message: "PaymentIntent created successfully",
    clientSecret: paymentIntent.client_secret,
    payment
  });
});

export const confirmPayment = CatchError(async (req, res, next) => {
  const { paymentIntentId, paymentMethodId } = req.body;
  if (!paymentIntentId || !paymentMethodId) {
    return next(new AppError("paymentIntentId and paymentMethodId are required", 400));
  }

  const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
    payment_method: paymentMethodId
  });

  await Payment.findOneAndUpdate(
    { stripePaymentIntentId: paymentIntent.id },
    { status: paymentIntent.status },
    { new: true }
  );

  res.json({ message: "Payment confirmed successfully", payment: paymentIntent });
});

export const handleWebhook = CatchError(async (req, res, next) => {
  const event = req.body;

  switch(event.type) {
    case "payment_intent.succeeded":
      await Payment.findOneAndUpdate(
        { stripePaymentIntentId: event.data.object.id },
        { status: "succeeded" }
      );
      break;

    case "payment_intent.payment_failed":
      await Payment.findOneAndUpdate(
        { stripePaymentIntentId: event.data.object.id },
        { status: "failed" }
      );
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

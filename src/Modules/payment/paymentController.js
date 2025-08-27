import 'dotenv/config';
import Stripe from "stripe";
import Payment from "../../../DataBase/models/paymentModel.js";
import mongoose from "mongoose";
import Order from "../../../DataBase/models/orderModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPayment = async (req, res, next) => {
  try {
    const { orderId, userId } = req.body;

    // تحقق من صحة IDs
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ error: "Invalid userId or orderId" });
    }

    const userObjId = new mongoose.Types.ObjectId(userId);
    const orderObjId = new mongoose.Types.ObjectId(orderId);

    // جلب الأوردر من الداتا بيز
    const order = await Order.findOne({ _id: orderObjId, userId: userObjId });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // الـ amount يتحسب من الأوردر
    const amount = order.totalPrice;

    // إنشاء PaymentIntent في Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // بالـ cents
      currency: "usd",
      metadata: { orderId, userId },
      automatic_payment_methods: { enabled: true }
    });

    // حفظ الدفع في الـ database
    const payment = await Payment.create({
      userId: userObjId,
      orderId: orderObjId,
      amount,
      currency: "usd",
      status: "pending",
      stripePaymentIntentId: paymentIntent.id
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      payment
    });

  } catch (err) {
    next(err);
  }
};

export const handleWebhook = async (req, res) => {
  let event;

  try {
    event = req.body;
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    await Payment.findOneAndUpdate(
      { stripePaymentIntentId: paymentIntent.id },
      { status: "succeeded" }
    );
  }

  if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object;
    await Payment.findOneAndUpdate(
      { stripePaymentIntentId: paymentIntent.id },
      { status: "failed" }
    );
  }

  res.json({ received: true });
};


/*


import 'dotenv/config';
import Stripe from "stripe";
import Payment from "../../../DataBase/models/paymentModel.js";
import mongoose from "mongoose";
import Order from "../../../DataBase/models/orderModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPayment = async (req, res, next) => {
  try {   

    const userObjId = req.user._id;

    const order = await Order.findOne({ userId: userObjId, status: "pending" });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const orderObjId = order._id;
    const amount = order.totalPrice; 

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      metadata: { orderId: orderObjId.toString(), userId: userObjId.toString() },
      automatic_payment_methods: { enabled: true }
    });

    const payment = await Payment.create({
      userId: userObjId,
      orderId: orderObjId,
      amount,
      currency: "usd",
      status: "pending",
      stripePaymentIntentId: paymentIntent.id
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      payment
    });

  } catch (err) {
    next(err);
  }
};


export const handleWebhook = async (req, res) => {
  let event;

  try {
    event = req.body;
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    await Payment.findOneAndUpdate(
      { stripePaymentIntentId: paymentIntent.id },
      { status: "succeeded" }
    );
  }

  if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object;
    await Payment.findOneAndUpdate(
      { stripePaymentIntentId: paymentIntent.id },
      { status: "failed" }
    );
  }

  res.json({ received: true });
};

*/

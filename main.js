import express from "express";
import paymentRouter from "./Modules/payment/paymentRoutes.js";
import dotenv from "dotenv";
import connectDB from "./DataBase/db_connection.js";

dotenv.config();

const app = express();

// Connect to MongoDB قبل أي route
connectDB().then(() => {
    console.log("MongoDB connected, starting server...");

    app.use(express.json());
    app.use("/payments", paymentRouter);

    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
});

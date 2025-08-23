import express from "express";
import paymentRouter from "./src/Modules/payment/paymentRoutes.js";
import dotenv from "dotenv";
import connectDB from "./src/DataBase/db_connection.js";
import { GlobalHandling } from "./src/utils/error-handling/globalMiddelwareHandling.js";
import { AppError } from "./src/utils/error-handling/CreateError.js";
dotenv.config();
const post = process.env.PORT || 4000
const app = express();
connectDB()
    app.use(express.json());
    app.use(`${process.env.BASEURL}/payments`, paymentRouter);
app.use((req, res, next) => {
  next(new AppError("Invalid URL: " + req.originalUrl, 404));
});

//handel all error
app.use(GlobalHandling)
    app.listen(post, () => {
        console.log("Server is running on port 4000");
    });


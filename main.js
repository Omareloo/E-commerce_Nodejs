import express from "express";
import paymentRouter from "./src/Modules/payment/paymentRoutes.js";
import dotenv from "dotenv";
import connectDB from "./DataBase/db_connection.js";
import { GlobalHandling } from "./src/utils/globalMiddelwareHandling.js";
import { AppError } from "./src/utils/CreateError.js";
import categoryRouter from "./src/Modules/categories/categoryRoutes.js";
import morgan from "morgan";
import subcategoryRouter from "./src/Modules/subCategories/subCategories.router.js";
import BrandRouter from "./src/Modules/Brand/Brand,router.js";
import productRouter from "./src/Modules/product/product.routes.js";
import path from "path";

dotenv.config();
const port = process.env.PORT || 4000;
const app = express();
connectDB();

app.use(express.json());
app.use(morgan("dev"));

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(`${process.env.BASEURL}/Categories`, categoryRouter);
app.use(`${process.env.BASEURL}/subCategories`, subcategoryRouter);
app.use(`${process.env.BASEURL}/Brands`, BrandRouter);
app.use(`${process.env.BASEURL}/Products`, productRouter);
app.use(`${process.env.BASEURL}/payments`, paymentRouter);

app.use((req, res, next) => {
  next(new AppError("Invalid URL: " + req.originalUrl, 404));
});

app.use(GlobalHandling);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

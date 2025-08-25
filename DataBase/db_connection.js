import mongoose from "mongoose";
import 'dotenv/config';

const connectDB = async () => {
  mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));
};


 
 

export default connectDB;

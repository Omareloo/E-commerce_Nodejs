
import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      minLength: [2, "this name is short"],
      unique: [true, "this name must be unique"]
    },
    image: String,
    slug: {
      type: String,
      required: [true, "slug is required"],
      trim: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Category", CategorySchema);


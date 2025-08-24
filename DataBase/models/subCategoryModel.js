import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      minLength: [2, "this name is short"],
      unique: [true, "this name must be unique"]
    },
   Category:{
type:mongoose.Types.ObjectId,
    ref: "Category",
   required: [true, "category id is required"],
   },
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

export default mongoose.model("SubCategory", SubCategorySchema);

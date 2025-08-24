import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
      minLength: [2, "this title is short"],
      unique: [true, "this title must be unique"],
    },
    price: {
      type: Number,
      min: 0,
      required: [true, "price is required"],
    },
    priceAfterDiscount: {
      type: Number,
      min: 0,
    },
    ratingAvg: {
      type: Number,
      min: [1, "rate must be greater than 1"],
      max: [5, "rate must be lower than 5"],
    },
    ratingCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    quantity: {
      type: Number,
      default: 0,
      min: 0,
      required: [true, "quantity is required"],
    },
    sold: {
      type: Number,
      default: 0,
      min: 0,
    },
    imageCover: String,
    images: [String],
    description: {
      type:String,
      required: [true, "description is required"],
      trim: true,
      minLength: [2, "this description is short"],
      maxLength: [300, "this description  must be lower than 300"],
      unique: [true, "this description must be unique"],
    },
    Catergory: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: [true, "category id is required"],
    },
    SubCatergory: {
      type: mongoose.Types.ObjectId,
      ref: "subCategory",
      required: [true, "subCategory id is required"],
    },
    slug: {
      type: String,
      required: [true, "slug is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);

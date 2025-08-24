import categoryModel from "../../../DataBase/models/category.Model.js";
import { AppError } from "../../utils/CreateError.js";
import CatchError from "./../../utils/CatchAyncError.js";
import slugify from "slugify";
const addCategory = CatchError(async (req, res, next) => {
  const { name } = req.body;
  const result = new categoryModel({ name, slug: slugify(name) });
  await result.save();
  res.json({ message: "add", result });
});
const getCategories = CatchError(async (req, res, next) => {
  const Categories = await categoryModel.find();
  if (Categories.length === 0)
    return next(new AppError("thier are no categoreis yet"));
  res.json({ message: "Success", Categories });
});
const getCategoryByID = CatchError(async (req, res, next) => {
  const { id } = req.params;
  const Category = await categoryModel.findById(id);
  !Category && next(new AppError("can not find category"));
  Category && res.json({ message: "Success", Category });
});
const updateCetCategory = CatchError(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const Category = await categoryModel.findByIdAndUpdate(
    id,
    { name, slug: slugify(name) },
    { new: true }
  );
  !Category && next(new AppError("can not find category"));
  Category && res.json({ message: "Success", Category });
});
const deleteCategory = CatchError(async (req, res, next) => {
  const { id } = req.params;
  const Category = await categoryModel.findByIdAndDelete(id);
  !Category && next(new AppError("can not find category"));
  Category && res.json({ message: "Success Categories was deleted" });
});
export {
  getCategories,
  deleteCategory,
  updateCetCategory,
  getCategoryByID,
  addCategory,
};

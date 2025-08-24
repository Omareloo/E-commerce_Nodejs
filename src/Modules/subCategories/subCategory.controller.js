
import subCategoryModel from "../../../DataBase/models/subCategoryModel.js";
import { AppError } from "../../utils/CreateError.js";
import CatchError from "./../../utils/CatchAyncError.js";
import slugify from "slugify";
const addsubCategory = CatchError(async (req, res, next) => {
  const { name,Category } = req.body;
  const result = new subCategoryModel({ name,Category, slug: slugify(name) });
  await result.save();
  res.json({ message: "add", result });
});
const getsubCategories = CatchError(async (req, res, next) => {
    let filter ={}
    if(req.params.CategoryId){
       filter ={Category:req.params.CategoryId} 
    }
  const results = await subCategoryModel.find(filter);
  if (results.length === 0)
    return next(new AppError("thier are no categoreis yet"));
  res.json({ message: "Success", results });
});
const getsubCategoryByID = CatchError(async (req, res, next) => {
  const { id } = req.params;
  const results = await subCategoryModel.findById(id);
  !results && next(new AppError("can not find subCategory"));
  results && res.json({ message: "Success", results });
});
const updatesubCetCategory = CatchError(async (req, res, next) => {
  const { id } = req.params;
  const { name,Category } = req.body;
  const results = await subCategoryModel.findByIdAndUpdate(
    id,
    { name,Category ,slug: slugify(name) },
    { new: true }
  );
  !results && next(new AppError("can not find subCategory"));
  results && res.json({ message: "Success", results });
});
const deletesubCategory = CatchError(async (req, res, next) => {
  const { id } = req.params;
  const results = await subCategoryModel.findByIdAndDelete(id);
  !results && next(new AppError("can not find subCategory"));
  results && res.json({ message: "Success subCategory was deleted" });
});
export {
  getsubCategories,
  deletesubCategory,
  updatesubCetCategory,
  getsubCategoryByID,
  addsubCategory,
};

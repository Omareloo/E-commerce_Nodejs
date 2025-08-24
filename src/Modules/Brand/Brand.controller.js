
import brandModel from "../../../DataBase/models/brand,Model.js";
import { AppError } from "../../utils/CreateError.js";
import CatchError from "./../../utils/CatchAyncError.js";
import slugify from "slugify";

const addBrand = CatchError(async (req, res, next) => {
  const { name } = req.body;
  const result = new brandModel({ name, slug: slugify(name) });
  await result.save();
  res.json({ message: "add", result });
});
const getBrands = CatchError(async (req, res, next) => {
  const results = await brandModel.find();
  if (results.length === 0)
    return next(new AppError("thier are no Brands yet"));
  res.json({ message: "Success", results });
});
const getBrandByID = CatchError(async (req, res, next) => {
  const { id } = req.params;
  const results = await brandModel.findById(id);
  !results && next(new AppError("can not find Brand"));
  results && res.json({ message: "Success", results });
});
const updateCetBrand = CatchError(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const results = await brandModel.findByIdAndUpdate(
    id,
    { name, slug: slugify(name) },
    { new: true }
  );
  !results && next(new AppError("can not find Brand"));
  results && res.json({ message: "Success", results });
});
const deleteBrand = CatchError(async (req, res, next) => {
  const { id } = req.params;
  const results = await brandModel.findByIdAndDelete(id);
  !results && next(new AppError("can not find Brand"));
  results && res.json({ message: "Success Brand was deleted" });
});
export {
  getBrands,
  deleteBrand,
  updateCetBrand,
  getBrandByID,
  addBrand,
};

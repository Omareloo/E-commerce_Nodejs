import poductModel from "../../../DataBase/models/product.Model.js";
import { AppError } from "../../utils/CreateError.js";
import CatchError from "./../../utils/CatchAyncError.js";
import slugify from "slugify";

const addproduct = CatchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  if (req.file) {
    req.body.image = req.file.filename;
  } else {
    return next(new AppError("Product image is required"));
  }
  const result = new poductModel(req.body);
  await result.save();
  res.status(201).json({ message: "Product added successfully", result });
});


const getproducts = CatchError(async (req, res, next) => {
  // ضربناها فى 1 علشان تتحول لرقم علشان هى استرنج

  /// pagination
  let page = req.query.page * 1 || 1;
  let limit = 5;
  if (req.query.page <= 0) {
    page = 1;
  }
  let skip = (page - 1) * 5;
  // filteration
  let filter = { ...req.query };
  let optionDelete = ["sort", "page", "keyword", "fields"];
  optionDelete.forEach((item) => {
    delete filter[item];
  });
  //bulid quary
  // sort الاكثر مبيعا
  //search by keyword
  let exctionQuary = poductModel.find(filter).skip(skip).limit(limit);
  if (req.query.sort) {
    exctionQuary = exctionQuary.sort(req.query.sort);
  }
  if (req.query.keyword) {

    exctionQuary = exctionQuary.find({
      $or: [
        //regex علشان يبحث ف النصوص
        // options no senstive
        { title: { $regex: req.query.keyword, $options: "i" } },
        { description: { $regex: req.query.keyword, $options: "i" } },
      ],
    });
  }
  //select fields
  if (req.query.fields) {
    let fields = req.query.fields.split(",").join(" ");
    exctionQuary = exctionQuary.select(fields);
  }
  //excute quary
  const results = await exctionQuary;
  if (results.length === 0)
    return next(new AppError("thier are no products yet"));
  res.json({ message: "Success", page, limit, results });
});
const getproductByID = CatchError(async (req, res, next) => {
  const { id } = req.params;
  const results = await poductModel.findById(id);
  !results && next(new AppError("can not find product"));
  results && res.json({ message: "Success", results });
});
const updateCetproduct = CatchError(async (req, res, next) => {
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  const { id } = req.params;
  const results = await poductModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !results && next(new AppError("can not find product"));
  results && res.json({ message: "Success", results });
});
const deleteproduct = CatchError(async (req, res, next) => {
  const { id } = req.params;
  const results = await poductModel.findByIdAndDelete(id);
  !results && next(new AppError("can not find product"));
  results && res.json({ message: "Success product was deleted" });
});
export {
  getproducts,
  deleteproduct,
  updateCetproduct,
  getproductByID,
  addproduct,
};

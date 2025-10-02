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
  // pagination
  let page = req.query.page * 1 || 1;
  let limit = 5;
  if (req.query.page <= 0) page = 1;
  let skip = (page - 1) * limit;

  // filteration
  let filter = { ...req.query };
  ["sort", "page", "keyword", "fields"].forEach((item) => delete filter[item]);

  // build query
  let query = poductModel.find(filter);

  // search by keyword
  if (req.query.keyword) {
    query = query.find({
      $or: [
        { title: { $regex: req.query.keyword, $options: "i" } },
        { description: { $regex: req.query.keyword, $options: "i" } },
      ],
    });
  }

  // count documents before applying skip/limit
  const total = await poductModel.countDocuments(query.getFilter());
  const totalPages = Math.ceil(total / limit);

  // sort
  if (req.query.sort) query = query.sort(req.query.sort);

  // select fields
  if (req.query.fields) {
    let fields = req.query.fields.split(",").join(" ");
    query = query.select(fields);
  }

  // pagination
  query = query.skip(skip).limit(limit);

  // populate category & subcategory
  query = query
    .populate("Category", "name")
    .populate("SubCategory", "name");

  // execute query
  const results = await query;
  if (results.length === 0)
    return next(new AppError("There are no products yet", 404));

  res.json({
    message: "Success",
    page,
    limit,
    total,
    totalPages,
    results,
  });
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
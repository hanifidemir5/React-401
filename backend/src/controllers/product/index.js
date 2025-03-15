import Product from "../../models/Product.js";
import Boom from "boom";
import ProductSchema from "./validations.js";

const Create = async (req, res, next) => {
  const input = req.body;
  console.log(input);

  const { error } = ProductSchema.validate(input);
  if (error) {
    return next(Boom.badRequest(error.details[0].message));
  }

  try {
    if (input.photos) {
      input.photos = JSON.parse(input.photos);
    }
    const product = new Product(input);
    const savedData = await product.save();
    res.json(savedData);
  } catch (e) {
    next(e);
  }
};

const GetList = async (req, res, next) => {
  let { page } = req.query;

  const limit = 12;
  const skip = parseInt(page) * limit;

  try {
    const products = await Product.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit);
    res.json(products);
  } catch (e) {
    next(e);
  }
};

const Get = async (req, res, next) => {
  let { product_id } = req.params;

  if (!product_id) {
    return next(Boom.badRequest("Missing parameter (:product_id)"));
  }

  try {
    const product = await Product.findById(product_id);
    res.json(product);
  } catch (e) {
    next(e);
  }
};

const Delete = async (req, res, next) => {
  const { product_id } = req.params;

  if (!product_id) {
    return next(Boom.badRequest("Missing parameter (:product_id)"));
  }

  try {
    const deleted = await Product.findByIdAndDelete(product_id);

    if (!deleted) {
      throw Boom.badRequest("Product not fount.");
    }

    res.json(deleted);
  } catch (e) {
    next(e);
  }
};

const Update = async (req, res, next) => {
  const { product_id } = req.params; // Correctly extract product_id

  try {
    const updated = await Product.findByIdAndUpdate(product_id, req.body, {
      new: true, // Returns the updated document
      runValidators: true, // Ensures validation rules are applied
    });

    if (!updated) {
      return res.status(404).json({ message: "Product not found" }); // Handle case where product doesn't exist
    }

    res.json(updated);
  } catch (e) {
    console.log("error", e);
    next(e);
  }
};

export default { Create, Get, GetList, Delete, Update };

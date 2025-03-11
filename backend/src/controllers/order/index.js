import Order from "../../models/Order.js";
import Boom from "boom";
import { validateOrder } from "./validations.js";
import Product from "../../models/Product.js";
import mongoose from "mongoose";
import User from "../../models/User.js";

const Create = async (req, res, next) => {
  const input = req.body;
  input.items = input.items ? JSON.parse(input.items) : null;
  const { error } = validateOrder(input);

  if (error) {
    return next(Boom.badRequest(error.details[0].message));
  }
  const user_id = new mongoose.Types.ObjectId(req.payload._id);
  const user = await User.findById(user_id);

  if (!user) {
    return next(Boom.notFound("User not found"));
  }

  const objectIds = input.items.map((id) => new mongoose.Types.ObjectId(id));

  try {
    const products = await Product.find({ _id: { $in: objectIds } });

    const orderItems = products.map((product) => ({
      product: product._id,
      price: product.price,
    }));

    const totalAmount = orderItems.reduce((sum, item) => sum + item.price, 0);

    const order = new Order({
      user: user_id,
      address: input.address,
      items: orderItems,
      totalAmount: totalAmount,
    });
    console.log(order);

    const savedData = await order.save();

    res.json(savedData);
  } catch (e) {
    next(e);
  }
};

const List = async (req, res, next) => {
  let { page } = req.query;

  const limit = 4;
  const skip = parseInt(page) * limit;

  try {
    const orders = await Order.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit);
    res.json(orders);
  } catch (e) {
    next(e);
  }
};

const Get = async (req, res, next) => {
  let { order_id } = req.params;

  if (!order_id) {
    return next(Boom.badRequest("Missing parameter (:order_id)"));
  }

  try {
    const order = await order.findById(order_id);
    res.json(order);
  } catch (e) {
    next(e);
  }
};

const Update = async (req, res, next) => {
  let { order_id } = req.params;

  if (!order_id) {
    return next(Boom.badRequest("Missing parameter (:order_id)"));
  }

  try {
    const updated = await Order.findByIdAndUpdate(order_id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (e) {
    next(e);
  }
};

const Delete = async (req, res, next) => {
  const { order_id } = req.params;

  if (!order_id) {
    return next(Boom.badRequest("Missing parameter (:order_id)"));
  }

  try {
    const deleted = await order.findByIdAndDelete(order_id);

    if (!deleted) {
      throw Boom.badRequest("order not fount.");
    }

    res.json(deleted);
  } catch (e) {
    next(e);
  }
};

export default { Create, Delete, Get, List, Update };

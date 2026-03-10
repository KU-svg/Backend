const Order = require("../models/orderModel");

exports.getAll = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("user").populate("products.product");
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user")
      .populate("products.product");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const order = await Order.create({
      user: req.body.userId,
      products: req.body.products || [],
      totalAmount: req.body.totalAmount
    });
    const populated = await order.populate("user").then((doc) =>
      doc.populate("products.product")
    );
    res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        user: req.body.userId,
        products: req.body.products,
        totalAmount: req.body.totalAmount
      },
      { new: true, runValidators: true }
    )
      .populate("user")
      .populate("products.product");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const Cart = require("../models/cartModel");

exports.getAll = async (req, res, next) => {
  try {
    const carts = await Cart.find().populate("user").populate("products.product");
    res.json(carts);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const cart = await Cart.findById(req.params.id)
      .populate("user")
      .populate("products.product");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const cart = await Cart.create({
      user: req.body.userId,
      products: req.body.products || []
    });
    const populated = await cart.populate("user").then((doc) =>
      doc.populate("products.product")
    );
    res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        user: req.body.userId,
        products: req.body.products
      },
      { new: true, runValidators: true }
    )
      .populate("user")
      .populate("products.product");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json(cart);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

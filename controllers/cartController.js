const store = require("../data/store");

exports.getAll = (req, res) => {
  res.json(store.carts);
};

exports.create = (req, res, next) => {
  try {
    const cart = {
      id: Date.now(),
      userId: req.body.userId,
      products: req.body.products || []
    };
    store.carts.push(cart);
    res.status(201).json(cart);
  } catch (err) {
    next(err);
  }
};
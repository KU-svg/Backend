const store = require("../data/store");

exports.getAll = (req, res) => {
  res.json(store.orders);
};

exports.create = (req, res, next) => {
  try {
    const order = {
      id: Date.now(),
      userId: req.body.userId,
      products: req.body.products || [],
      totalAmount: req.body.totalAmount
    };
    store.orders.push(order);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};
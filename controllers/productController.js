const store = require("../data/store");

exports.getAll = (req, res) => {
  res.json(store.products);
};

exports.create = (req, res, next) => {
  try {
    const product = {
      id: Date.now(),
      name: req.body.name,
      price: req.body.price
    };
    store.products.push(product);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};
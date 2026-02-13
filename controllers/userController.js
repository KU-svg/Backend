const store = require("../data/store");

exports.getAll = (req, res) => {
  res.json(store.users);
};

exports.create = (req, res, next) => {
  try {
    const user = {
      id: Date.now(),
      name: req.body.name,
      email: req.body.email
    };
    store.users.push(user);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};
const express = require("express");
const { body } = require("express-validator");
const { getAll, create } = require("../controllers/productController");
const validationMiddleware = require("../middleware/validationMiddleware");

const router = express.Router();

router.get("/", getAll);

router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("price").isNumeric().withMessage("Price must be a number")
  ],
  validationMiddleware,
  create
);

module.exports = router;
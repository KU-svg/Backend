const express = require("express");
const { body } = require("express-validator");
const {
  getAll,
  getById,
  create,
  update,
  remove
} = require("../controllers/productController");
const validationMiddleware = require("../middleware/validationMiddleware");

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);

router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("price").isNumeric().withMessage("Price must be a number")
  ],
  validationMiddleware,
  create
);

router.put(
  "/:id",
  [
    body("name").optional().notEmpty().withMessage("Name is required"),
    body("price")
      .optional()
      .isNumeric()
      .withMessage("Price must be a number")
  ],
  validationMiddleware,
  update
);

router.delete("/:id", remove);

module.exports = router;

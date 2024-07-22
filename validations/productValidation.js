// userValidator.js
const { body } = require("express-validator");

const createProductValidationRule = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("name is required"),
    body("price")
      .notEmpty()
      .withMessage("price is required")
      .isInt({ min: 0 })
      .withMessage("Invalid price"),
    body("stock")
      .notEmpty()
      .withMessage("stock is required")
      .isInt({ min: 0 })
      .withMessage("Invalid stock"),
    body("description")
      .notEmpty()
      .withMessage("description is required"),
    body("brand_id").optional({ nullable: true }).isInt().withMessage("Invalid brand_id"),
    body("merchant_id")
    .notEmpty()
    .withMessage("merchant_id is required")
    .isInt({ min: 0 })
    .withMessage("Invalid merchant_id"),
  ];
};

const updateProductValidationRule = () => {
  return [
    body("price").isInt({ min: 0 }).withMessage("Invalid price"),
    body("stock").isInt({ min: 0 }).withMessage("Invalid stock"),
    body("brand_id").optional({ nullable: true }).isInt().withMessage("Invalid brand_id"),
  ];
};

module.exports = {
  createProductValidationRule,
  updateProductValidationRule,
};

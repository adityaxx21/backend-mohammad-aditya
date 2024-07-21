// userValidator.js
const { body } = require("express-validator");

const createTransactionValidationRule = () => {
  return [
    body("shipping_cost")
      .notEmpty()
      .withMessage("shipping_cost is required")
      .isInt({ min: 0 })
      .withMessage("Invalid shipping_cost"),
    body("gross_amount")
      .notEmpty()
      .withMessage("gross_amount is required")
      .isInt({ min: 0 })
      .withMessage("Invalid gross_amount"),
    body("product_cost")
      .notEmpty()
      .withMessage("product_cost is required")
      .isInt({ min: 0 })
      .withMessage("Invalid product_cost"),
    body("total")
      .notEmpty()
      .withMessage("total is required")
      .isInt({ min: 0 })
      .withMessage("Invalid total"),
    body("product_id")
      .notEmpty()
      .withMessage("product_id is required")
      .isInt({ min: 0 })
      .withMessage("Invalid product_id"),
  ];
};

module.exports = {
  createTransactionValidationRule,
};

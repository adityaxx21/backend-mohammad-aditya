const { body } = require("express-validator");

const createuserValidationRule = () => {
  return [
    body("fullname").notEmpty().withMessage("fullname is required"),
    body("address").notEmpty().withMessage("address is required"),
    body("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("Invalid email"),
    body("password")
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 10 })
      .withMessage("password cannot less than 10 character"),
    body("role")
      .notEmpty()
      .withMessage("role is required")
      .matches(/\b(?:admin|user)\b/)
      .withMessage("role must be either 'admin' or 'user'"),
  ];
};

const loginuserValidationRule = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("Invalid email"),
    body("password")
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 10 })
      .withMessage("password cannot less than 10 character"),
  ];
};

module.exports = {
  createuserValidationRule,
  loginuserValidationRule
};

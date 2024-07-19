// userValidator.js
const { body } = require('express-validator');

const createMerchantValidationRule = () => {
  return [
    body('name').notEmpty().withMessage('name is required').isAlphanumeric().withMessage("Invalid name"),
    body('description').notEmpty().withMessage('description is required').isAlphanumeric().withMessage("Invalid description"),
    body('address').notEmpty().withMessage('address is required').isAlphanumeric().withMessage("Invalid address"),
    body('revenue').optional({ nullable: true }).isInt({ min:0}).withMessage('Value must be numeric'),
  ];
};

const updateMerchantValidationRule = () => {
    return [
      body('name').isAlphanumeric().withMessage("Invalid name"),
      body('revenue').optional({ nullable: true }).isInt({ min:0}).withMessage("Invalid revenue"),
      body('description').isAlphanumeric().withMessage("Invalid description"),
      body('address').isAlphanumeric().withMessage("Invalid address"),
    ];
  };

module.exports = {
  createMerchantValidationRule,
  updateMerchantValidationRule,
};

// userValidator.js
const { body } = require('express-validator');

const createMerchantValidationRule = () => {
  return [
    body('name').notEmpty().withMessage('name is required'),
    body('description').notEmpty().withMessage('description is required'),
    body('address').notEmpty().withMessage('address is required'),
    body('revenue').optional({ nullable: true }).isInt({ min:0}).withMessage('Value must be numeric'),
  ];
};

const updateMerchantValidationRule = () => {
    return [
      body('name'),
      body('revenue').optional({ nullable: true }).isInt({ min:0}).withMessage("Invalid revenue"),
      body('description'),
      body('address'),
    ];
  };

module.exports = {
  createMerchantValidationRule,
  updateMerchantValidationRule,
};

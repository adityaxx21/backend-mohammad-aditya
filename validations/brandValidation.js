const { body } = require('express-validator');

const createbrandValidationRule = () => {
  return [
    body('name').notEmpty().withMessage('name is required').isAlphanumeric().withMessage("Invalid name"),
    body('description').notEmpty().withMessage('description is required').isAlphanumeric().withMessage("Invalid description"),
  ];
};


module.exports = {
  createbrandValidationRule,
};

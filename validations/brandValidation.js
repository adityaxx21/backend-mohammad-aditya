const { body } = require('express-validator');

const createbrandValidationRule = () => {
  return [
    body('name').notEmpty().withMessage('name is required'),
    body('description').notEmpty().withMessage('description is required'),
  ];
};


module.exports = {
  createbrandValidationRule,
};

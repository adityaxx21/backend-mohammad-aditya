const express = require("express");
const router = express.Router();

const transaction = require("../controllers/transactionController");
const validation = require("../validations/transactionValidation");

// const validation = require("../validations/productValidation");
// const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/", transaction.getTransactionsController);
router.get("/:id", transaction.getTransactionController);
router.post(
  "/",
  validation.createTransactionValidationRule(),
  transaction.createTransactionController
);

module.exports = router;

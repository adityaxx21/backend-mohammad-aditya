const express = require("express");
const router = express.Router();

const product = require("../controllers/productController");

const validation = require("../validations/productValidation");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/", product.getProductsController);
router.get("/:id", product.getProductController);
router.put(
  "/:id",
  adminMiddleware,
  validation.updateProductValidationRule(),
  product.updateProductController
);
router.post(
  "/",
  adminMiddleware,
  validation.createProductValidationRule(),
  product.createProductController
);
router.delete("/:id", adminMiddleware, product.deleteProductController);

module.exports = router;

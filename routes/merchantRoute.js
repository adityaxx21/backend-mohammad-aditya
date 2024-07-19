const express = require("express");
const router = express.Router();

const merchant = require("../controllers/merchantController");

const validation = require("../validations/merchantValidation");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/", merchant.getMerchantsController);
router.get("/:id", merchant.getMerchantController);
router.put(
  "/:id",
  adminMiddleware,
  validation.updateMerchantValidationRule(),
  merchant.updateMerchantController
);
router.post(
  "/",
  adminMiddleware,
  validation.createMerchantValidationRule(),
  merchant.createMerchantController
);
router.delete("/:id", adminMiddleware, merchant.deleteMerchantController);

module.exports = router;

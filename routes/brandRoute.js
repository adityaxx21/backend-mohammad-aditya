const express = require("express");
const router = express.Router();

const brand = require("../controllers/brandController");

const validation = require("../validations/brandValidation");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/", brand.getBrandsController);
router.get("/:id", brand.getBrandController);
// router.put(
//   "/:id",
//   adminMiddleware,
//   brand.updateBrandController
// );
router.post(
  "/",
  adminMiddleware,
  brand.createBrandController
);

module.exports = router;

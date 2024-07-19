const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const user = require("../controllers/userController");
const validation = require("../validations/userValidation");

// Register route
router.post(
  "/register",
  validation.createuserValidationRule(),
  user.registerUserController
);

// Login route
router.post(
  "/login",
  validation.loginuserValidationRule(),
  user.loginUserController
);

// Get current user route
router.get("/current", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;

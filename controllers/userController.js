const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { validationResult } = require("express-validator");
const Response = require("../helpers/helper");

async function registerUserController(req, res) {
  let response;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    response = Response.failedResponse(422, errors.array());
    return res.status(422).json(response);
  }

  const password = req.body.password;

  await bcrypt.hash(password, 10, async function (err, hash) {
    if (err) {
      console.error("Error hashing password:", err);
      // Handle error accordingly
      return;
    }
    req.body.password = hash;
    try {
      await User.createUser(req.body);
      response = Response.successResponse(201, req.body);
    } catch (error) {
      response = Response.failedResponse(500, error.message);
    }
    return res.status(response.statusCode).json(response);
  });
}

async function loginUserController(req, res) {
  let response;
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    response = Response.failedResponse(422, errors.array());
    return res.status(422).json(response);
  }

  const user = await User.getUser(email);

  if (!user) {
    response = Response.failedResponse(400, "Invalid credentials");
    return res.status(response.statusCode).json(response);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    response = Response.failedResponse(400, "Invalid credentials");
    return res.status(response.statusCode).json(response);
  }

  const payload = {
    user: {
      email: user.email,
      role: user.role,
    },
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
  response = Response.successResponse(201, { token: token });
  return res.status(response.statusCode).json(response);
}

module.exports = {
  registerUserController,
  loginUserController,
};

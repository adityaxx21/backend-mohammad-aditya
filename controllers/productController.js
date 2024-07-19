const Product = require("../models/product");
const { successResponse, failedResponse } = require("../helpers/helper");
const { validationResult } = require("express-validator");

async function getProductsController(req, res) {
  const query = await req.query
  const product = await Product.getProducts(query);
  return res.status(200).json(product);
}

async function getProductController(req, res) {
  const id = req.params.id;
  let response;
  const product = await Product.getProduct(id);
  if (product) {
    response = successResponse(200, product);
  } else {
    response = failedResponse(500, "id tidak ada didalam database");
  }

  return res.status(response.statusCode).json(response);
}

async function createProductController(req, res) {
  let response;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    response = failedResponse(422, errors.array());
    return res.status(422).json(response);
  }

  try {
    const product = await Product.createProduct(req.body);
    response = successResponse(201, product);
  } catch (error) {
    response = failedResponse(500, error.message);
  }
  return res.status(response.statusCode).json(response);
}

async function updateProductController(req, res) {
  const id = req.params.id;
  const product = Product.getProduct(id);
  let response;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    response = failedResponse(422, errors.array());
    return res.status(200).json(response);
  }

  try {
    if (product) {
      const update = await Product.updateProduct(id, req.body);
      response = successResponse(200, update);
    } else {
      response = failedResponse(500, "id tidak ada didalam database");
    }
  } catch (error) {
    response = failedResponse(500, error.message);
  }

  return res.status(response.statusCode).json(response);
}

async function deleteProductController(req, res) {
  const id = req.params.id;
  const product = await Product.getProduct(id);
  let response;

  try {
    if (product) {
      await Product.deleteProduct(id);
      response = successResponse(204, null);
    } else {
      response = failedResponse(500, "id tidak ada didalam database");
    }
  } catch (error) {
    response = failedResponse(500, error.message);
  }

  return res.status(response.statusCode).json(response);
}

async function getSummaryProductController(req, res) {
  let response;
  try {
    const total = await Product.getSummaryProduct();
    response = successResponse(200, total);
  } catch (error) {
    response = failedResponse(500, error.message);
  }
  return res.status(response.statusCode).json(response);
}

module.exports = {
  getProductsController,
  getProductController,
  createProductController,
  updateProductController,
  deleteProductController,
  getSummaryProductController,
};

const Transaction = require("../models/transaction");
const Product = require("../models/product");

const { successResponse, failedResponse } = require("../helpers/helper");
const { validationResult } = require("express-validator");

// Get Transaction
// role `user` only be able to see their transaction
// role `admin` only be able to see their merchant transaction
async function getTransactionsController(req, res) {
  const query = await req.query;
  let transaction;
  if (req.user.role === "admin") {
    transaction = await Transaction.getAdminTransactions(query, req.user.id);
  } else {
    transaction = await Transaction.getTransactions(query, req.user.id);
  }
  response = successResponse(200, transaction);

  return res.status(response.statusCode).json(response.data);
}

async function getTransactionController(req, res) {
  const id = req.params.id;
  let response;
  let transaction;

  if (req.user.role === "admin") {
    transaction = await Transaction.getAdminTransaction(id, req.user.id);
  } else {
    transaction = await Transaction.getTransaction(id, req.user.id);
  }
  if (transaction) {
    response = successResponse(200, transaction);
  } else {
    response = failedResponse(500, "id unavailable at database");
  }

  return res.status(response.statusCode).json(response);
}

// Create Transaction

// only role `user` can create transaction

// transaction
// reduce stock product after transaction created
// `shipping_cost` shiping price before discount
// `product_cost` product price before discount
// `gross_amount` total shiping + product before discount
// `net_amount` gross_amount - (shipping_discount + product_discount)
// `shipping_discount` amount of shipping discount
// `product_discount` amount of product  discount

async function createTransactionController(req, res) {
  let response;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    response = failedResponse(422, errors.array());
    return res.status(422).json(response);
  }

  const product = await Product.getProduct(req.body.product_id);

  if (!product || product.stock < req.body.total) {
    response = failedResponse(422, "Transaction invalid");
    return res.status(422).json(response);
  }

  const { gross_amount, product_cost, shipping_cost } = req.body;
  const user_id = req.user.id;
  const shipping_discount = gross_amount > 15000 ? shipping_cost : 0;
  const product_discount =
    gross_amount > 50000 ? product_cost - (product_cost * 90) / 100 : 0;
  const net_amount = gross_amount - (shipping_discount + product_discount);

  Object.assign(req.body, {
    shipping_discount: shipping_discount,
    product_discount: product_discount,
    net_amount: net_amount,
    user_id: user_id,
  });

  try {
    const transaction = await Transaction.createTransaction(req.body);

    response = successResponse(201, transaction);
  } catch (error) {
    response = failedResponse(500, error.message);
  }
  return res.status(response.statusCode).json(response);
}

module.exports = {
  getTransactionsController,
  getTransactionController,
  createTransactionController,
};

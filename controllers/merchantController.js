const Merchant = require("../models/merchant");
const { successResponse, failedResponse } = require("../helpers/helper");
const { validationResult } = require("express-validator");

async function getMerchantsController(req, res) {
  const query = await req.query;
  const merchant = await Merchant.getMerchants(query);
  return res.status(200).json(merchant);
}

async function getMerchantController(req, res) {
  const id = req.params.id;
  let response;
  const merchant = await Merchant.getMerchant(id);
  if (merchant) {
    response = successResponse(200, merchant);
  } else {
    response = failedResponse(500, "id tidak ada didalam database");
  }

  return res.status(response.statusCode).json(response);
}

async function createMerchantController(req, res) {
  let response;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    response = failedResponse(422, errors.array());
    return res.status(422).json(response);
  }

  try {
    req.body = { ...req.body, ...{ user_id: req.user.id } };
    const merchant = await Merchant.createMerchant(req.body);
    response = successResponse(201, merchant);
  } catch (error) {
    response = failedResponse(500, error.message);
  }
  return res.status(response.statusCode).json(response);
}

async function updateMerchantController(req, res) {
  const id = req.params.id;
  const merchant = await Merchant.getMerchant(id);
  let response;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    response = failedResponse(422, errors.array());
    return res.status(200).json(response);
  }

  try {
    if (merchant && merchant.user_id == req.user.id) {
      const update = await Merchant.updateMerchant(id, req.body);
      response = successResponse(200, update);
    } else {
      response = failedResponse(500, "id tidak ada didalam database");
    }
  } catch (error) {
    response = failedResponse(500, error.message);
  }

  return res.status(response.statusCode).json(response);
}

async function deleteMerchantController(req, res) {
  const id = req.params.id;
  const merchant = await Merchant.getMerchant(id);
  let response;

  try {
    if (merchant) {
      await Merchant.deleteMerchant(id);
      response = successResponse(204, null);
    } else {
      response = failedResponse(500, "id tidak ada didalam database");
    }
  } catch (error) {
    response = failedResponse(500, error.message);
  }

  return res.status(response.statusCode).json(response);
}

module.exports = {
  getMerchantsController,
  getMerchantController,
  createMerchantController,
  updateMerchantController,
  deleteMerchantController,
};

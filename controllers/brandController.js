const Brand = require("../models/brand");
const { successResponse, failedResponse } = require("../helpers/helper");
const { validationResult } = require("express-validator");


async function createBrandController(req, res) {
    let response;
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      response = failedResponse(422, errors.array());
      return res.status(200).json(response);
    }
  
    try {
      const brand = await Brand.createBrand(req.body);
      response = successResponse(201, brand);
    } catch (error) {
      response = failedResponse(500, error.message);
    }
    return res.status(response.statusCode).json(response);
  }


async function getBrandsController(req, res) {
  const query = await req.query
  const brand = await Brand.getBrands(query);
  return res.status(200).json(brand);
}

async function getBrandController(req, res) {
  const id = req.params.id;
  let response;
  const brand = await Brand.getBrand(id);
  if (brand) {
    response = successResponse(200, brand);
  } else {
    response = failedResponse(500, "id unavailable at database");
  }

  return res.status(response.statusCode).json(response);
}


  module.exports = {
    createBrandController,
    getBrandsController,
    getBrandController
  }
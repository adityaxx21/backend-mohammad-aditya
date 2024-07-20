const { knex } = require("../config");
const { format } = require("date-fns");

async function getProducts(data = null) {
  const {
    limit = 10,
    page = 1,
    name = null,
    merchant_id = null,
    brand_id = null,
  } = data;

  const query = knex("products");

  if (name) {
    query.where("name", "like", `%${name}%`);
  }

  if (merchant_id) {
    query.where("merchant_id", merchant_id);
  }

  if (brand_id) {
    query.where("brand_id", brand_id);
  }

  const products = await query.paginate({
    perPage: limit,
    currentPage: page,
  });

  return products;
}

async function getProduct(id) {
  const products = knex("products").where("id", id).first();
  return products;
}

async function createProduct(data) {
  const params = await data;
  const insertProduct = await knex("products").insert({
    name: params.name,
    price: params.price,
    stock: params.stock,
    description: params.description,
    brand_id: params.brand_id,
    merchant_id: params.merchant_id,
  });
  const product = await knex("products").where("id", insertProduct[0]).first();
  return product;
}

async function updateProduct(id, data) {
  const params = await data;
  const timestamps = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  await knex("products").where("id", id).update({
    name: params.name,
    price: params.price,
    stock: params.stock,
    description: params.description,
    brand_id: params.brand_id,
    updated_at: timestamps,
  });

  const updatedProduct = await knex("products").where("id", id).first();

  return updatedProduct;
}

async function deleteProduct(id) {
  const products = knex("products").where("id", id).del();
  return products;
}

async function getSummaryProduct() {
  const totalProduct = await knex("products").count("id").first();
  return { totalProduct: parseInt(totalProduct.count) };
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getSummaryProduct,
};

const { knex } = require("../config");

async function getProducts(data = null) {
  const { limit = 10, page = 1, name = null } = data;
  const products = knex("products")
    .where(function () {
      if (name !== null) {
        this.whereLike("name", `%${name}%`);
      }
    })
    .paginate({
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
  const product = knex("products")
    .insert({
      name: params.name,
      price: params.price,
      stock: params.stock,
      description: params.description,
      brand_id: params.brand_id,
      merchant_id: params.merchant_id,
    })
    .returning("*");
  return product;
}

async function updateProduct(id, data) {
  const params = await data;
  const timestamps = new Date().toISOString();
  const product = knex("products")
    .where("id", id)
    .update({
      name: params.name,
      price: params.price,
      stock: params.stock,
      description: params.description,
      brand_id: params.brand_id,
      updated_at: timestamps,
    })
    .returning("*");

  return product;
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

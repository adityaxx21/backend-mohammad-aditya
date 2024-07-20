const { knex } = require("../config");

async function createBrand(data) {
  const params = await data;

  const [insertedId] = await knex("brands").insert({
    name: params.name,
    description: params.description,
  });

  const brand = await knex("brands").where("id", insertedId).first();

  return brand;
}
async function getBrands(data = null) {
  const { limit = 10, page = 1, name = null } = data;
  const query = knex("brands");
  if (name) {
    query.where("name", "like", `%${name}%`);
  }

  const brands = await query.paginate({
    perPage: limit,
    currentPage: page,
  });

  return brands;
}

async function getBrand(id) {
  const brands = knex("brands").where("id", id).first();
  return brands;
}

module.exports = {
  createBrand,
  getBrands,
  getBrand,
};

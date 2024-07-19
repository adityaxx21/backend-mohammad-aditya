const { knex } = require("../config");

async function createBrand(data) {
  const params = await data;
  const brand = knex("brands")
    .insert({
      name: params.name,
      description: params.description,
    })
    .returning("*");
  return brand;
}
async function getBrands(data = null) {
  const { limit = 10, page = 1, name = null } = data;
  const brands = knex("brands")
    .where(function () {
      if (name !== null) {
        this.whereLike("name", `%${name}%`);
      }
    })
    .paginate({
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
  getBrand
};

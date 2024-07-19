const { knex } = require("../config");

async function getMerchants(data = null) {
  const { limit = 10, page = 1, name = null } = data;
  const merchants = knex("merchants")
    .where(function () {
      if (name !== null) {
        this.whereLike("name", `%${name}%`);
      }
    })
    .paginate({
      perPage: limit,
      currentPage: page,
    });

  return merchants;
}

async function getMerchant(id) {
  const merchants = knex("merchants").where("id", id).first();
  return merchants;
}

async function createMerchant(data) {
  const params = await data;
  const product = knex("merchants")
    .insert({
      name: params.name,
      description: params.description,
      address: params.address,
      revenue: params.revenue,
      user_id: params.user_id,
    })
    .returning("*");
  return product;
}

async function updateMerchant(id, data) {
  const params = await data;
  const timestamps = new Date().toISOString();
  const product = knex("merchants")
    .where("id", id)
    .update({
      name: params.name,
      description: params.description,
      address: params.address,
      revenue: params.revenue,
      updated_at: timestamps,
    })
    .returning("*");

  return product;
}

async function deleteMerchant(id) {
  const merchants = knex("merchants").where("id", id).del();
  return merchants;
}

module.exports = {
  getMerchants,
  getMerchant,
  createMerchant,
  updateMerchant,
  deleteMerchant,
};

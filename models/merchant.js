const { knex } = require("../config");
const { format } = require("date-fns");

async function getMerchants(data = null) {
  const { limit = 10, page = 1, name = null, user_id = null } = data;
  const query = knex("merchants");
  if (name) {
    query.where("name", "like", `%${name}%`);
  }

  if (user_id) {
    query.where("user_id", user_id);
  }
  
  const merchants = await query.paginate({
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
  const insertMerchant = await knex("merchants").insert({
    name: params.name,
    description: params.description,
    address: params.address,
    revenue: params.revenue,
    user_id: params.user_id,
  });
  const merchant = await knex("merchants")
    .where("id", insertMerchant[0])
    .first();
  return merchant;
}

async function updateMerchant(id, data) {
  const params = await data;
  const timestamps = format(new Date(), "yyyy-MM-dd HH:mm:ss");
  await knex("merchants").where("id", id).update({
    name: params.name,
    description: params.description,
    address: params.address,
    revenue: params.revenue,
    updated_at: timestamps,
  });
  const merchant = await knex("merchants").where("id", id).first();

  return merchant;
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

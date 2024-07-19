const { knex } = require("../config");
const data = [
  { sepatu: { price: 20000, total: 2 } },
  { sendal: { price: 20000, total: 2 } },
];
async function getTransactions(data = null, userId) {
  const { limit = 10, page = 1 } = data;
  const transactions = knex("transactions").where("user_id", userId).paginate({
    perPage: limit,
    currentPage: page,
  });

  return transactions;
}

async function getAdminTransactions(data = null, userId) {
  const { limit = 10, page = 1 } = data;
  return knex("transactions")
    .join("products", "transactions.product_id", "products.id")
    .join("merchants", "products.merchant_id", "merchants.id")
    .join("users", "merchants.user_id", "users.id")
    .select("transactions.*")
    .where("users.id", userId)
    .paginate({
      perPage: limit,
      currentPage: page,
    });
}

async function getTransaction(id, userId) {
  console.log(userId);
  const transactions = knex("transactions")
    .where("id", id)
    .where("user_id", userId)
    .first();
  return transactions;
}

async function getAdminTransaction(id, userId) {
  return await knex("transactions")
    .join("products", "transactions.product_id", "products.id")
    .join("merchants", "products.merchant_id", "merchants.id")
    .join("users", "merchants.user_id", "users.id")
    .select("transactions.*")
    .where("users.id", userId)
    .where("transactions.id", id)
    .first();
}

async function createTransaction(data) {
  const params = await data;
  const product = await knex("products").where("id", params.product_id).first();
  const timestamps = new Date().toISOString();

  if (!product) {
    throw new Error("Product not found");
  }

  const update_stock = product.stock - params.total;

  // Check if the stock is sufficient
  if (update_stock < 0) {
    throw new Error("Insufficient stock");
  }

  // Start a transaction
  try {
    // Insert transaction record
    const transaction = await knex("transactions")
      .insert({
        user_id: params.user_id,
        product_id: params.product_id,
        status: params.status,
        total: params.total,
        shipping_cost: params.shipping_cost,
        product_cost: params.product_cost,
        gross_amount: params.gross_amount,
        net_amount: params.net_amount,
        shipping_discount: params.shipping_discount,
        product_discount: params.product_discount,
      })
      .returning("*");

    // Update product stock
    await knex("products")
      .where("id", params.product_id)
      .update({ stock: update_stock, updated_at: timestamps });

    return transaction;
  } catch (error) {
    // Rollback transaction in case of error
    await trx.rollback();
    throw error;
  }
}

async function updateTransaction(id, data, userId) {
  const params = await data;
  const timestamps = new Date().toISOString();
  const transaction = knex("transactions")
    .where("id", id)
    .where("user_id", userId)
    .update({
      status: params.status,
      updated_at: timestamps,
    })
    .returning("*");

  return transaction;
}

async function updateAdminTransaction(id, data, userId) {
  const params = await data;
  const timestamps = new Date().toISOString();
  const current_transaction = getAdminTransaction(id, userId);

  if (!current_transaction) {
    throw new Error("Transaction not found");
  }

  const transaction = knex("transactions")
    .where("id", id)
    .where("user_id", params.userId)
    .update({
      status: params.status,
      updated_at: timestamps,
    })
    .returning("*");

  return transaction;
}

async function deleteTransaction(id) {
  const transactions = knex("transactions").where("id", id).del();
  return transactions;
}

module.exports = {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getAdminTransactions,
  getAdminTransaction,
};
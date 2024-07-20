/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("products").del();
  // Reset auto-increment sequence for PostgreSQL
  await knex.raw(`ALTER TABLE products AUTO_INCREMENT = 1`);

  await knex("products").insert([
    {
      name: "Aqua",
      price: "20000",
      stock: 20,
      description: "Air mineral",
      brand_id: 2,
      merchant_id: 1,
    },
    {
      name: "VIT",
      price: "22000",
      stock: 15,
      description: "Air mineral",
      brand_id: 2,
      merchant_id: 2,
    },
    {
      name: "SGM",
      price: "102000",
      stock: 10,
      description: "Susu",
      brand_id: 2,
      merchant_id: 1,
    },
    {
      name: "Tremenza",
      price: "2300",
      stock: 200,
      description: "Obat",
      brand_id: 1,
      merchant_id: 3,
    },
  ]);
};

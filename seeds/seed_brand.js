/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("brands").del();
  // Reset auto-increment sequence for PostgreSQL
  await knex.raw(`ALTER SEQUENCE brands_id_seq RESTART WITH 1`);
  
  await knex("brands").insert([
    {name: "Sanbe", description: "Product Kesehatan" },
    {name: "Danone", description: "Product Konsumsi" },
  ]);
};

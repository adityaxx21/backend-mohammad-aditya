/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("merchants").del();
  // Reset auto-increment sequence for PostgreSQL
  await knex.raw(`ALTER TABLE merchants AUTO_INCREMENT = 1`);

  await knex("merchants").insert([
    {
      name: "Toko A",
      description: "Toko Kelontong",
      address: "Malang",
      revenue: 0,
      user_id: 3,
    },
    {
      name: "Toko B",
      description: "Toko Kelontong",
      address: "Malang",
      revenue: 0,
      user_id: 3,
    },
    {
      name: "Toko C",
      description: "Toko Kelontong",
      address: "Malang",
      revenue: 0,
      user_id: 4,
    },
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  // Reset auto-increment sequence for PostgreSQL
  await knex.raw(`ALTER SEQUENCE users_id_seq RESTART WITH 1`);

  await knex("users").insert([
    {
      fullname: "Aditya Noviansyah",
      address: "Kediri",
      email: "aditya@gmail.com",
      password: "$2a$10$xjCKulykQmiLcajHdnDjLORUVQPdZ.G62wSVyPj8K38XiQ1FjAOVW",
      role: "user",
    },
    {
      fullname: "Mohammad Aditya",
      address: "Kediri",
      email: "noviansyah@gmail.com",
      password: "$2a$10$xjCKulykQmiLcajHdnDjLORUVQPdZ.G62wSVyPj8K38XiQ1FjAOVW",
      role: "user",
    },
    {
      fullname: "Admin",
      address: "Kediri",
      email: "admin@gmail.com",
      password: "$2a$10$NqvepqTpDiHrVsWLAWKcDOS6VaKjgmxD8DMr9u4sD3fLJ3LnRIs6a",
      role: "admin",
    },
    {
      fullname: "Admin",
      address: "Kediri",
      email: "admin1@gmail.com",
      password: "$2a$10$NqvepqTpDiHrVsWLAWKcDOS6VaKjgmxD8DMr9u4sD3fLJ3LnRIs6a",
      role: "admin",
    },
  ]);
};

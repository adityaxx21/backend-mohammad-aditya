/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").unique();
    table.string("fullname").notNullable().defaultTo(null);
    table.string("address").notNullable().defaultTo(null);
    table.string("email", 255).unique().notNullable().defaultTo(null);
    table.string("password", 255).notNullable().defaultTo(null);
    table.string("role", 255).notNullable().defaultTo(null);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};

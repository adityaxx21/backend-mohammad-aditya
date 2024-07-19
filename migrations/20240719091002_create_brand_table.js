/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("brands", function (table) {
    table.increments("id").unique();
    table.string("name", 255).notNullable().defaultTo(null);
    table.string("description", 255).notNullable().defaultTo(null);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("brands");
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("merchants", function (table) {
    table.increments("id").unique();
    table.string("name").notNullable().defaultTo(null);
    table.string("description", 255).notNullable().defaultTo(null);
    table.string("address").notNullable().defaultTo(null);
    table.integer("revenue").notNullable().defaultTo(0);
    table
      .integer("user_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("merchants");
};

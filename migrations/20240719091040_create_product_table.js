/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("products", function (table) {
    table.increments("id").unique();
    table.string("name", 255).notNullable().defaultTo(null);
    table.string("price", 255).notNullable().defaultTo(null);
    table.integer("stock").notNullable();
    table.string("description").notNullable().defaultTo(null);
    table.integer("brand_id").unsigned().index().nullable();
    table
      .integer("merchant_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("merchants")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("products");
};

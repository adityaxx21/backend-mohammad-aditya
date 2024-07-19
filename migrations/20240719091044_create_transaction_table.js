/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("transactions", function (table) {
        table.increments("id").unique();
        table.integer("user_id").unsigned().notNullable().defaultTo(null);
        table.integer("product_id").unsigned().notNullable().defaultTo(null);
        table.string("status", 255).notNullable().defaultTo(null);
        table.integer("total").notNullable().defaultTo(0);
        table.integer("shipping_cost").notNullable().defaultTo(0);
        table.integer("product_cost").notNullable().defaultTo(0);
        table.integer("gross_amount").notNullable().defaultTo(0);
        table.integer("net_amount").notNullable().defaultTo(0);
        table.integer("shipping_discount").notNullable().defaultTo(0);
        table.integer("product_discount").notNullable().defaultTo(0);
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("transactions");
};

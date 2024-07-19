require("dotenv").config();

const develop = process.env.NODE_ENV || "development";
const baseSetup = require("./knexfile")[develop];
const knex = require("knex")(baseSetup);

const { attachPaginate } = require('knex-paginate');
attachPaginate();

module.exports = {
  knex,
};


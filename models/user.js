const { knex } = require("../config");

async function createUser(data) {
  const { email, fullname, password, address, role } = await data;
  const check_user = await knex("users").where("email", email).first();

  if (check_user) {
    throw new Error("Email already used");
  }

  const insertUser = await knex("users").insert({
    fullname: fullname,
    email: email,
    address: address,
    password: password,
    role: role,
  });
  const user = await knex("users").where("id", insertUser[0]).first();
  return user;
}

async function getUser(email) {
  const user = knex("users").where("email", email).first();
  return user;
}

module.exports = {
  createUser,
  getUser,
};

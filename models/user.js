const { knex } = require("../config");


async function createUser(data) {
  const { email, fullname, password, address, role } = await data;
  const product = knex("users")
    .insert({
      fullname: fullname,
      email: email,
      address: address,
      password: password,
      role: role,
    })
    .returning("*");
  return product;
}

async function getUser(email) {
  const user = knex("users").where("email", email).first();
  return user;
}

module.exports = {
  createUser,
  getUser,
};

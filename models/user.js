const { knex } = require("../config");

async function createUser(data) {
  const { email, fullname, password, address, role } = await data;
  const check_user = await knex("users").where("email", email).first();

  if (check_user) {
    throw new Error("Email already used");
  }
  
  const user = knex("users")
    .insert({
      fullname: fullname,
      email: email,
      address: address,
      password: password,
      role: role,
    })
    .returning("*");
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

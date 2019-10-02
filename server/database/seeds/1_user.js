const bcrypt = require("bcryptjs");
let password = bcrypt.hashSync("1234", 12);

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { username: "Leopold", password: password }
      ]);
    });
};

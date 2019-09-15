exports.up = function(knex) {
  return knex.schema.createTable("gallery", table => {
    table.increments();
    table.string("url").notNullable();
    table.string("description").notNullable();
    table
      .integer("user_id")
      .references("users.id")
      .notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("gallery");
};

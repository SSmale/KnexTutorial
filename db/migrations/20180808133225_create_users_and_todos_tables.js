exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("users", table => {
      table.increments();
      table.string("name").notNullable();
      table.string("email").notNullable();
      table.timestamp("createdAt").defaultTo(knex.fn.now());
      table.timestamp("updatedAt").defaultTo(knex.fn.now());
    })
    .createTable("todos", table => {
      table.increments();
      table.string("title").notNullable();
      table
        .boolean("completed")
        .notNullable()
        .defaultTo(false);
      table.timestamp("createdAt").defaultTo(knex.fn.now());
      table.timestamp("updatedAt").defaultTo(knex.fn.now());

      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("todos").dropTable("users");
};

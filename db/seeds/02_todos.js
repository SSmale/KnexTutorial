exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("todos")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("todos").insert([
        { title: "blah", user_id: 1 },
        { title: "test data", user_id: 1 },
        { title: "todo 3", user_id: 2 },
        { title: "bored now", user_id: 2 }
      ]);
    });
};

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { name: "Simon", email: "simon@smalemail.net" },
        { name: "Kay", email: "chapmank_123@talktalk.net" }
      ]);
    });
};

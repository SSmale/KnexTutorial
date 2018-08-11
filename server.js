const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;
const knex = require("./db/knex");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Get all
app.get("/todos", async (req, res) => {
  res.send(await knex.select().from("todos"));
});

// Get single
app.get("/todo/:id", async (req, res) => {
  res.send(
    await knex
      .select()
      .from("todos")
      .where("id", req.params.id)
  );
});

// add new todo
app.post("/todo", async (req, res) => {
  await knex("todos").insert({
    title: req.body.title,
    user_id: req.body.userId
  });
  res.send(await knex.select().from("todos"));
});

// Update single
app.put("/todo/:id", async (req, res) => {
  await knex("todos")
    .where("id", req.params.id)
    .update({
      title: req.body.title,
      completed: req.body.completed
    });
  res.send(await knex.select().from("todos"));
});

// delete single
app.delete("/todo/:id", async (req, res) => {
  await knex("todos")
    .where("id", req.params.id)
    .del();
  res.send(await knex.select().from("todos"));
});

// Get todos for user ( InnerJoin)
app.get("/todos-by-user/:id", async (req, res) => {
  res.send(
    await knex
      .select(["todos.title", "users.name"])
      .from("todos")
      .innerJoin("users", "todos.user_id", "users.id")
      .where("todos.user_id", req.params.id)
  );
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

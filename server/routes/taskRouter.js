const { Router } = require("express");
const express = require("express");
const taskRouter = express.Router();
const pool = require("../modules/pool.js"); // DB CONNECTION

// GET Route
taskRouter.get("/", (req, res) => {
  const queryText = `SELECT * FROM "tasks" ORDER BY "dueDate";`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

taskRouter.post("/", (req, res) => {
  let newTask = req.body;
  console.log(`adding new task:`, newTask);
  let queryText = `INSERT INTO "tasks" ("dueDate", "task", "completed", "notes")
                    VALUES ($1, $2, $3, $4);`;
  pool
    .query(queryText, [
      newTask.dueDate,
      newTask.task,
      newTask.completed,
      newTask.notes,
    ])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error adding new task`, error);
      res.sendStatus(500);
    });
});

taskRouter.put("/:id", (req, res) => {
  let completed = req.body.completed;
  let id = req.params.id;
  let queryText;

  console.log(completed);

  if (completed === "false") {
    queryText = `UPDATE "tasks"
                  SET "completed" = true
                  WHERE "id" = $1`;
  } else if (completed === "true") {
    queryText = `UPDATE "tasks"
                  SET "completed" = false
                  WHERE "id" = $1`;
  }

  console.log(`Updating Task with ${id}, setting completed to: `, completed);

  pool
    .query(queryText, [id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(200);
    });
});

module.exports = taskRouter;

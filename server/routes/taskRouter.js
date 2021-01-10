const { Router } = require("express");
const express = require("express");
const taskRouter = express.Router();
const pool = require("../modules/pool.js"); // DB CONNECTION

// GET Route
taskRouter.get("/", (req, res) => {
  const queryText = `SELECT * FROM "tasks";`;
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

module.exports = taskRouter;

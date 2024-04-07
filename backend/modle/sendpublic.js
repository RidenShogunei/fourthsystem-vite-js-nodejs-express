const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());

module.exports = function (db) {
  router.post("/", (req, res) => {
    console.log("Data received!");
    console.log(req.body);

    let username = req.body.username;
    let content = req.body.content;
    let time = req.body.time;

    let sqlStr = "INSERT INTO publicword (user, words, time) VALUES (?, ?, ?)";
    let values = [username, content, time];
    let query = db.format(sqlStr, values);

    db.query(query, (err, results) => {
      if (err) {
        console.error("Insertion failed:", err);
        res.status(500).send("Insertion failed");
      } else {
        console.log("Insertion successful");
        res.status(200).json({
          code: 200,
          message: "Insertion successful",
        });
      }
    });
  });

  return router;
};
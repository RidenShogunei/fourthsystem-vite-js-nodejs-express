const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());

module.exports = function (db) {
  router.post("/", (req, res) => {
    console.log("Data received!");
    console.log(req.body);

    let user1 = req.body.user1;
    let user2 = req.body.user2;
    let content = req.body.content;
    let time = req.body.time;
    let speaker=req.body.speaker;
    console.log("拿到的",content)
    let sqlStr = "INSERT INTO personalword (user1,user2, text, time,speaker) VALUES (?,?, ?, ?,?)";
    let values = [user1,user2, content, time,speaker];
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
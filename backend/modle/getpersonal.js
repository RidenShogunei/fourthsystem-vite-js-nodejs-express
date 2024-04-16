const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());

module.exports = function (db) {
  router.post("/", (req, res) => {
    console.log("person",req.body)
    let user1 = req.body.user1;
    let user2 = req.body.user2;
    let sqlStr = "SELECT * FROM personalword WHERE (user1=? AND user2=?) OR (user1=? AND user2=?) ORDER BY time";
    let query = db.format(sqlStr, [user1, user2, user2, user1]);
    db.query(query, (err, results) => {
      if (err) {
        console.error("查询失败：", err);
        res.status(500).send("查询失败");
      } else {
        console.log("person",results)
        res.status(200).json({
          code: 200,
          data: results,
        });
      }
    });
  });
  return router;
};
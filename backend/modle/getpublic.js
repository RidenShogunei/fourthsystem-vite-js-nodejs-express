const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());

module.exports = function (db) {
  router.post("/", (req, res) => {
    console.log("get received!");
    console.log(req.body);
    let sqlStr =
      "SELECT * FROM publicword";
    let query = db.format(sqlStr);
    db.query(query, (err, results) => {
      if (err) {
        console.error("查询失败：", err);
        res.status(500).send("查询失败");
      } else {
        console.log("查询成功");
        console.log("查询结果",results)
        console.log(results);
        res.status(200).json({
          code: 200,
          data: results,
        });
      }
    });
  });

  return router;
};
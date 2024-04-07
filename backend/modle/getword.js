const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());

module.exports = function (db) {
  router.post("/", (req, res) => {
    console.log("get received!");
    console.log(req.body);
    let ID = req.body.number;
    let book = req.body.book;
    let sqlStr =
      "SELECT word,translation,note FROM word WHERE ID = ? AND book = ?";
    let query = db.format(sqlStr, [ID, book]);
    db.query(query, (err, results) => {
      if (err) {
        console.error("查询失败：", err);
        res.status(500).send("查询失败");
      } else {
        console.log("查询成功");
        let detail = results.map((row) => {
          return {
            word: row.word,
            translation: row.translation,
            note: row.note
          };
        });
        console.log(detail);
        res.status(200).json({
          code: 200,
          data: detail,
        });
      }
    });
  });

  return router;
};
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());

module.exports = function (db) {
  router.post("/", (req, res) => {
    const uid = req.body.uid;
  
    let sqlStr;
    let params;
  
    // 判断uid是否为空或为特定值（此处假设特定值为'all'），你可以根据需要调整
    if (!uid || uid === 'all') {
      sqlStr = "SELECT username FROM user";
    } else {
      sqlStr = "SELECT * FROM user WHERE uid = ?";
      params = [uid];
    }
  
    let query = db.format(sqlStr, params);
  
    db.query(query, (err, results) => {
      if (err) {
        console.error("查询失败：", err);
        res.status(500).send("查询失败");
      } else {
        if (results.length > 0) {
          res.status(200).json({
            code: 200,
            data: results,
          });
        } else {
          res.status(401).json({
            code: 401,
            data: "No user found with this uid",
          });
        }
      }
    });
  });
  return router;
};
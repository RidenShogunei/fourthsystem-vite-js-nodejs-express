const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const crypto = require("crypto");

router.use(bodyParser.json());

module.exports = function (db) {
  router.post("/", (req, res) => {
    console.log("post received!");
    console.log(req.body);
    let username = req.body.username;
    let password = req.body.password;
    let realname = req.body.name;

    // 生成足够复杂的用户唯一标识符
    let uid = crypto.randomBytes(16).toString('hex');

    // 先查询是否已经存在相同的用户
    let checkUserExistsQuery = "SELECT * FROM user WHERE username = ?";
    checkUserExistsQuery = db.format(checkUserExistsQuery, [username]);

    db.query(checkUserExistsQuery, (err, results) => {
      if (err) {
        console.error("查询失败：", err);
        res.status(500).send("查询失败");
      } else {
        if (results.length > 0) {
          // 如果查询结果有记录，说明已经存在同名的用户
          console.log("昵称已存在，不能插入");
          res.status(200).json({
            code: 200,
            data: "fail",
            message: "昵称已存在，不能插入"
          });
        } else {
          // 如果查询结果为空，说明可以插入新用户
          let sqlStr =
            "INSERT INTO user (uid, username, password, realname) VALUES (?, ?, ?, ?)";
          let query = db.format(sqlStr, [uid, username, password, realname]);

          db.query(query, (err, results) => {
            if (err) {
              console.error("插入失败：", err);
              res.status(500).send("插入失败");
            } else {
              console.log("注册成功");
              res.status(200).json({
                code: 200,
                data: "pass",
                uid:uid,
              });
            }
          });
        }
      }
    });
  });
  return router;
}
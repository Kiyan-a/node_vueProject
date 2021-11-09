/* 功能： @登录 & 注册 */
const express = require("express");
const router = express.Router();
const User = require("../../models/User");
// 引入 bcryptjs 对密码进行加密
const bcrypt = require("bcryptjs");
// 引入 安装全球公用头像 gravatar
const gravatar = require("gravatar");
let passport = require("passport");
/* 引入 token jwt */
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// $route POST /api/users/register
// @desc 返回请求的 json 数据
// @access public 公共的
// post 请求需要安装第三方模块
/* @注册 */
router.post("/register", (req, res) => {
  // 查询数据库是否有相同的邮箱
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      //邮箱已存在
      return res.status(400).json("邮箱已被注册!");
    } else {
      //邮箱不存在
      //创建全球公用头像 gravatar
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        identity: req.body.identity,
        password: req.body.password,
      });
      //bcrypt 对密码进行加密
      bcrypt.genSalt(10, function (err, salt) {
        // 将哈希存储在密码数据库中。
        bcrypt.hash(newUser.password, salt, function (err, hash) {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => {
              console.log(err);
            });
        });
      });
    }
  });
});

// $route POST /api/users/login
/* ### 在登录成功之后返回一个 token */
// @desc 返回token jwt passport
// @access public
/* 登录 */
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  /* 进行数据库验证登录 */
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json("用户不存在!");
    }
    // 密码匹配
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        //JWT赋予一个token
        const rule = {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          identity: user.identity,
        };
        jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
          if (err) throw err;
          res.json({ success: true, token: "Bearer " + token });
        });
        /* jwt.sign("规则", "加密名字", "过期时间", "箭头函数"); */
        /* res.json({ msg: "密码匹配" }); */
      } else {
        return res.status(400).json("密码错误!");
      }
    });
  });
});

// $route GET /api/users/current
// @desc 返回用户信息
// @access Private 私密的
// 使用 passprot 验证 token
/* router.get("/current", "验证 token", (req, res) => {
  res.json({ msg: "验证 token" });
}); */
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      identity: req.user.identity,
    });
  }
);
module.exports = router;

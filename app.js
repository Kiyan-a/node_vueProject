// 引入 express 模块
let express = require("express");
// 创造服务器
let app = express();
//定义一个端口号
let port = 3000;

//开放public资源
/*  app.use('/public/', express.static('./public/'))  */

/* 引入 routes users.js */
const users = require("./routes/api/users");
/* 引入 routes profiles.js */
const profiles = require("./routes/api/profiles");

// 引入 passport 模块
// 身份验证中间件
let passport = require("passport");

// 引入 body-parser 模块
let bodyParser = require("body-parser");
// 在处理程序之前在中间件中解析传入的请求主体，req.body属性下可用
// 使用 body-parser 中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 引入 mongoose 模块
const mongoose = require("mongoose");
/* 引入 mongoose 配置文件模块 config keys 对象*/
const db = require("./config/keys").mongoUrI;
/* 连接数据库   它同样提供了*Promise API*/
mongoose
  .connect(db)
  .then(() => {
    console.log("MongoDB 连接成功");
  })
  .catch((err) => {
    console.log("MongoDB 连接失败");
  });

//当服务器收到get请求“/”的时候，执行回调处理函数
/* app.get("/", (req, res) => {
  res.json({ msg: "Hello Node!" });
}); */

// passporrt 初始化
app.use(passport.initialize());
require("./config/passport")(passport);

/* 使用引入进来的 users.js profiled.js*/
app.use("/api/users", users);
app.use("/api/profiles", profiles);

app.listen(port, () => {
  console.log(`服务器启动成功 http://localhost:${port}`);
});

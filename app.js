const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
// 导入session中间件
const session = require("express-session");
app.use(
  session({
    secret: "这是一个密钥",
    resave: false,
    saveUninitialized: true,
  })
);

// 配置模板引擎
app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/node_modules", express.static("./node_modules"));

// 手动挂载路由
// const router1 = require("./router/index");
// const router2 = require("./router/user");
// app.use(router1);
// app.use(router2);

// 循环自动注册路由
fs.readdir(path.join(__dirname, "./router"), (err, file) => {
  if (err) return console.log("读取失败");
  file.forEach(fanme => {
    const router = require(path.join(__dirname, "./router", fanme));
    app.use(router);
  });
});

// 监听端口
app.listen(80, () => {
  console.log("http://localhost:80");
});

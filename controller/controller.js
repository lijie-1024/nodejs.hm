const conn = require("./db");
const moment = require("moment");
const marked = require("marked");
// const bcrypt = require("bcrypt");

// 注册
const postUserdataAPI = (req, res) => {
  // 后端接收到前端送过来的数据了！！！昨天的问题，晚上记得看
  const body = req.body;
  console.log(body);
  //   查重
  const sql1 = "select count(*) as count from blog_users where username=?";
  conn.query(sql1, body.username, (err, result) => {
    if (err) return res.send({ status: 501, msg: "查重失败" });
    if (result[0].count != 0)
      return res.send({ status: 502, msg: "用户名重复" });
    // 正式注册
    body.ctime = moment().format("YYYY-MM-DD HH:mm:ss");

    // 对用户密码加密处理-->配置不行
    // const saltRounds = 10;
    // bcrypt.hash(body.password, saltRounds, function(err, hash) {
    //   //把hash值赋值给password变量
    //   body.password = hash;
    // });
    const sql2 = "insert into blog_users set?";
    conn.query(sql2, body, (err, result) => {
      if (err) return res.send({ status: 503, msg: err.message });
      res.send({ status: 200, msg: "注册成功", data: result });
    });
  });
};
// 登陆
const loginDataAPI = (req, res) => {
  const login = req.body;
  const sql3 = "select * from blog_users where username=? and password=?";
  conn.query(sql3, [login.username, login.password], (err, result) => {
    if (err) return res.send({ status: 501, msg: "未查询成功" });
    if (result.length != 1)
      return res.send({ status: 502, msg: "用户名或密码不正确" });
    req.session.people = result[0];
    req.session.isLogin = true;
    res.send({ msg: "登陆成功", status: 200, data: result });
  });
};
// 注销
const logoutAPI = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

// 首页跳转
const registerAPI = (req, res) => {
  res.render("register.ejs", {});
};
const loginAPI = (req, res) => {
  res.render("login.ejs", {});
};
// 进入发起文章页
const addAPI = (req, res) => {
  if (!req.session.isLogin) return res.redirect("/");
  res.render("./article/add.ejs", {
    user: req.session.people,
    isLogin: req.session.isLogin
  });
};
// 添加新的文章
const addarticleAPI = (req, res) => {
  const body = req.body;
  body.ctime = moment().format("YYYY-MM-DD HH:mm:ss");
  const sql4 = "insert into blog_ariticles set ?";
  conn.query(sql4, body, (err, results) => {
    // console.log(results);
    if (err) return res.send({ status: 504, msg: "添加未成功" });
    if (results.affectedRows != 1)
      return res.send({ status: 505, msg: "发表文章失败" });
    res.send({ msg: "插入文章成功", status: 200, insertId: results.insertId });
  });
};

// 查看文章详情
const showArticleAPI = (req, res) => {
  const id = req.params.id;
  const sql5 = "select * from blog_ariticles where id=?";
  conn.query(sql5, id, (err, results) => {
    if (err) throw err.message;
    if (results.length != 1) return res.redirect("/");
    const html = marked(results[0].content);
    results[0].content = html;
    res.render("./article/info.ejs", {
      user: req.session.people,
      isLogin: req.session.isLogin,
      article: results[0]
    });
  });
};

const showArticlePageAPI = (req, res) => {
  const id = req.params.id;
  if (!req.session.isLogin) return res.redirect("/");
  const sql = "select * from blog_ariticles where id=?";
  conn.query(sql, id, (err, results) => {
    if (err) throw err.message;
    if (results.length != 1) return res.redirect("/");
    res.render("./article/edit.ejs", {
      user: req.session.people,
      isLogin: req.session.isLogin,
      article: results[0]
    });
  });
};

const editArticleAPI = (req, res) => {
  const body = req.body;
  console.log(body);
  const sql = "update blog_ariticles set ? where id=?";
  conn.query(sql, [body, body.id], (err, results) => {
    console.log(results);
    if (err) throw err.message;
    if (results.affectedRows != 1)
      return res.send({ msg: "修改文章失败！", status: 502 });
    res.send({ msg: "修改文章成功", status: 200, data: results });
  });
};

// 首页
const showIndexAPI = (req, res) => {
  const sql =
    "SELECT blog_ariticles.id, blog_ariticles.title, blog_ariticles.ctime, blog_users.nickname FROM blog_ariticles LEFT JOIN blog_users ON blog_ariticles.authorId = blog_users.id ORDER BY blog_ariticles.id DESC";
  conn.query(sql, (err, results) => {
    console.log(results);
    res.render("index.ejs", {
      user: req.session.people,
      isLogin: req.session.isLogin,
      artlist: results
    });
  });
};

module.exports = {
  postUserdataAPI,
  loginAPI,
  loginDataAPI,
  registerAPI,
  logoutAPI,
  addAPI,
  addarticleAPI,
  showArticleAPI,
  showArticlePageAPI,
  editArticleAPI,
  showIndexAPI
};

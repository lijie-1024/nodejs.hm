const express = require("express");
const router = express.Router();
const ctrl = require("../controller/controller.js");

// 按钮跳转
router.get("/register", ctrl.registerAPI);
router.get("/login",ctrl.loginAPI);
router.get("/logout",ctrl.logoutAPI);
//渲染文章
router.get("/",ctrl.showIndexAPI);


module.exports = router;

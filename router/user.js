const express = require("express");
const router = express.Router();
const ctrl = require("../controller/controller.js");
// 注册
router.post("/postUserdata",ctrl.postUserdataAPI);
// 登陆
router.post("/loginData",ctrl.loginDataAPI);

module.exports = router;

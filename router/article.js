const express = require("express");
const router = express.Router();
const ctrl = require("../controller/controller.js");

// 调用方法
router.get("/article/add", ctrl.addAPI);
router.post("/article/add", ctrl.addarticleAPI);
router.get("/article/info/:id", ctrl.showArticleAPI);
router.get("/article/edit/:id", ctrl.showArticlePageAPI);
router.post("/article/edit", ctrl.editArticleAPI);


module.exports = router;

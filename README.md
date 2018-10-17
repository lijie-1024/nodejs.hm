# nodejs.hm
## 基于node开发的，文章博客页面，实现了登陆，注册，查看文章，编辑文章功能
### 项目说明
* 项目分为两部分
    * 1.web前端页面设计。
    * 2.基于node后台数据搭建本地服务器。
* 功能
    * 实现文章博客页面，实现了登陆，注册，查看文章，编辑文章功能，是一个完整的网页。
### 使用说明
* 开发插件
    * 使用的nodejs 扩展包： express，ejs，cors， router， jq， art-template， mysql，body-parser。
    * 开发框架--前台页面使用了semantic ui框架搭建。
    * 接口说明
        * testAPI--请求后台api接口成功
        * getallheroAPI--查询整体数据
        * addheroAPI--新增数据
        * getheroAPI--根据id查询一条数据
        * updateheroAPI--根据id修改一条数据
        * deleteheroAPI--软删除（isdel更改数据）
* 文档说明
    * web.js--浏览器运行文件
    * package.js--nodejs扩展包数据（未上传扩展包）
    * semantic.json--框架使用
    * views文件夹--网页
        * index.html--主体为王者荣耀的列表，内部数据使用模板引擎渲染。
        * index.js--发送Ajax，实现了增加新英雄，修改，软删除等功能。
    * back文件夹--后台数据
        * 01server完整版.js--完整的后台数据增删改查。
        * 02server封装版.js--服务器运行文件。
        * controller.js--接口文件
        * db.js--封装的服务器文件。
        * router.js--路由文件。
* 结语
    * 设计初衷为学习nodejs相关知识，前台使用了Ajax调取接口，后台在本地搭建服务器MySQL001，熟悉了混合开发的基础流程，完成了渲染，新增，修改，软删除的功能。<br>
    不足之处，没有上传node相关的包文件，需要根据文档自行下载。



// 新建一个文件以启动打包后的项目
var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.process.env.PORT;
var app = express();
var router = express.Router();

rourer.get('/',function (req,res,next) {
  req.url = '/index.html';
  next();
});
 app.use(router);

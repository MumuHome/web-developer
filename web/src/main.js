// commonjs的语法 把需要打包的文件加进这里
// 添加jq
require("jquery");
require("./index");
require("./test");
// css不能像js一样直接加到这里来 需要先在webpack.config.js中配置好
require("./css.css");

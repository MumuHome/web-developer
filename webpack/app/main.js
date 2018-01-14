// 模块以 './' 开头表示调用 require() 时使用相对路径。也就是说，为了保证 require('./circle') 能找到，circle.js 必须和 foo.js 在同一目录。
// 如果不以 '/' 或'./' 开头，该模块可以是一个“核心模块”，也可是一个从 node_modules 文件夹中加载的模块。
// const、let以及var为三种不同的定义方式

// const greeter = require("./Greeter");

// // 把greeter模块返回的节点插入页面

// document.querySelector("root").appendChild(greeter());

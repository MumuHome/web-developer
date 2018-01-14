// require("jquery");
// require("./index");
// require("./test");
// css不能像js一样直接加到这里来 需要先在webpack.config.js中配置好
// require("./css.css");

var Vue = require('vue');
var App = require('./app.vue');
new Vue({
    el:'#main',
    render: x => x(App),
})

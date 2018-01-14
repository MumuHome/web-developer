// 为jq添加插件
// 注册完毕以后，使用$("xxx").fun 使用
$.fn.extend({
    becomeYellow:function () {
        console.log("变黄了哦")
        // 在这个方法中，我们可以使用$('选择器')获取对象
        // this就是我们获取到的jq对象
        // 注意分辨 jq对象和dom对象 所以这里建议定义一个
        // 一看到$_开头的就知道是jq对象 防止跟dom对象弄混
        var $_this = this;
        $_this.css('background','yellow');
        // this指代的是谁？谁点出来的 就是指向谁
        // $(this).css('background','yellow');

        // jq有一个特点 链式编程
        // 为了能够链式编程 建议return当前使用的jq对象
        return $_this;
    }
});

// 注册完毕以后 使用$.fun使用
$.extend({
    eatFood:function () {
        console.log("我今天想吃美味的饭");
    }
});
var path = require("path"); //寻址模块
var webpack = require('webpack');
// 引入html-webpack-plugin插件
// 为html文件中引入的外部资源如script、link动态添加每次compile后的hash，防止引用缓存的外部文件问题
// 可以生成创建html入口文件，比如单页面可以生成一个html文件入口，配置N个html-webpack-plugin可以生成N个页面入口
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 一般用src表示源的目录
    // 入口文件
    entry: './src/main.js', //如果有多个可以拓展成数组
    // 一般用dist表示输出的目录
    // 出口文件
    output: {
        // 在整个文件中 寻找名为dist的文件
        path: __dirname + '/dist',
        // 表示输出文件的名字
        filename: '[name].bundle.js'
    },
    devServer: {
        contentBase:"./", // 本地服务器在哪个目录搭建页面，一般我们在当前目录即可；
        host:"192.168.1.170",
        port:"8080", //端口号(默认8080)
        color:true
    },
    module:{
        loaders:[
            {
                // 导入vue规则
                test:/\.vue$/,
                loader:'vue'
            },
            // 正则表达式 识别以css结尾的文件
            {
                test:/\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                // 识别jq
                test:require.resolve('jquery'),
                use:[{
                    loader:'expose-loader',
                    options:'jQuery'
                },{
                    loader:'expose-loader',
                    options:'$'
                }]
            }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        // extractCSS,
        new HtmlWebpackPlugin({
            title:'wos',
            filename:'../index.html',
            template:__dirname + '/src/tpl/index.html',
            // inject:向template或者templateContent中注入所有静态资源，不同的配置值注入的位置不经相同。
            // 1、true或者body:所有JavaScript资源插入到body元素的底部
            // 2、head: 所有JavaScript资源插入到head元素中
            // 3、false: 所有静态资源css和JavaScript都不会注入到模板文件中
            inject:'body',
            info:'hello world'
        })
    ]
};
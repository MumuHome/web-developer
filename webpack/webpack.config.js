var path = require("path"); //寻址模块
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
    module:{
        rules:[
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
    }
};
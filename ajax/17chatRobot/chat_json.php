<?php 

header("content-type:text/html;charset=utf-8");
// 将聊天的内容抽取到json文件中
$str = file_get_contents('js/js.json');
echo $str;

// 为了使用方便 将字符串转化为对应的php对象（数组） 方便使用
// json_decode() 解码
// json_encode() 编码
// 将字符串转换成php中的对象
$data = json_decode($str);
// print_r可以直接输出数据
print_r($data);
// 获取随机的key
// 返回key对应的内容
$randomKey = array_rand($data,1);
echo $data[$randomKey];

 ?>
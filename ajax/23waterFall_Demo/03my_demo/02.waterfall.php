<?php 

// 读取json文件
$json = file_get_contents("info/data.json");

// 转化为php数组
$php = json_decode($json);

// 从数组中随机获取10个值 返回的是一个所以key数组
$random = array_rand($php,10);

// 准备一个新数组 数组中的长度是可变的
$phpData = array();

// 使用随机的key去取随机的值 count($random) 为count($random)的长度
for ($i=0; $i < count($random); $i++) { 
	// 获取索引数组中的每一个key $key = $random[$i]
	// 使用key从总数组中获取key对应的值
	// 丢到一个新数组中
	// 数组的长度随着我们索引值的更改而改变
	$phpData[$i] = $php[$random[$i]];
}

// 将这10个值转化为json格式的字符串 返回给浏览器
echo json_encode($phpData);

 ?>
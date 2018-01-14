<?php 
	// 读取json 并返回给浏览器
$str = file_get_contents('data/info.json');
	
	// 转化为php中的数组，str=>php
$arr = json_decode($str);

	// 从数组中获取某一个元素array_rand(arr,1);随机的index
$randomKey = array_rand($arr);

	// 将获取到的单个元素 返回给浏览器 获取的是对象
$oneObj = $arr[$randomKey];

// 因为如果直接 print_r($oneObj) 发回的格式是php中的对象 并不是json格式字符串
// print_r($oneObj);
// 所以我们需要使用json_encode
echo json_encode($oneObj);

 ?>
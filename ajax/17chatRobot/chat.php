<?php 

$message = $_POST['message'];
// 准备一些随机的值
$chatMessages = array(
	'你好呀',
	'哈哈哈哈哈哈哈，是的啊',
	'然后呢？',
	'老地方见',
	'66666',
	'好的吧',
	'老地方见'
);
// 要从数组中 获取一个随机的值
// array_rand(array,number) 参数一：函数名 参数二：要获取 几个 随机的键
$randomKey = array_rand($chatMessages,1);
echo $chatMessages[$randomKey];

 ?>

<?php 

	// 获取post数据
	$key = $_POST['name'];
	// 获取一个value，这里使用关系型数组
	$star = array(
		'baby'=>'img/baby.jpg',
		'hxm'=>'img/hxm.jpg',
		'lh'=>'img/lh.jpg'
	);
	// 传入key，获取对应的value
	$value = $star[$key];
	// 返回给浏览器即可
	echo $value;

 ?>
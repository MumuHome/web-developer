<?php 

	// 获取post数据
	$key = $_POST['name'];
	// 获取一个value，这里使用关系型数组
	$star = array(
		'baby'=>array('img/baby.jpg','我是baby'),
		'hxm'=>array('img/hxm.jpg','我是黄晓明'),
		'lh'=>array('img/lh.jpg','我是鹿晗，大家好啊')
	);
	// 使用key获取对应的value 这里是一个数组

	// 将数组中的两个值，都返回给用户
	$oneStar = $star[$key];
	// print_r(expression)
	echo $oneStar[0];
	// 为了在浏览器端获取方便，这里添加一分隔符
	echo "|";
	echo $oneStar[1];

 ?>
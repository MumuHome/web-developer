<?php 
	// header('content-type:text/html;charset=utf-8')
	// 二维数组
	$twoArr = array(
		array('西兰花','西葫芦','西红柿'),
		array('牛肉','羊肉','鸭肉','鸡肉'),
		array('白菜','油菜','娃娃菜'),
		array('皮皮虾','大闸蟹','生蚝')	
	);

	// 取出娃娃菜
	echo $twoArr[2][2];
	echo "<br>";

	// php中输出变量的详细内容
	// print_r是一个php预定义的函数 传递参数的方式：直接字啊括号中写入即可
	print_r($twoArr[2]);

 ?>
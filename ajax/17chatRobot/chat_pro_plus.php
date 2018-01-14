<?php 

// 获取用户的数据
$message = $_POST['message'];
switch ($message) {
	case '你好':
		// 读取json文件
		$jsonStr = file_get_contents('js/hello.json');
		// 把json数据转化成php数组
		$charArr = json_decode($jsonStr);
		// 随机输出数组
		$randomKey = array_rand($charArr,1);
		// 返回key对应的值
		echo $charArr[$randomKey];

		break;
	
	default:
		# code...
		break;
}

 ?>
<?php 
	// 读取 json 
	$jsonStr = file_get_contents("info/data.json");
	
	// json_decode 可以讲 json格式字符串 转化为 php对象 php中的数组
	$totalArr = json_decode($jsonStr);

	// 从中 取出 10个   返回的 是一个 索引数组
	$randomkeysArr = array_rand($totalArr,10);

	// 根据 随机的 下标 配合 总 数组 生成一个 新的数组
	$resultArr =  array( );

	// 循环 从 总数组中 根据 随机的 下标 获取 元素 并 添加到 $resultArr中
	// php中 获取 数组 长度的 函数
	for ($i=0; $i <count($randomkeysArr) ; $i++) { 
		// 随机的下标
		$randomKey = $randomkeysArr[$i];
		// 使用随机的下标 从 数组中 获取 一个 元素
		$randomObj  =$totalArr[$randomKey];
		// 添加到 $resultArr
		array_push($resultArr, $randomObj);
	}


	// 包装为 关系型数组 
	$keyValueArr = array(
		'items' =>$resultArr
		 );

	echo json_encode($keyValueArr);
	// echo $keyValueArr;
	// print_r($keyValueArr);

 ?>
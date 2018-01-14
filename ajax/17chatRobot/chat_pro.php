<?php 

$message = $_POST['message'];

// 根据获得的数据 有选择的输出
switch ($message) {
	case '你好':
		// 准备一些随机的值
	$array = array(
		'你好呀',
		'嗯嗯，你也是',
		'嘿，伙计，今天天气真不错',
		'不好意思，正在忙'
	);
		break;


	case '吃饭了没':
		// 准备一些随机的值
	$array = array(
		'吃了，你呢',
		'你要邀请我吗',
		'不去',
		'不好意思，正在忙'
	);

		break;

	default:
		$array = array(
			'你好呀',
			'哈哈哈哈哈哈哈，是的啊',
			'然后呢？',
			'老地方见',
			'66666',
			'好的吧'
		);
		break;
}
		// 要从数组中 获取一个随机的值
		// array_rand(array,number) 参数一：函数名 参数二：要获取 几个 随机的键
		$randomKey = array_rand($array,1);
		echo $array[$randomKey];		


 ?>

<?php 

	// 准备一个数组 用来保存多个用户名
	$userArr = array("葫芦兄弟","柯南","美少女战士","钢铁侠");

	// 获取提交过来的用户名
	$postName = $_POST['name'];
	// 判断是否存在于数组中	
	// 参数一：查询的内容
	// 参数二：数组

	$isIn = in_array($postName,$userArr);
	// 如果存在于这个数组中 则返回true 如果不存在 则返回false
	// if ($isIn) 
	// {
	// 	echo "用户名已经被使用了，不好意思哦";
	// }else{
	// 	echo "恭喜你，可以使用这个用户名";
	// }
	echo $isIn;

 ?>
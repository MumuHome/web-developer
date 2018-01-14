<?php 

	header('content-type:text/html;chartset=utf-8');
	echo 'get提交的页面';
	echo '<br>';
	// 通过$_GET['key']即可获取数据 key是提交的时候表单元素的name属性的值
	echo $_GET['name'];
	echo '<br>';
	echo $_GET['skill'];
	// key不匹配的话 会报错

 ?>
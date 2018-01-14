<?php 

// 设置编码格式
// 需要修改header 这里返回的是xml文件
header('content-type:text/xml;charset=utf-8');

// 测试读取文件的函数 注意需要返回 file_get_contents仅仅只是读取
// 这里读取一个XML的文件 必须准备一个.xml文件
echo file_get_contents('12person.xml');

 ?>
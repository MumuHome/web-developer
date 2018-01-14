<?php 

header('content-type:text/xml;charset=utf-8');
// 读取xml文件，并返回
echo file_get_contents('star.xml');

 ?>
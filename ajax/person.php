<?php 

$personArr = array(

'jack'=>array('name'=>'jack','age'=>18,'skill'=>'玩游戏'),
'rose'=>array('name'=>'rose','age'=>16,'skill'=>'睡觉'),
'iceMountain'=>array('name'=>'iceMountain','age'=>9999,'skill'=>'打豆豆')

);

// 通过post获取提交的数据，key为name
$key = $_POST['name'];
// 从数组中获取对应的用户数据
print_r($personArr[$key]);

// 将获取到的数据保存在变量中，方便使用
$onePerson = $personArr[$key];
// 拼接成对应的html内容返回给用户
echo '<h1>'.$onePerson['name'].'欢迎你</h1>';
echo '<h1>真不敢相信，你才'.$onePerson['age'].'</h1>';
echo '<h1>就掌握了'.$onePerson['skill'].'技能</h1>';

 ?>
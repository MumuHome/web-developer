<?php 

// 让php延迟3s执行
sleep(3);
// print_r($_FILES);

// $_FILES的值
// Array ( [upFile] => Array ( [name] => 徐娟-WEB前端开发工程师.doc [type] => application/msword [tmp_name] => /private/var/tmp/phpnlTKVa [error] => 0 [size] => 239104 ) ) 

// 获取上传的文件原本名字
$fileArr = $_FILES['upFile'];
$fileName = $fileArr['name'];
echo $fileName.'<br>';
// 获取保存在服务器上的哪个位置
$filePath = $fileArr['tmp_name'];
echo $filePath.'<br>';

// 如何在php中将文件保存
// 将文件保存在新位置 参数一为文件名，参数二为相对于该php文件的files文件夹下面的123.png
move_uploaded_file($fileName,'files/123.doc');

 ?>
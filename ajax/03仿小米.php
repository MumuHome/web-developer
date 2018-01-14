<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        body{
            background: #f5f5f7;
        }
        .items{
            width: 1220px;
            margin: 100px auto;
        }
        .items:after{
            display: block;
            content: "";
            clear: both;
        }
        .item{
            position: relative;
            padding-top: 20px;
            float: left;
            width: 220px;
            height: 270px;
            background: #fff;
            margin-right: 20px;
            text-align: center;
            border:1px solid #ccc;
            transition: all 0.4s;
        }
        .item span{
            position: absolute;
            width: 100%;
            height: 0;
            background: orange;
            left:0;
            bottom: 0;
            transition: all 0.4s;
        }
        .item:hover span{
            height: 70px;
        }
        .item:hover{
            box-shadow: 0 0 20px 2px #ccc;
            margin-top: -5px;
        }
    </style>
</head>
<body>
<h2><?php 
    echo $_POST['name'] 
    ?>
    欢迎你</h2>
<div class="items">
    <div class="item">
        <img src="img/phone1.jpg">
        <span></span>
    </div>
    <div class="item">
        <img src="img/phone2.jpg">
        <span></span>
    </div>
    <div class="item">
        <img src="img/phone3.jpg">
        <span></span>
    </div>
    <div class="item">
        <img src="img/phone4.jpg">
        <span></span>
    </div>
    <div class="item">
        <img src="img/phone5.jpg">
        <span></span>
    </div>
</div>
</body>
</html>
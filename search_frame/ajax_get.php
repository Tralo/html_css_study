<?php
// 指定允许其他域名访问  
header('Access-Control-Allow-Origin:*');
$url = "http://api.bing.com/qsonhs.aspx?q=".$_GET['keyword'];

//exit();
$result = file_get_contents($url);
echo $result;

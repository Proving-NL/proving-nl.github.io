<?php
header('Access-Control-Allow-Methods: POST');
$content = file_get_contents('php://input');
if ($_GET['data'] === 'product') {
  file_put_contents("product.json", $content);
}
if ($_GET['data'] === 'img') {
  $content = base64_decode(explode('base64,',$content)[1]);
  $filename = __DIR__."/assets".$_GET["filename"];
  mkdir(dirname($filename), 0777, true);
  file_put_contents($filename, $content);
}

<?php
header('Access-Control-Allow-Methods: GET,HEAD,POST,PUT,DELETE,OPTIONS,PATCH');
$contents = file_get_contents('php://input');
if ($_GET['data'] === 'list') {
  file_put_contents("list.json", $contents);
  die();
}
if ($_GET['data'] === 'prijzen') {
  file_put_contents("prijzen.json", $contents);
  die();
}
if ($_GET['data'] === 'page') {
  $filename = __DIR__."/pages".rtrim($_GET["pathname"],'/').".json";
  mkdir(dirname($filename), 0777, true);
  file_put_contents($filename, $contents);
  die($filename);
}
if ($_GET['data'] === 'img') {
  $content = base64_decode(explode('base64,',$content)[1]);
  $filename = __DIR__."/multimedia".$_GET["filename"];
  mkdir(dirname($filename), 0777, true);
  file_put_contents($filename, $content);
}

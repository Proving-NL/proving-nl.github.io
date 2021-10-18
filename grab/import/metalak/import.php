<?php
header('Access-Control-Allow-Methods: GET,HEAD,POST,PUT,DELETE,OPTIONS,PATCH');
$content = file_get_contents('php://input');
if ($_GET['data'] === 'list') {
  file_put_contents("list.json", $content);
  die();
}
if ($_GET['data'] === 'data') {
  file_put_contents("data.json", $content);
  die();
}
if ($_GET['data'] === 'page') {
  $filename = __DIR__."/pages/".rtrim($_GET["pathname"]);
  mkdir(dirname($filename), 0777, true);
  file_put_contents($filename, $content);
  die($filename);
}

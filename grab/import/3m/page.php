<?php
header('Access-Control-Allow-Methods: GET,HEAD,POST,PUT,DELETE,OPTIONS,PATCH');
// file_put_contents('pages/'.$_GET["href"], file_get_contents('php://input'));
$contents = file_get_contents('php://input');
$filename = __DIR__."/pages".rtrim($_GET["pathname"],'/').".json";
mkdir(dirname($filename), 0777, true);
file_put_contents($filename, $contents);
die($filename);
// echo $contents;

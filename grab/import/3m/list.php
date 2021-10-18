<?php
header('Access-Control-Allow-Methods: GET,HEAD,POST,PUT,DELETE,OPTIONS,PATCH');
file_put_contents("list.json", file_get_contents('php://input'));

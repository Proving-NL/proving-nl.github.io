<?php
require_once($_SERVER['DOCUMENT_ROOT']."/../vendor/autoload.php");
$res = aim()->sql_query("EXEC abisingen.api.report_client");
$items=[];
while ($row = sqlsrv_fetch_object($res)) {
  $items[]= $row;
}
http_response(200, [
  '@context' => aim()->context,
  'rows'=>$items,
]);

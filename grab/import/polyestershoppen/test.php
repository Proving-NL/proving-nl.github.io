<?php
if ($_GET['src']) {
  $fname = explode('/',$_GET['src']);
  $fname = array_pop($fname);
  $content = file_get_contents('php://input');
  $content = base64_decode(explode('base64,',$content)[1]);
  file_put_contents("img/$fname",$content);
  die();
}

$conn = sqlsrv_connect ('aliconnect.nl', [
  'UID' => 'aim',
  'PWD' => "ZXq7ndRx",
  'Database' => 'aim',
  'ReturnDatesAsStrings' => true,
  'CharacterSet' => 'UTF-8'
]);
$data = json_decode(file_get_contents('php://input'),true);

foreach($data['ref'] as $url => $obj) {
  $q .= "\nINSERT abisingen.dbo.polyestershoppen (url) SELECT '$url' WHERE '$url' NOT IN (SELECT url FROM abisingen.dbo.polyestershoppen WHERE url IS NOT NULL);";
  if ($obj['options']) {
    $q .= "\nDELETE abisingen.dbo.polyestershoppen WHERE nr=$obj[nr] AND variant IS NOT NULL;";
    foreach ($obj['options'] as $optionnr => $option) {
      $option['price'] = str_replace(['€ ','.',','],['','','.'],$option['price']);
      $q .= "\nINSERT abisingen.dbo.polyestershoppen (nr,variant,variant_title,price) VALUES ('$obj[nr]', '$optionnr', '$option[label]', '$option[price]');";
    }
  }
  unset($obj['options']);
  if ($obj) $q .= "\nUPDATE abisingen.dbo.polyestershoppen SET ".implode(',',array_map(function($key,$value){return "[$key]='".str_replace("'","''",$value)."'";},array_keys($obj),array_values($obj)))." WHERE url = '$url';";
}
sqlsrv_query($conn, $q);
// die($q);
// die($q);
$row = sqlsrv_fetch_object(sqlsrv_query($conn, "SELECT TOP 1 * FROM abisingen.dbo.polyestershoppen WHERE url IS NOT NULL AND LastScanDateTime IS NULL;"));
if ($row->url) {
  sqlsrv_query($conn, "\nUPDATE abisingen.dbo.polyestershoppen SET LastScanDateTime = getdate() WHERE url = '$row->url';");
  echo $row->url;
}

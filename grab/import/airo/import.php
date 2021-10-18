<?php
header('Access-Control-Allow-Methods: GET,HEAD,POST,PUT,DELETE,OPTIONS,PATCH');
header('Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept, Accept-Charset, Accept-Language, If-Match, If-None-Match, Isolation, Prefer, OData-Version, OData-MaxVersion, X-API-Key');
header('Access-Control-Expose-Headers: OData-Version');

if ($_GET['src']) {
  $fname = explode('/',$_GET['src']);
  $fname = array_pop($fname);
  $content = file_get_contents('php://input');
  $content = base64_decode(explode('base64,',$content)[1]);
  file_put_contents("img/$fname",$content);
  // file_put_contents($_SERVER['DOCUMENT_ROOT']"/shared/2347322/2020/03/$fname",$content);
  die($fname);
}

$conn = sqlsrv_connect ('aliconnect.nl', [
  'UID' => 'aim',
  'PWD' => "ZXq7ndRx",
  'Database' => 'aim',
  'ReturnDatesAsStrings' => true,
  'CharacterSet' => 'UTF-8'
]);
if ($data = json_decode($input = file_get_contents('php://input'),true)) {
  foreach($data['link'] as $url) {
    $q .= "INSERT abisingen.dbo.import(url) SELECT '$url' WHERE '$url' NOT IN (SELECT url FROM abisingen.dbo.import WHERE url IS NOT NULL);";
  }
  $q .= "UPDATE abisingen.dbo.import SET LastScanDateTime = getdate(),data = '".str_replace("'","''",$input)."' WHERE url = '$data[href]';";
  sqlsrv_query($conn, $q);
}
// die($q);
$row = sqlsrv_fetch_object(sqlsrv_query($conn, "SELECT TOP 1 * FROM abisingen.dbo.import
  WHERE LastScanDateTime IS NULL AND (url LIKE 'https://www.airo-chemie.com/nl_%')
  ORDER BY url;"));
if ($row->id) {
  sqlsrv_query($conn,  "UPDATE abisingen.dbo.import SET LastScanDateTime = getdate() WHERE id = $row->id;");
  echo $row->url;
}

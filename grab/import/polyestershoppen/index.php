<?php
$conn = sqlsrv_connect ('aliconnect.nl', [
  'UID' => 'aim',
  'PWD' => "ZXq7ndRx",
  'Database' => 'aim1',
  'ReturnDatesAsStrings' => true,
  'CharacterSet' => 'UTF-8'
]);
$res = sqlsrv_query($conn, "SELECT DISTINCT nr,title,url,price FROM abisingen.dbo.polyestershoppen WHERE nr>0 AND title IS NOT NULL ORDER BY url;SELECT nr,variant,variant_title,price FROM abisingen.dbo.polyestershoppen WHERE nr>0 AND variant IS NOT NULL ORDER BY variant_title;");
while ($row = sqlsrv_fetch_object($res)) $prods->{$row->nr}=$row;
sqlsrv_next_result($res);
while ($row = sqlsrv_fetch_object($res)) $prods->{$row->nr}->variant->{$row->variant}=$row;
echo "<table>";
foreach ($prods as $nr => $row) {
  $url = explode('/',$row->url);
  if ($row->variant) foreach ($row->variant as $variant_nr => $variant) {
    echo "\r\n<tr><td>$row->nr</td><td>".$url[3]."</td><td><a target='shop' href='$row->url'>$row->title</a></td><td>$variant->variant_title</td><td>$variant->price</td></tr>";
  }
  else echo "\r\n<tr><td>$row->nr</td><td>".$url[3]."</td><td><a target='shop' href='$row->url'>$row->title</a></td><td></td><td>$row->price</td></tr>";
}
echo "</table>";
?>

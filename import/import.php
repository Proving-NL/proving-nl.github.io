<?php
require_once($_SERVER['DOCUMENT_ROOT']."/../vendor/autoload.php");
// $row = json_decode(file_get_contents('php://input'), true);
//
// $item = sqlsrv_fetch_object(aim()->sql_query("SELECT id FROM abisingen.dbo.article WHERE  leverancier='$row[supplier]' AND bestelCode = '$row[orderCode]'"));
// if (!$item) {
//   aim()->sql_query("INSERT INTO abisingen.dbo.article (leverancier,bestelCode) VALUES ('$row[supplier]','$row[orderCode]')");
//   $item = sqlsrv_fetch_object(aim()->sql_query("SELECT id FROM abisingen.dbo.article WHERE  leverancier='$row[supplier]' AND bestelCode = '$row[orderCode]'"));
// }
// aim()->sql_query("UPDATE abisingen.dbo.article
//   SET inkBruto = '$row[catalogPrice]'
//   ,description = '$row[description]'
//   ,fabrikant = '$row[manufacturer]'
//   ,artNr = '$row[artNr]'
//   ,inkKorting = '$row[purchaseDiscount]'
//   WHERE id = $item->id"
// );
// unset($row['host']);
// unset($row['class']);
// unset($row['keyname']);
// foreach($row as $name => $value) {
//   $value = str_replace("'","''",$value);
//   aim()->sql_query("EXEC item.attr @itemId=$item->itemId, @name='$name', @value='$value'");
// }

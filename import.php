<?php
require_once($_SERVER['DOCUMENT_ROOT']."/../vendor/autoload.php");
$content = file_get_contents('php://input');
if ($_GET['data'] === 'product') {
  file_put_contents("product.json", $content);
}
if ($_GET['data'] === 'purchaseproduct') {
  $data = json_decode($content);
  $rows = $data->rows;
  // $q="DECLARE @id INT;";
  foreach($rows as $row) {
    $description = str_replace("'","''",request('description',$row));
    $catalogPrice = request('catalogPrice',$row) ?: 0;
    $supplier = request('supplier',$row);
    $packageUnit = request('packageUnit',$row);
    $orderCode = request('orderCode',$row);
    $purchaseDiscount = request('purchaseDiscount',$row) ?: 0;
    $purchasePrice = request('purchasePrice',$row) ?: 0;
    unset($row->purchaseDiscount);
    unset($row->purchasePrice);
    $q="DECLARE @id INT;"."SELECT @id=id FROM abis_proving.dbo.article
    WHERE keyname = '$row->keyname'
    IF @id IS NULL
    BEGIN
      INSERT INTO abis_proving.dbo.article (keyname)
      VALUES ('$row->keyname')
      SET @id = scope_identity()
    END
    SELECT id,data FROM abis_proving.dbo.article WHERE id = @id";
    $dbrow = sqlsrv_fetch_object(aim()->sql_query($q));
    $row = array_replace(json_decode($dbrow->data, true) ?: [], (array)$row);
    $rowdata = str_replace("'","''",json_encode($row));
    aim()->sql_query("UPDATE abis_proving.dbo.article SET
    description = '$description'
    ,catalogPrice = '$catalogPrice'
    ,purchasePrice = '$purchasePrice'
    ,supplier = '$supplier'
    ,packageUnit = '$packageUnit'
    ,orderCode = '$orderCode'
    ,purchaseDiscount = '$purchaseDiscount'
    ,data = '$rowdata'
    WHERE id = $dbrow->id");
  }
  // die($q);
  die('klaar');
}
if ($_GET['data'] === 'img') {
  $content = base64_decode(explode('base64,',$content)[1]);
  $filename = __DIR__."/assets".$_GET["filename"];
  mkdir(dirname($filename), 0777, true);
  file_put_contents($filename, $content);
}

<?php
require_once($_SERVER['DOCUMENT_ROOT']."/../vendor/autoload.php");
$content = file_get_contents('php://input');
if ($_GET['data'] === 'product') {
  file_put_contents("product.json", $content);
}
if ($_GET['data'] === 'purchaseproduct') {
  $data = json_decode($content);
  $rows = $data->rows;
  $q="DECLARE @id INT;";
  foreach($rows as $row) {
    $description = str_replace("'","''",$row->description);
    $catalogPrice = $row->catalogPrice;
    $purchaseDiscount = $row->purchaseDiscount;
    unset($row->purchaseDiscount);
    $rowdata = str_replace("'","''",json_encode($row));
    $q.="SELECT @id=id FROM abis_proving.dbo.article
    WHERE supplier='$row->supplier' AND orderCode = '$row->orderCode'
    IF @id IS NULL
    BEGIN
      INSERT INTO abis_proving.dbo.article (supplier,orderCode)
      VALUES ('$row->supplier','$row->orderCode')
      SET @id = scope_identity()
    END
    UPDATE abis_proving.dbo.article SET
    description = '$description'
    ,catalogPrice = '$catalogPrice'
    ,purchaseDiscount = '$purchaseDiscount'
    ,data = '$rowdata'
    WHERE id = @id
    SET @id = NULL;";
  }
  aim()->sql_query($q);
  die('klaar');
}
if ($_GET['data'] === 'img') {
  $content = base64_decode(explode('base64,',$content)[1]);
  $filename = __DIR__."/assets".$_GET["filename"];
  mkdir(dirname($filename), 0777, true);
  file_put_contents($filename, $content);
}

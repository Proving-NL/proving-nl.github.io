<?php
require_once($_SERVER['DOCUMENT_ROOT']."/../vendor/autoload.php");
$input = file_get_contents('php://input');
$webdata = $data = json_decode($input,true);
$data['partNr'] = request('partNr', $data);
$data['description'] = request('description', $data);
$data['brand'] = request('brand', $data);
unset($webdata['purchaseDiscount']);
$webdata = str_replace("'","''",json_encode($webdata));
function tosql($s){return str_replace("'","''",$s);}
$row = sqlsrv_fetch_object(aim()->sql_query("SET NOCOUNT ON;DECLARE @id INT
EXEC abisingen.api.get_supplier_article_id @supplier='$data[supplier]',@orderCode='$data[orderCode]',@id=@id OUTPUT
SELECT catalogPrice,purchaseDiscount,data FROM abisingen.dbo.article WHERE id = @id
UPDATE abisingen.dbo.article SET
purchaseDiscount='$data[purchaseDiscount]',
catalogPrice='".tosql($data["catalogPrice"])."',
description='".tosql($data["description"])."',
brand='".tosql($data["brand"])."',
partNr='".tosql($data["partNr"])."',
data='$webdata'
WHERE id = @id
"));
$data = json_decode($row->data);
if (isset($row->catalogPrice)) $data->catalogPrice = $row->catalogPrice;
if (isset($row->purchaseDiscount)) $data->purchaseDiscount = $row->purchaseDiscount;
http_response(200, $data ?: []);

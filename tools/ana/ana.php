<?php
require_once($_SERVER['DOCUMENT_ROOT']."/../vendor/autoload.php");
$scanid = 2;
extract($_REQUEST);
$filter = isset($filter) ? "AND $filter" : "";
switch($request_type) {
  case 'html_rows': {
    http_response_query([
      "SELECT TOP 5 id FROM import.dbo.url where html is not null AND isnull(scanid,0)<>$scanid $filter order by loadDateTime
      --OFFSET 100 ROWS FETCH NEXT 500 ROWS ONLY",
    ]);
  }
  case 'html_row': {
    http_response_query([
      // "UPDATE import.dbo.url SET scandatetime = getdate(), scanid = $scanid WHERE id = $id",
      "SELECT * FROM import.dbo.url where id = $id",
    ]);
  }
  case 'data_write': {
    error_reporting(E_ALL ^ E_WARNING ^ E_NOTICE);
    $input = json_decode(file_get_contents('php://input'));
    $src = $input->src;
    $ext = pathinfo($src, PATHINFO_EXTENSION);
    $basename = basename($src);
    $set = implode(',',array_map(function($key,$value){return "[$key]='".str_replace("'","''",$value)."'";},array_keys((array)$input->options),array_values((array)$input->options)));

    http_response_query([
      "DECLARE @id INT,@purchaseId INT,@imgId INT",
      "UPDATE import.dbo.url SET scanid=$scanid WHERE id = $id",
      $input->partKeyGroupName
      ? "SELECT @purchaseId = id FROM abisingen.dbo.tblArtInk WHERE CONCAT(partKeyGroup,partKeyName) = '$input->partKeyGroupName'
      IF @purchaseId IS NULL SELECT @purchaseId = id FROM abisingen.dbo.tblArtInk WHERE keyGroup = '$input->packKeyGroup' AND keyName = '$input->partKeyGroupName'
      IF @purchaseId IS NULL BEGIN INSERT INTO abisingen.dbo.tblArtInk (keyGroup,keyName) VALUES ('$input->packKeyGroup','$input->partKeyGroupName') SET @id = scope_identity() END
      "
      : "SELECT @purchaseId = id FROM abisingen.dbo.tblArtInk WHERE keyGroup = '$input->packKeyGroup' AND keyName = '$input->packKeyGroup'
      IF @purchaseId IS NULL BEGIN INSERT INTO abisingen.dbo.tblArtInk (keyGroup,keyName) VALUES ('$packKeyGroup','$packKeyName') SET @id = scope_identity() END",
      $set ? "UPDATE abisingen.dbo.tblArtInk SET $set WHERE id = @purchaseId" : "",
      "UPDATE abisingen.dbo.tblArtInk
      SET image = CONCAT('https://aliconnect.nl/shared/multimedia/import/',I.id,'.$ext')
      FROM import.dbo.img I
      WHERE I.src LIKE '%$basename%' AND abisingen.dbo.tblArtInk.id = @purchaseId",
      "SELECT * FROM abisingen.dbo.tblArtInk WHERE id = @purchaseId",
    ]);
  }
}
// if ($_SERVER['REQUEST_METHOD'] === 'GET') {
//
//
//
//
//   if (isset($keyName)) {
//     $img = sqlsrv_fetch_object(aim()->sql_query("SELECT TOP 1 * FROM import.dbo.img WHERE basename LIKE '%/$keyName%' ORDER BY src"));
//     if ($img) {
//       if (!$img->newname) {
//         $ext = pathinfo($img->basename, PATHINFO_EXTENSION);
//         $img->newname = strtolower("/shared/multimedia/$keyGroup-$keyName.$ext");
//         // rename("/aliconnect/public/shared/multimedia/import/$img->id-$img->basename","/aliconnect/public" . $img->newname));
//         // aim()->sql_query("UPDATE import.dbo.img SET newname = '$img->newname' WHERE id = $img->id");
//       }
//       // echo "<img src='https://aliconnect.nl$img->newname'>";
//       // die();
//       // http_response(200, $img);
//     }
//     aim()->sql_query("UPDATE abisingen.dbo.tblArt1 SET scanid=$scanid WHERE id = $id");
//     http_response(200, $img);
//   }
//   http_response_query(
//     "SELECT id,keyGroup,keyName
//     FROM abisingen.dbo.tblArt1 a
//     WHERE keygroup <> 'proving'
//     AND thumbnail is null
//     AND partprice is null
//     AND packprice is null
//     AND isnull(scanid,0) <> $scanid
//     "
//   );
//
//   // switch($request_type) {
//   //   case 'img': {
//   //     $img = sqlsrv_fetch_object(aim()->sql_query("SELECT TOP 1 * FROM import.dbo.img WHERE basename LIKE '%$keyname%' ORDER BY src"));
//   //     if ($img) {
//   //       echo "$img->basename $img->src";
//   //       if (!$img->newname) {
//   //         $ext = pathinfo($img->basename, PATHINFO_EXTENSION);
//   //         rename("/aliconnect/public/shared/multimedia/import/$img->id-$img->basename","/aliconnect/public" . $img->newname = strtolower("/shared/multimedia/$row->keygroup-$row->keyname.$ext"));
//   //         aim()->sql_query("UPDATE import.dbo.img SET newname = '$img->newname' WHERE id = $img->id");
//   //       }
//   //       echo "<img src='https://aliconnect.nl$img->newname'>";
//   //       // die();
//   //     }
//   //     aim()->sql_query("UPDATE abisingen.dbo.tblArt1 SET scanid=$scanid WHERE id = $row->id");
//   //   }
//   //   default: {
//   //     http_response_query(
//   //       "SELECT id,keygroup,keyname
//   //       FROM abisingen.dbo.tblArt1 a
//   //       WHERE keygroup <> 'proving'
//   //       AND thumbnail is null
//   //       AND partprice is null
//   //       AND packprice is null
//   //       AND isnull(scanid,0) <> $scanid
//   //       "
//   //     );
//   //   }
//   // }
// }

<?php
$client_id = 'cac652da-dcdc-455a-a0de-e32bac08ea06';
require_once($_SERVER['DOCUMENT_ROOT']."/../vendor/autoload.php");
aim()->api();
debug($aim);
// $path = str_replace('/api','',$_SERVER['REQUEST_URI']);
// $paths = [
//   "/inkoop/order"=> "WITH
//   orders as (
//     SELECT * from bonnen1 where datum > dateadd(year,-2, getdate())
//   ),
//   regels as (
//     SELECT distinct artid from orderregels where pakbonid in (select pakbonid from orders)
//   ),
//   art AS (
//     SELECT
//     RIGHT(10000000000000 + A.artID, 9) AS ArtNr
//     ,'' AS Aantal
//     ,SUBSTRING(UPPER(ISNULL(P.merk,'?')),1,3) AS Merk
//     ,ISNULL(P.artNr,'?') AS Prodcode
//     ,SUBSTRING(UPPER(ISNULL(A.leverancier,'?')),1,3) AS Lev
//     ,A.Bestelcode AS Bestelcode
//     ,ISNULL(A.eenheid,'stuk') AS VerpakEenheid
//     ,A.aantalstuks AS VerpakAantal
//     ,ISNULL(P.Merk,'') + ', ' + P.Tekst + ISNULL(', '+CONVERT(VARCHAR(50),P.Inhoud) + ISNULL(P.InhoudEenheid,'') ,'') AS Omschrijving
//     ,A.inkBruto AS Bruto
//     ,A.inkKorting AS Korting
//     ,A.inkNetto AS Netto
//     FROM artikelenalles A
//     INNER JOIN producten P ON P.prodid=A.prodid
//     WHERE A.artid IN (SELECT artid FROM regels)
//   )
//   SELECT * FROM art	ORDER BY lev,merk,Prodcode
//   ",
// ];
// aim()->sql_query("USE abisingen");
// $data=[];
// $res = aim()->sql_query($paths[$path]);
// while ($res){
//   $rows=[];
//   while ($row = sqlsrv_fetch_object($res)) $rows[] = $row;
//   $data[]=$rows;
//   $res = sqlsrv_next_result($res);
// }
// die(json_encode($data));

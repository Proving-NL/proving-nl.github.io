<?php
require_once($_SERVER['DOCUMENT_ROOT']."/../vendor/autoload.php");
echo "<h1>Dubbele bestelcodes</h1>";
$res = aim()->sql_query("SELECT bestelcode,COUNT(0)aantal FROM abisingen.dbo.artikelenalles GROUP BY bestelcode HAVING COUNT(0)>1 ORDER BY bestelcode");
echo "<table>";
$i = 1;
while ($row = sqlsrv_fetch_object($res)) {
  echo "<tr><td>$i</td>";
  foreach ($row as $key => $value) echo "<td>$value</td>";
  echo "</tr>";
  $i++;
}
echo "</table>";


echo "<h1>Geen leverancier</h1>";
$res = aim()->sql_query("SELECT bestelcode FROM abisingen.dbo.artikelenalles WHERE leverancier IS NULL ORDER BY bestelcode");
echo "<table>";
$i = 1;
while ($row = sqlsrv_fetch_object($res)) {
  echo "<tr><td>$i</td>";
  foreach ($row as $key => $value) echo "<td>$value</td>";
  echo "</tr>";
  $i++;
}
echo "</table>";


die('OPRUIM');

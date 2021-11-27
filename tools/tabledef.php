<?php
// <style>textarea{width:100%;height:500px;}</style>
require_once($_SERVER['DOCUMENT_ROOT']."/../vendor/autoload.php");
error_reporting(E_ALL & ~E_NOTICE);
$filename = 'C:\Users\maxva\Alicon\Proving BD - Documenten\aliconnect\proving-nl.config\yaml\proving-nl.config.js.yaml';
$filename = 'C:\Users\max\Alicon\Proving BD - Documenten\aliconnect\proving-nl.config\yaml\proving-nl.config.js.yaml';
// $content = file_get_contents($filename);
$config = yaml_parse_file($filename);
// die($content);
// $config = yaml_parse_file('tabledef.yaml');
$s1=$s2=$s3='';

aim()->sql_query("USE [abisingen]");
// $sql = "USE [abisingen]\nGO\n";
// aim()->sql_query("USE abisingen");
$abis_web_doc = "";
foreach ($config['components']['schemas'] as $schemaName => $schema) {
  $abis_web_doc.="# $schemaName".PHP_EOL;
  if ($schema['abisPC']) {
    $abis_pc_doc.="# ".$schema['abisPC'].PHP_EOL;
    $abis_pc_doc.="- schema: `$schemaName`".PHP_EOL;
  }
  if (isset($schema['srcTablename']) && $schema['properties']) {
    $sql_schema = "CREATE VIEW [api].[$schemaName] AS
    SELECT
      '$schemaName' AS schemaName".PHP_EOL;
      // echo "$schemaName";
    foreach ($schema['properties'] as $propertyName => $property) {
      if (preg_match('/\(/', $property['title'])) {
        $abis_pc_doc .= "- **".get_item($property,'title')."**, `$propertyName`: ";
        if ($property['readOnly']) $abis_pc_doc .= "_readonly_ ";
        $abis_pc_doc .= get_item($property,'description') . ".";
        if ($options = get_item($property,'options')) {
          $abis_pc_doc .= " Opties: ";
          foreach($options as $value => $title) {
            $abis_pc_doc .= "**$value**=$title; ";
          }
        }
        $abis_pc_doc .= PHP_EOL;
      }
      $columnName = get_item($property,'columnName') ?: $propertyName;
      $tableName = get_item($property,'tableName') ?: $schemaName;
      $sql_schema.=str_pad("    ,$tableName.[$columnName]",40)." AS $propertyName".PHP_EOL;
    }
    $sql_schema.="FROM $schema[srcTablename] AS $schemaName".PHP_EOL;
    if (isset($schema['join'])) {
      foreach ($schema['join'] as $join) {
        $sql_schema.="LEFT OUTER JOIN $join[tableName] ON $join[tableName].$join[columnName] = $schemaName.$join[srcName]".PHP_EOL;
      }
    }
    sqlsrv_query( aim()->conn, "DROP VIEW api.$schemaName");
    sqlsrv_query( aim()->conn, $sql_schema);
  }
}

// file_put_contents('c:/aliconnect/webroot/aliconnect/aliconnect.sql/abis/apigen.sql', $sql);
file_put_contents('../docs/Handboek-Abis-PC-Velden.md', $abis_pc_doc);
file_put_contents('../docs/Handboek-Abis-Web-Velden.md', $abis_web_doc);
// aim()->sql_query("USE abisingen");
die();
// aim()->sql_query($sql);

die("<pre>$sql</pre>");


function script_select($table_schema,$table_name,$name=null){
  $name = $name ?: $table_name;
  $rows=[];
  aim()->sql_query("USE abisingen");
  $res = aim()->sql_query("SELECT column_name
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE table_schema = '$table_schema' and TABLE_NAME = '$table_name'
  ORDER BY ORDINAL_POSITION");
  $s1=$s2=$s3='';
  while ($row = sqlsrv_fetch_object($res)) {
    $s1.=str_pad(",$name.[$row->column_name]",40)." AS ".str_replace(" ","",lcfirst($row->column_name)).PHP_EOL;
    $s2.=str_pad(",$name.[$row->column_name]",40)." AS $name".str_replace(" ","",ucfirst($row->column_name)).PHP_EOL;
    $s3.="$row->column_name:".PHP_EOL;
  };
  echo "<textarea>$s1</textarea><textarea>$s2</textarea><textarea>$s3</textarea>";
}
// script_select('dbo','bedrijven','account');
// script_select('api','company','account');
// script_select('dbo','klanten1','client');
// script_select('dbo','bonnen1','salesorder');
// script_select('dbo','fakturen1','invoice');
// script_select('dbo','producten','prod');
script_select('dbo','artikelenalles','art');
// script_select('api','client');

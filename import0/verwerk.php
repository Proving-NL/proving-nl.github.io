<?php
require_once($_SERVER['DOCUMENT_ROOT']."/../vendor/autoload.php");
if ($tag = request('tag', $_GET)){
  http_respoonse(200, sqlsrv_fetch_object(aim()->sql_query("SELECT * FROM abisingen.dbo.article WHERE tag='$tag'")));
}
die('JA');


$config = yaml_parse_file('import.yaml');
foreach($config['import'] as $import) {
  foreach($import['tabs'] as $tab) {
    $data = json_decode(file_get_contents("data/$import[filename] - $tab[tabname].json"));
    $top = $tab['colRow']-1;
    $thead = $data[$top];
    $cols = array_map(function($v)use($thead){return array_search($v,$thead);}, $tab['cols']);
    foreach ($data as $r => $row) {
      if ($r>$top) {
        $data = array_filter(array_map(function($i)use($row){return $row[$i];}, $cols));
        $article = $tab['data'];
        $tag = request('artPrefix', $tab).request('artNr', $data);
        $keys = [
          'catalogPrice',
          'description',
          // 'palletQuantity',
        ];
        foreach($keys as $key) {
          if (isset($data[$key])) {
            $article[$key] = $data[$key];
            unset($data[$key]);
          }
        }
        $article['data'] = json_encode($data);
        $values = implode(',',array_map(function($k,$v){return "[$k]='".str_replace("'","''",$v)."'";}, array_keys($article), array_values($article)));

        $item = sqlsrv_fetch_object(aim()->sql_query("SELECT id FROM abisingen.dbo.article WHERE tag='$tag'"));
        if (!$item) {
          aim()->sql_query("INSERT INTO abisingen.dbo.article (tag) VALUES ('$tag')");
          $item = sqlsrv_fetch_object(aim()->sql_query("SELECT id FROM abisingen.dbo.article WHERE tag='$tag'"));
        }
        aim()->sql_query($q="UPDATE abisingen.dbo.article SET $values WHERE id = $item->id");
        // debug($q,$tag,$values,$article,$item);

      }
    }
  }
}
$filename = $_GET['filename'];

<?php
$content = file_get_contents('php://input');
$content = base64_decode(explode('base64,',$content)[1]);
$filename = __DIR__."/multimedia".$_GET["filename"];

mkdir(dirname($filename), 0777, true);
file_put_contents($filename, $content);
// die(dirname($filename));
//
// function file_get_contents_curl($url) {
//     $ch = curl_init();
//
//     curl_setopt($ch, CURLOPT_HEADER, 0);
//     curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//     curl_setopt($ch, CURLOPT_URL, $url);
//
//     $data = curl_exec($ch);
//     curl_close($ch);
//
//     return $data;
// }
//
// $data = file_get_contents_curl('https://multimedia.3m.com/mws/media/1207629Z/scotch-glass-cloth-tape-69-white-3-4-in-x-66-ft-1-in-core.jpg');
//
// $fp = 'logo-1.png';
//
// file_put_contents( $fp, $data );
// echo "File downloaded!";
//
//
// // $options = [
// //   CURLOPT_URL => "https://multimedia.3m.com/mws/media/1147122Z/27-glass-cloth-tape-19mm-x-55m-crop.jpg",
// //   CURLOPT_RETURNTRANSFER => true,
// //   CURLOPT_SSL_VERIFYPEER => false,
// // ];
// // $curl = curl_init();
// // curl_setopt_array($curl, $options);
// // $res = curl_exec($curl);
// // curl_close($curl);
// // echo $res;
// //
// // echo "hoi";
// // file_put_contents("scotch-glass-cloth-tape-69-white-3-4-in-x-66-ft-1-in-core.jpg",file_get_contents("https://multimedia.3m.com/mws/media/1207629Z/scotch-glass-cloth-tape-69-white-3-4-in-x-66-ft-1-in-core.jpg"));
// //file_put_contents("scotch-glass-cloth-tape-69-white-3-4-in-x-66-ft-1-in-core.jpg","JA");

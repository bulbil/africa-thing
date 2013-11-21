<?php
header("Content-type: text/plain");

$subject = $_POST['headers']['Subject'];
$from = $_POST['headers']['From'];
$to = $_POST['headers']['To'];
$plain = $_POST['plain'];

// $to = $_POST['envelope']['to'];
// $html = $_POST['html'];
// $reply = $_POST['reply_plain'];

if (isset($to)){
  header("HTTP/1.0 200 OK");
	$handle = fopen("data/emails.txt", "a");
	fwrite($handle, post_format($subject,'subject') . "," 
                  . post_format($from) . ","
                  . post_format($plain,'plain') . "\n");
	fclose($handle);
}else{
  header("HTTP/1.0 403 OK");
  echo('user not allowed here');
}
exit;

function post_format($str, $p = 'default') {
  $str = trim($str);

  switch($p){
    case('default'): return $str;
    case('from'): return $str;
    case('subject'): return addslashes(strtolower($str));
    case('plain'): return preg_replace('/\n+|[\n\r]+/', " ", $str);
  }
}
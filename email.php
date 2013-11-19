<?php
  header("Content-type: text/plain");

  $to = $_POST['envelope']['to'];
  $subject = $_POST['headers']['Subject'];
  $plain = $_POST['plain'];
  $html = $_POST['html'];
  $reply = $_POST['reply_plain'];

  if (isset($to)){
    header("HTTP/1.0 200 OK");
	$handle = fopen('data/emails.txt', "a");
	fwrite($handle, $subject . '\n');
	fclose($handle);
	}else{
    header("HTTP/1.0 403 OK");
    echo('user not allowed here');
  }
  exit;
?>
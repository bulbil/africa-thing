<?php
  header("Content-type: text/plain");

  $to = $_POST['envelope']['to'];
  $subject = $_POST['headers']['Subject'];
  $plain = $_POST['plain'];
  $html = $_POST['html'];
  $reply = $_POST['reply_plain'];

	header("HTTP/1.0 200 OK");
	echo('success');
	var_dump($_POST);

  exit;
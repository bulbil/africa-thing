<?php
session_start();
header("Content-type: text/plain");

var_dump($_SESSION);

if(count($_POST) > 0){
	$to = $_POST['envelope']['to'];
	$subject = $_POST['headers']['Subject'];
	$plain = $_POST['plain'];
	$html = $_POST['html'];
	$reply = $_POST['reply_plain'];
}

if (isset($to)){
$_SESSION['emails'][] = $_POST;
var_dump($_SESSION);
header("HTTP/1.0 200 OK");
header('email-test.php');
exit;
} else {echo('what');}

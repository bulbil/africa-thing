<?php
session_start();
header("Content-type: text/plain");

var_dump($_SESSION);
$to = $_POST['envelope']['to'];
$subject = $_POST['headers']['Subject'];
$plain = $_POST['plain'];
$html = $_POST['html'];
$reply = $_POST['reply_plain'];

if (isset($to)){
$_SESSION['emails'][] = $_POST;
header("HTTP/1.0 200 OK");
header('email-test.php');
}
exit;
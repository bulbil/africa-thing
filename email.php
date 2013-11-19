<?php

header("Content-type: text/plain");

$to = $_POST['envelope']['to'];
$subject = $_POST['headers']['Subject'];
$plain = $_POST['plain'];
$html = $_POST['html'];
$reply = $_POST['reply_plain'];

if ($to == 'd1c1cc8ff02675728bf5@cloudmailin.net'){
header("HTTP/1.0 200 OK");
echo('success');
}else{
header("HTTP/1.0 403 OK");
echo('user not allowed here');
}
<?php
$email_text = $_POST['message'];
$email_sender = $_POST['from'];
$email_subject = $_POST['email'];

$handle = fopen('files/emails.txt', "a");
fwrite($handle, $email_subject . "|" . $email_text . "|" . $email_sender . "\n");
fclose($handle);
?>

<!-- // session_start();

// if(count($_POST) > 0){

// 	if (isset($to)){

// 	header("Content-type: text/plain");

// 	$to = $_POST['envelope']['to'];
// 	$subject = $_POST['headers']['Subject'];
// 	$plain = $_POST['plain'];
// 	$html = $_POST['html'];
// 	$reply = $_POST['reply_plain'];

// 	$_SESSION[] = 'hi';
// 	var_dump($_SESSION);
// 	header("HTTP/1.0 200 OK");
// 	header('email-test.php');
// 	exit;
// 	} else { 

// 		echo('what'); 

// 	}
// } -->
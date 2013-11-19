<?php

if(count($_POST) > 0) {

	if(count($_POST) > 1) {
		$data = implode($_POST);
		$email_text = $_POST['plain'];
		$email_recepient = $_POST['headers']['To'];
		$email_sender = $_POST['headers']['From'];
		$email_subject = $_POST['headers']['Subject'];

		$handle = fopen('data/emails.txt', "a");
		fwrite($handle, $confirm . " | " . $data . "\n");
		fclose($handle);
	}else{
		$test = $_POST['teste'];
		$handle = fopen('data/emails.txt', "a");
		fwrite($handle, $test . "\n");
		fclose($handle);
	}

}
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
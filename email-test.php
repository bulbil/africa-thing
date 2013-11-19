<?php
session_start();

if(count($_POST) > 0) {

	$test = $_POST['teste'];

	$handle = fopen('data/emails.txt', "a");
	fwrite($handle, $test . "\n");
	fclose($handle);

}

$html = "<form action='email-test.php' method='post'>";
$html .= "<input type='hidden' name='teste' value='chunk'>";
$html .= "<input type='submit'>";
$html .= "</form>";

echo $html;
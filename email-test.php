<?php
session_start();

include 'email.php';

var_dump($_SESSION);
var_dump($_POST);

$html = "<form action='email-test.php' method='post'>";
$html .= "<input type='hidden' name='teste' value='chunk'>";
$html .= "<input type='submit'>";
$html .= "</form>";

echo $html;
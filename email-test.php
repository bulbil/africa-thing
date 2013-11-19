<?php
session_start();

$html = "<form action='email.php' method='post'>";
$html .= "<input type='hidden' name='teste' value='chunk'>";
$html .= "<input type='submit'>";
$html .= "</form>";

echo(count($_POST));
echo $html;
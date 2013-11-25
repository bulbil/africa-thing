<?php
session_start();
$handle = fopen("data/emails.txt", "r");
$columns = array('subject', 'from', 'plain');

while($row = fgetcsv($handle)) {

	if(count($row) > 1) $csv[] = array_combine($columns, $row);
}

fclose($handle);

$row_check = (isset($_SESSION['row_check'])) ? $_SESSION['row_check'] : count($csv);

$data = array('row_count' => count($csv), 'row_check' => $row_check, 'emails' => $csv);

$json = json_encode($data);

echo $json;

$_SESSION['row_check'] = count($csv);
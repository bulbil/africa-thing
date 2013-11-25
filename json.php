<?php
session_start();
$handle = fopen("data/emails.txt", "r");
$columns = array('subject', 'from', 'plain');

$i = 0;
while($row = fgetcsv($handle)) {

	if(count($row) > 1 && $i < 10) $csv[] = array_combine($columns, $row);
	$i++;
}

fclose($handle);

$row_check = (isset($_SESSION['row_check'])) ? $_SESSION['row_check'] : $i;
unset($_SESSION['row_check']);

$data = array('row_count' => $i, 'row_check' => $row_check, 'emails' => $csv);

$json = json_encode($data);

echo $json;

$_SESSION['row_check'] = $i;
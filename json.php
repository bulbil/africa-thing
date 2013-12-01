<?php
session_start();
header("Content-type: text/plain");

$handle = fopen("data/emails.txt", "r");
$columns = array('subject', 'from', 'plain');

$i = 0;
while($row = fgetcsv($handle)) {

	$csv[] = array_combine($columns, $row);
	$i++;
}

fclose($handle);

if(count($csv > 10)) { 
	$csv = array_chunk(array_reverse($csv), 10);
	$csv = $csv[0];
}

$row_check = (isset($_SESSION['row_check'])) ? $_SESSION['row_check'] : $i;
unset($_SESSION['row_check']);

$data = array('row_count' => $i, 'row_check' => $row_check, 'emails' => $csv);

$json = json_encode($data);

echo $_GET['callback'] . '(' . $json . ')';

$_SESSION['row_check'] = $i;
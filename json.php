<?php
$columns = array('subject', 'from', 'plain');
$handle = fopen("data/emails.txt", "r");

while($row = fgetcsv($handle)) {
	if(count($row) > 1)	$csv[] = array_combine($columns, $row);
}

fclose($handle);

$json = json_encode($csv);
echo $json;
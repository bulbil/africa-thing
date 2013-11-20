<?php

  	$handle = fopen("data/emails.txt", "r");

  	while($subject = fgets($handle)) {

	  	$subjects[] = trim($subject);
  	}

  	fclose($handle);
  	$json = json_encode($subjects);
  	echo $json;
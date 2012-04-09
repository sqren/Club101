<?php
function readFolder($folder){
	$files = scandir($folder);

	// remove ".." and "."
	$key_parent_dir = array_search("..", $files);
	$key_current_dir = array_search(".", $files);		
	unset($files[$key_current_dir]);
	unset($files[$key_parent_dir]);

	// add folder names in front:
	foreach ($files as $i => $file) { 
	    $files[$i] = array("url"=>$folder . $file); 
	}

	// randomize
	shuffle($files);
	
	// return json map
	return json_encode($files);
}
?>
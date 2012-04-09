<?php
	include("lib.php");

	// get list of files
	$commands = readFolder("sounds/commands/");
	$cheers = readFolder("sounds/cheers/");
?>
<!DOCTYPE html>
<html>
<head>
	<title></title>
	<meta http-equiv="Content-type" content="text/html; charset=utf-8">
	<link rel="stylesheet" type="text/css" href="stylesheets/screen.css">
	<link rel="stylesheet" href="stylesheets/south-street/jquery-ui-1.8.18.custom.css">	
	<script src="js/jdataview.js"></script>
	<script src="js/jquery.min.js"></script>
	<script src="js/jquery-ui-1.8.18.custom.min.js"></script>
	<script src="js/player.js"></script>	
	<script src="js/club.js"></script>
	<script type="text/javascript">
		var songPlayer, commandPlayer, cheersPlayer, club;
		$(document).ready(function() {
		    songPlayer = new SongPlayer();
		    commandPlayer = new CommandPlayer(<?php echo $commands ?>);
		    cheersPlayer = new CheersPlayer(<?php echo $cheers ?>);
			club = new Club();
		});	
	</script>
	<script src="js/screen.js"></script>
</head>
<body class="bp">
	<div class="container">

		<h1 class="title">Club 101</h1>
		<p class="sub-title">En club sejere</p>		

		<div class="progress-bar">
			<div class="controller-container">
				<p class="play-pause"></p>
				<a class="view-playlist" href="#">Se spilleliste</a>
				<input type="file" value="upload files" class="upload-song" multiple="multiple" />				
			</div>
			<div class="progress-bar-inside"></div>
			<p class="timer-seconds">60</p>		
		</div>

		<div class="club-number">Club #<span>0</span></div>
		<div class="current-song">Introsang</div>
	</div>

	<div id="playlist-dialog" title="Spilleliste">
		<div class="playlist"></div>
	</div>
</body>
</html>
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
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js"></script>
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
				<p class="play-pause initially-hidden"></p>
				<a class="view-playlist initially-hidden" href="#">Se spilleliste</a>
			</div>
			<div class="progress-bar-inside"></div>
			<div class="content-inside">
				<div class="init-app">
					<p class="hint">Vælg musik fra din computer for at starte</p>
					<input type="file" value="upload files" class="upload-song" multiple="multiple" />
				</div>
				<p class="timer-seconds initially-hidden">60</p>		
			</div>
		</div>

		<div class="club-number initially-hidden">Club #<span>0</span></div>
		<div class="current-song initially-hidden">&nbsp;</div>
	</div>

	<div id="playlist-dialog" title="Spilleliste">
		<div class="playlist"></div>
	</div>
</body>
</html>
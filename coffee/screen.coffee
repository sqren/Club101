jQuery ->
	# music controller: jQueryUI button style
	$( ".controls" ).button
	  text: false 
	  icons:
	    primary: "ui-icon-play"
	.click => club.toggleControls()

	# add local files to playlist
	$(".songUpload").change =>
	  $(".songUpload").fadeOut();

	  # reset playlist
	  club.songPlayer.setPlaylist()

	  # add local songs to playlist
	  files = $(".songUpload")[0].files      
	  window.URL = window.webkitURL if (window.webkitURL)
	  @songPlayer.addToPlaylist window.URL.createObjectURL(file) for file in files
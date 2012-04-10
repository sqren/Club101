jQuery ->  

  # add local files to playlist
  $(".upload-song").change =>
    # initial song upload will move upload element to dialog window
    if $(this).parent('.controller-container')
      $('.init-app').hide();
      $(".upload-song").prependTo('#playlist-dialog');
      $(".initially-hidden").removeClass('initially-hidden');
      initPlayButton()

    # add local songs to playlist
    files = $(".upload-song")[0].files       

    # chrome workaround
    window.URL = window.webkitURL if (window.webkitURL)

    # set playlist and song titles    
    playlist = []
    for file in files       
      lastDotPos = file.name.lastIndexOf(".")
      title = file.name.substring(0, lastDotPos)
      url = window.URL.createObjectURL(file)
      playlist.push({title: title, url: url})
    songPlayer.setPlaylist(playlist)

  # view playlist on click
  $(".view-playlist").click ->
    songPlayer.outputPlaylist()
    $( "#playlist-dialog" ).dialog
      modal: true
      resizable: false

    # for file in files     
    #   binaryReader = new FileReader()
    #   binaryReader.readAsBinaryString(file)

    #   binaryReader.onloadend = ->
    #     dv = new jDataView(this.result)

    #     if (dv.getString(3, dv.byteLength - 128) == 'TAG')
    #       title = dv.getString(30, dv.tell());
    #       # artist = dv.getString(30, dv.tell());
    #       # album = dv.getString(30, dv.tell());
    #       # year = dv.getString(4, dv.tell());
    #       console.log(title);

initPlayButton = ->
  # music controller: jQueryUI button style
  $( ".play-pause" ).button
    text: false 
    icons:
      primary: "ui-icon-play"
  .click -> 
    # start
    if songPlayer.unstarted()
      songPlayer.start()
      console.log("unstarted")

    # resume
    else if songPlayer.current.paused is true      
      songPlayer.play()
      console.log("resume")

    # pause
    else
      songPlayer.pause()
      console.log("pause")
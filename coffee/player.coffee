class Player
  constructor: (playlist = []) ->    
    @playlist = playlist
    @current = new Audio()
    @track_number = 0

  # check if unstarted
  unstarted: ->
    if @current.src != ""
      return false
    else
      return true

  # add playlist
  setPlaylist: (playlist = []) ->
    @playlist = @playlist.concat(playlist)

  resetPlaylist: ->
    @playlist = []  

  play: ->    
    console.log "Play() " + @current.src
    @current.play()

  pause: ->    
    @current.pause() if @current.paused is false   
    return this   

  setTrack: (track) ->
    @track_number = track
    @current.src = @playlist[@track_number]["url"]
    return this

  incrementTrack: ->
    # restart playlist or move to next track
    if @track_number is (@playlist.length - 1)
      @setTrack(0)
      @current.src = @playlist[0]["url"]
    else
      @track_number++
      @current.src = @playlist[@track_number]["url"]    

    return this

  next: (callback = null) ->
    # pause current track, switch to next
    @pause().incrementTrack()

    # start track when metadata loaded (duration)
    loadMeta = setInterval (=>
      if @current.duration > 0        
        clearInterval(loadMeta)

        # return duration with callback
        callback(@current.duration) if callback?

        # play next song
        @play()
    ), 50

    # debugging
    console.log "Changed track to: " + @playlist[@track_number]["title"]

  setVolume: (volume) ->
    console.log "Volume change to: #{volume} "
    @current.volume = volume


# songplayer with specific label ##################################################################
class @SongPlayer extends Player
  start: ->
    console.log "Start()"   
    @setTrack(0).setLabel().play()

  setLabel: ->
    $(".current-song").html @playlist[@track_number]["title"]
    return this

  next: ->
    super
    @setLabel()
    return this

  play: ->
    super

    # update UI
    $( ".play-pause" ).button(
      "option", "icons", primary: "ui-icon-pause"
    )

  pause: ->
    super
    # update UI
    $( ".play-pause" ).button(
      "option", "icons", primary: "ui-icon-play"
    )
    return this

  setPlaylist: (newplaylist = []) -> 
    super    
    @outputPlaylist()

  outputPlaylist: ->
    # clear content in div
    $('#playlist-dialog .playlist').html('')

    # add songs to div
    for song, i in @playlist
      elm = $('<p></p>').html("#" + i + ": " + song['title'])
      $(elm).addClass("current") if club.clubNumber == i
      $('#playlist-dialog .playlist').append(elm)


class @CommandPlayer extends Player


class @CheersPlayer extends Player
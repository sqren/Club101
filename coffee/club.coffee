class @Club  
  constructor: () ->
    # options
    @commandProbability = 0.3 # higher means more often commands
    @secondsPerClub = 60 # number of seconds per club

    # initial setup 
    @clubNumber = 0 # the club to start from    
    @setTimerSeconds @secondsPerClub
    @decoderCount = 0

    # countdown every second
    setInterval (=>
      
      return false if songPlayer.current.paused

      # workaround for weird "not-playin" incident
      if songPlayer.current.webkitAudioDecodedByteCount == @webkitAudioDecodedByteCount && songPlayer.current.webkitAudioDecodedByteCount < 50000
        console.log "Problem loading audio: " + songPlayer.current.webkitAudioDecodedByteCount
        @decoderCount++
        if @decoderCount >= 5
          @decoderCount = 0
          console.log "--- Restarting file ---"
          songPlayer.pause().play()

      @webkitAudioDecodedByteCount = songPlayer.current.webkitAudioDecodedByteCount    

      if @clubNumber > 100
        $( ".play-pause" ).button "disable"
        @pause()
        alert "Er du fuld nu?"

      # decrement second by one and update UI accordingly
      @decrementSecond()

      # say cheers!
      cheersPlayer.next() if @timerSeconds is 1        

      # end of song; change to next
      if @timerSeconds is 0
        @decoderCount = 0
        songPlayer.next()
        @setTimerSeconds @secondsPerClub
        @setCommand()
        @incrementClubNumber()
      
      # play command depending on probability
      if @timerSeconds is @commandSecond && @commandSecond > 0      
        
        commandPlayer.next( (duration, url) =>

          # decrease volume for song
          songPlayer.setVolume 0.2

          # play command
          commandPlayer.play url
          
          # increase volume for song again and pause command
          setTimeout ( =>
            songPlayer.setVolume 1
            commandPlayer.pause()
          ), duration*1000
        )
    ), 1000

  setSecond: (second) ->
    @timerSeconds = second

  decrementSecond: ->
    # calculations
    @timerSeconds--
    progressBarWidth = (@timerSeconds / @secondsPerClub) * 100    
    
    # UI
    $(".timer-seconds").html @timerSeconds    
    $(".progress-bar-inside").css "width", progressBarWidth + "%"    

  incrementClubNumber: ->
    @clubNumber++
    $(".club-number span").html @clubNumber

  setTimerSeconds: (@timerSeconds) ->

  setCommand: ->
    commandProbabilityScore = Math.random()

    if commandProbabilityScore < @commandProbability
      @commandSecond = Math.floor(37 * Math.random()) + 13
      console.log "Command will be played at " + @commandSecond
    else
      @commandSecond = 0
      console.log "Command will NOT be played"
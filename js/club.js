(function() {

  this.Club = (function() {

    function Club() {
      var _this = this;
      this.commandProbability = 0.3;
      this.secondsPerClub = 60;
      this.clubNumber = 0;
      this.setTimerSeconds(this.secondsPerClub);
      this.decoderCount = 0;
      setInterval((function() {
        if (songPlayer.current.paused) return false;
        if (songPlayer.current.webkitAudioDecodedByteCount === _this.webkitAudioDecodedByteCount && songPlayer.current.webkitAudioDecodedByteCount < 50000) {
          console.log("Problem loading audio: " + songPlayer.current.webkitAudioDecodedByteCount);
          _this.decoderCount++;
          if (_this.decoderCount >= 5) {
            _this.decoderCount = 0;
            console.log("--- Restarting file ---");
            songPlayer.pause().play();
          }
        }
        _this.webkitAudioDecodedByteCount = songPlayer.current.webkitAudioDecodedByteCount;
        if (_this.clubNumber > 100) {
          $(".play-pause").button("disable");
          _this.pause();
          alert("Er du fuld nu?");
        }
        _this.decrementSecond();
        if (_this.timerSeconds === 1) cheersPlayer.next();
        if (_this.timerSeconds === 0) {
          _this.decoderCount = 0;
          songPlayer.next();
          _this.setTimerSeconds(_this.secondsPerClub);
          _this.setCommand();
          _this.incrementClubNumber();
        }
        if (_this.timerSeconds === _this.commandSecond && _this.commandSecond > 0) {
          return commandPlayer.next(function(duration, url) {
            songPlayer.setVolume(0.2);
            commandPlayer.play(url);
            return setTimeout((function() {
              songPlayer.setVolume(1);
              return commandPlayer.pause();
            }), duration * 1000);
          });
        }
      }), 1000);
    }

    Club.prototype.setSecond = function(second) {
      return this.timerSeconds = second;
    };

    Club.prototype.decrementSecond = function() {
      var progressBarWidth;
      this.timerSeconds--;
      progressBarWidth = (this.timerSeconds / this.secondsPerClub) * 100;
      $(".timer-seconds").html(this.timerSeconds);
      return $(".progress-bar-inside").css("width", progressBarWidth + "%");
    };

    Club.prototype.incrementClubNumber = function() {
      this.clubNumber++;
      return $(".club-number span").html(this.clubNumber);
    };

    Club.prototype.setTimerSeconds = function(timerSeconds) {
      this.timerSeconds = timerSeconds;
    };

    Club.prototype.setCommand = function() {
      var commandProbabilityScore;
      commandProbabilityScore = Math.random();
      if (commandProbabilityScore < this.commandProbability) {
        this.commandSecond = Math.floor(37 * Math.random()) + 13;
        return console.log("Command will be played at " + this.commandSecond);
      } else {
        this.commandSecond = 0;
        return console.log("Command will NOT be played");
      }
    };

    return Club;

  })();

}).call(this);

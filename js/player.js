(function() {
  var Player,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Player = (function() {

    function Player(playlist) {
      if (playlist == null) playlist = [];
      this.playlist = playlist;
      this.current = new Audio();
      this.track_number = 0;
    }

    Player.prototype.unstarted = function() {
      if (this.current.src !== "") {
        return false;
      } else {
        return true;
      }
    };

    Player.prototype.setPlaylist = function(playlist) {
      if (playlist == null) playlist = [];
      return this.playlist = this.playlist.concat(playlist);
    };

    Player.prototype.resetPlaylist = function() {
      return this.playlist = [];
    };

    Player.prototype.play = function() {
      console.log("Play() " + this.current.src);
      return this.current.play();
    };

    Player.prototype.pause = function() {
      if (this.current.paused === false) this.current.pause();
      return this;
    };

    Player.prototype.setTrack = function(track) {
      this.track_number = track;
      this.current.src = this.playlist[this.track_number]["url"];
      return this;
    };

    Player.prototype.incrementTrack = function() {
      if (this.track_number === (this.playlist.length - 1)) {
        this.setTrack(0);
        this.current.src = this.playlist[0]["url"];
      } else {
        this.track_number++;
        this.current.src = this.playlist[this.track_number]["url"];
      }
      return this;
    };

    Player.prototype.next = function(callback) {
      var loadMeta,
        _this = this;
      if (callback == null) callback = null;
      this.pause().incrementTrack();
      loadMeta = setInterval((function() {
        if (_this.current.duration > 0) {
          clearInterval(loadMeta);
          if (callback != null) callback(_this.current.duration);
          return _this.play();
        }
      }), 50);
      return console.log("Changed track to: " + this.playlist[this.track_number]["title"]);
    };

    Player.prototype.setVolume = function(volume) {
      console.log("Volume change to: " + volume + " ");
      return this.current.volume = volume;
    };

    return Player;

  })();

  this.SongPlayer = (function(_super) {

    __extends(SongPlayer, _super);

    function SongPlayer() {
      SongPlayer.__super__.constructor.apply(this, arguments);
    }

    SongPlayer.prototype.start = function() {
      console.log("Start()");
      return this.setTrack(0).setLabel().play();
    };

    SongPlayer.prototype.setLabel = function() {
      $(".current-song").html(this.playlist[this.track_number]["title"]);
      return this;
    };

    SongPlayer.prototype.next = function() {
      SongPlayer.__super__.next.apply(this, arguments);
      this.setLabel();
      return this;
    };

    SongPlayer.prototype.play = function() {
      SongPlayer.__super__.play.apply(this, arguments);
      return $(".play-pause").button("option", "icons", {
        primary: "ui-icon-pause"
      });
    };

    SongPlayer.prototype.pause = function() {
      SongPlayer.__super__.pause.apply(this, arguments);
      $(".play-pause").button("option", "icons", {
        primary: "ui-icon-play"
      });
      return this;
    };

    SongPlayer.prototype.setPlaylist = function(newplaylist) {
      if (newplaylist == null) newplaylist = [];
      SongPlayer.__super__.setPlaylist.apply(this, arguments);
      return this.outputPlaylist();
    };

    SongPlayer.prototype.outputPlaylist = function() {
      var elm, i, song, _len, _ref, _results;
      $('#playlist-dialog .playlist').html('');
      _ref = this.playlist;
      _results = [];
      for (i = 0, _len = _ref.length; i < _len; i++) {
        song = _ref[i];
        elm = $('<p></p>').html("#" + i + ": " + song['title']);
        if (club.clubNumber === i) $(elm).addClass("current");
        _results.push($('#playlist-dialog .playlist').append(elm));
      }
      return _results;
    };

    return SongPlayer;

  })(Player);

  this.CommandPlayer = (function(_super) {

    __extends(CommandPlayer, _super);

    function CommandPlayer() {
      CommandPlayer.__super__.constructor.apply(this, arguments);
    }

    return CommandPlayer;

  })(Player);

  this.CheersPlayer = (function(_super) {

    __extends(CheersPlayer, _super);

    function CheersPlayer() {
      CheersPlayer.__super__.constructor.apply(this, arguments);
    }

    return CheersPlayer;

  })(Player);

}).call(this);

(function() {

  jQuery(function() {
    var _this = this;
    $(".play-pause").button({
      text: false,
      icons: {
        primary: "ui-icon-play"
      }
    }).click(function() {
      if (songPlayer.unstarted()) {
        return songPlayer.start();
      } else if (songPlayer.current.paused === true) {
        return songPlayer.play();
      } else {
        return songPlayer.pause();
      }
    });
    $(".upload-song").change(function() {
      var file, files, lastDotPos, playlist, title, url, _i, _len;
      if ($(_this).parent('.controller-container')) {
        $(".upload-song").prependTo('#playlist-dialog');
        $(".play-pause, .view-playlist").show();
      }
      files = $(".upload-song")[0].files;
      if (window.webkitURL) window.URL = window.webkitURL;
      playlist = [];
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        lastDotPos = file.name.lastIndexOf(".");
        title = file.name.substring(0, lastDotPos);
        url = window.URL.createObjectURL(file);
        playlist.push({
          title: title,
          url: url
        });
      }
      return songPlayer.setPlaylist(playlist);
    });
    return $(".view-playlist").click(function() {
      songPlayer.outputPlaylist();
      return $("#playlist-dialog").dialog({
        modal: true,
        resizable: false
      });
    });
  });

}).call(this);

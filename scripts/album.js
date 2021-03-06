


var createSongRow = function(songNumber, songName, songLength) {
    var template =
        '<tr class="album-view-song-item">'
    + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    + '   <td class="song-item-title">' + songName + '</td>'
    + '   <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>'
    ;
    var $row = $(template);


    var onHover = function(event) {
            // below declares the variable as the node '.song-item-number'
        var songNumberCell = $(this).find('.song-item-number');
            // below uses the method attr to return the node's, 'data-song-number' value;
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));
        if (songNumber !== currentlyPlayingSong) {
        songNumberCell.html(playButtonTemplate);
        }
    };

    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(songNumber);
        }
    };

    $row.click(function(event){
        var songNumber = parseInt($(this).find(".song-item-number").attr('data-song-number'));
        if (currentlyPlayingSong !== null) {
              // Revert to song number for currently playing song because user started playing new song.
              var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSong);
              currentlyPlayingCell.html(currentlyPlayingSong);
           }
       if (currentlyPlayingSong !== songNumber) {
          // Switch from Pause -> Play button to pause currently playing song.
          $(this).find(".song-item-number").html(pauseButtonTemplate);
          $controlPP.html(playerBarPauseButton);
          setSong(songNumber);
          currentSoundFile.play();
          controlUpdate();
            var $volumeFill = $('.volume .fill');
            var $volumeThumb = $('.volume .thumb');
            $volumeFill.width(currentVolume + '%');
            $volumeThumb.css({left: currentVolume + '%'})
        } else if (currentlyPlayingSong === songNumber) {
            if (currentSoundFile.isPaused()) {
            $(this).find(".song-item-number").html(pauseButtonTemplate);
            $controlPP.html(playerBarPauseButton);
            currentSoundFile.play();
            } else {
                $(this).find(".song-item-number").html(playButtonTemplate);
                $controlPP.html(playerBarPlayButton);
                currentSoundFile.pause();
            }
            /*    
            // Switch from Play -> Pause button to indicate new song is playing.
              $(this).find(".song-item-number").html(pauseButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPauseButton);
                setSong(songNumber);
                $('.main-controls .play-pause').html('<span class="ion-pause"></span>');
              controlUpdate();*/
           }

    });

    $row.hover(onHover, offHover);
    return $row;
};


    var albumImage = document.getElementsByClassName('album-cover-art')[0];
    var setCurrentAlbum = function(album) {
        currentAlbum = album;
        var $albumTitle = $('.album-view-title');
        var $albumArtist = $('.album-view-artist');
        var $albumReleaseInfo = $('.album-view-release-info');
        var $albumImage = $('.album-cover-art');
        var $albumSongList = $('.album-view-song-list'); 


    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);

    $albumSongList.empty();


// use a for loop to add createSongRow function to add html to page.

    for(var i = 0; i < album.songs.length; i++) {
         var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
     }
};
 var setSong = function(songNumber = null){
     if (currentSoundFile) {
         currentSoundFile.stop();
     }
     currentlyPlayingSong = parseInt(songNumber);
     currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
    // currentAlbum is a variable set in the set current album event listener function
    // .songs is part of the hash object we created in fixtures for each album. <.songs> is the property name called using bracket notation
    //console.log(currentSongFromAlbum.title);

     //assigning a new buzz <sound> object, passing currentSongFrom album object using its audioUrl property.
     currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
       /* assigned a settings object that has 2 properies defined.
         formats is an array of strings with acceptable audio formats
         preload sets teh property to true tells Buzz we want the mp3s loaded as soon as the page loads.*/
         formats: [ 'mp3' ],
         preload: true
     });
     setVolume(currentVolume);
     updateSeekBarWhileSongPlays()
 };

 var setVolume = function(volume) {
     if (currentSoundFile) {
        currentSoundFile.setVolume(volume);
     }
 };

 var getSongNumberCell = function(number){
     return $('.song-item-number[data-song-number="' + number + '"]')
 }


var controlUpdate = function(){
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);

    $controlPP.html(playerBarPauseButton);
    updateSeekBarWhileSongPlays()
    

};
var nextSong = function(event) {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _incrementing_ the song here
    currentSongIndex++;
        if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }

    // Save the last song number before changing it
    var lastSongNumber = currentlyPlayingSong;

    // Set a new current song
    currentlyPlayingSong = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
    setSong(currentlyPlayingSong);
    currentSoundFile.play();

    // Update the Player Bar information
    controlUpdate();

    var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
}

var previousSong = function(event){
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _decrementing_ the index here
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }

    // Save the last song number before changing it
    var lastSongNumber = currentlyPlayingSong;

    // Set a new current song
    currentlyPlayingSong = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
    setSong(currentlyPlayingSong);
    currentSoundFile.play();

    // Update the Player Bar information
    controlUpdate();

    $controlPP.html(playerBarPauseButton);

    var $previousSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
}

var setCurrentTimeInPlayerBar = function(currentTime) {
    $('.currently-playing .current-time').html(filterTimeCode(currentTime));
    $('.currently-playing .total-time').html(filterTimeCode(currentSongFromAlbum.duration));
};

var setupSeekBars = function() {
     var $seekBars = $('.player-bar .seek-bar');
 
     $seekBars.click(function(event) {
         // #3
         var offsetX = event.pageX - $(this).offset().left;
         var barWidth = $(this).width();
         // #4
         var seekBarFillRatio = offsetX / barWidth;
     if ($(this).parent().attr('class') == 'seek-control') {
                //function that changes point in song
                seek(seekBarFillRatio * currentSoundFile.getDuration());
            } else {
                //sets volume
                setVolume(seekBarFillRatio * 100);   
            }

            updateSeekPercentage($(this), seekBarFillRatio);
        });

        $seekBars.find('.thumb').mousedown(function(event) {

            var $seekBar = $(this).parent();

            $(document).bind('mousemove.thumb', function(event){
                var offsetX = event.pageX - $seekBar.offset().left;
                var barWidth = $seekBar.width();
                var seekBarFillRatio = offsetX / barWidth;

                if ($seekBar.parent().attr('class') == 'seek-control') {
                    seek(seekBarFillRatio * currentSoundFile.getDuration());   
                } else {
                    setVolume(seekBarFillRatio);
                }

                updateSeekPercentage($seekBar, seekBarFillRatio);
            });
            
        $(document).bind('mouseup.thumb', function() {
         $(document).unbind('mousemove.thumb');
         $(document).unbind('mouseup.thumb');
        });
    });
 };

 var updateSeekBarWhileSongPlays = function() {
     if (currentSoundFile) {
         // #10
         currentSoundFile.bind('timeupdate', function(event) {
             // #11
             var seekBarFillRatio = this.getTime() / this.getDuration();
             var $seekBar = $('.seek-control .seek-bar');
 
             updateSeekPercentage($seekBar, seekBarFillRatio);
             setCurrentTimeInPlayerBar(Math.floor(this.getTime()));
             //console.log(Math.floor(this.getTime()));
             
         });
     }
 };
var seek = function(time) {
     if (currentSoundFile) {
         currentSoundFile.setTime(time);
     }
 }

var updateSeekPercentage = function($seekBar, seekBarFillRatio) {
    var offsetXPercent = seekBarFillRatio * 100;
    // max so we dont go below 1 + min so we don't go above 1 
    offsetXPercent = Math.max(0, offsetXPercent);
    offsetXPercent = Math.min(100, offsetXPercent);
 
    // 
    var percentageString = offsetXPercent + '%';
    $seekBar.find('.fill').width(percentageString);
    $seekBar.find('.thumb').css({left: percentageString});
 };


var togglePlayFromPlayerBar = function(event) {
    if (currentSoundFile == null) {
        
    }else {
        if (currentSoundFile.isPaused()) {
            getSongNumberCell(currentlyPlayingSong).html(pauseButtonTemplate);
            $controlPP.html(playerBarPauseButton);
            currentSoundFile.play();
        } else {
            getSongNumberCell(currentlyPlayingSong).html(playButtonTemplate);
            $controlPP.html(playerBarPlayButton);
            currentSoundFile.pause();   
        }
    }
};

var filterTimeCode = function(time=0){
    var minutes = (Math.floor(time/60)).toString();
    var seconds = (Math.floor(time%60)).toString();
    if (minutes.length == 1){
        minutes = "0" + minutes
    }else if (minutes.length == 0){
        minutes = "00"
    };
    
    if (seconds.length == 1){
        seconds = "0"+seconds
    }else if (seconds.length == 0){
        seconds = "00"
    };
    return (minutes + ":" + seconds);
}

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentlyPlayingSong = null;
var currentAlbum = null;
var currentSoundFile = null;
var currentSongFromAlbum = null;
var currentVolume = 80;


var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');
var $controlPP = $('.main-controls .play-pause')



$(document).ready(function() {
    var list = [albumPicasso, albumMarconi, albumFood];
    var n = 0;
    setCurrentAlbum(list[n]);
    setupSeekBars();

    
    $controlPP.click(togglePlayFromPlayerBar);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);

    albumImage.addEventListener("click", function(event){
        n++;
        if(n == list.length) {
            n = 0;
        };
        setCurrentAlbum(list[n]);
    }); 
 });


 var trackIndex = function(album, song) {
     return album.songs.indexOf(song);
 };
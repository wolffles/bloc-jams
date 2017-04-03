


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
    
    var controlUpdate = function(){
        $('.currently-playing .song-name').text(currentSongFromAlbum.title);
        $('.currently-playing .artist-name').text(currentAlbum.artist);
        $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
        
        $('.main-controls .play-pause').html(playerBarPauseButton);
   
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

        // Update the Player Bar information
        controlUpdate();

        var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
        var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

        $nextSongNumberCell.html(pauseButtonTemplate);
        $lastSongNumberCell.html(lastSongNumber);
    }
    
    var previousSong = function(event) {
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

        // Update the Player Bar information
        controlUpdate();

        $('.main-controls .play-pause').html(playerBarPauseButton);

        var $previousSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
        var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

        $previousSongNumberCell.html(pauseButtonTemplate);
        $lastSongNumberCell.html(lastSongNumber);
    }

    
    $row.click(function(event){
        var songNumber = parseInt($(this).find(".song-item-number").attr('data-song-number'));
        if (currentlyPlayingSong !== null) {
              // Revert to song number for currently playing song because user started playing new song.
              var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSong);
              currentlyPlayingCell.html(currentlyPlayingSong);
           }
           if (currentlyPlayingSong === songNumber) {
              // Switch from Pause -> Play button to pause currently playing song.
              $(this).find(".song-item-number").html(playButtonTemplate);
              $('.main-controls .play-pause').html(playerBarPlayButton);
              setSong(songNumber);
              controlUpdate();
            } else if (currentlyPlayingSong !== songNumber) {
             // Switch from Play -> Pause button to indicate new song is playing.
              $(this).find(".song-item-number").html(pauseButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPauseButton);
                setSong(songNumber);
                $('.main-controls .play-pause').html('<span class="ion-pause"></span>');
              controlUpdate();
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
     currentlyPlayingSong = parseInt(songNumber);
     currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
    // currentAlbum is a variable set in the set current album event listener function
    // .songs is part of the hash object we created in fixtures for each album. <.songs> is the property name called using bracket notation
    //console.log(currentSongFromAlbum.title);
 }
 
 var getSongNumberCell = function(number){
     return $('.song-item-number[data-song-number="' + number + '"]')
 }


var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentlyPlayingSong = null;
var currentAlbum = null;
var currentSongFromAlbum = null;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

 

$(document).ready(function() {
    var list = [albumPicasso, albumMarconi, albumFood];
    var n = 0;
    setCurrentAlbum(list[n]);
    
    $previousButton.click(function(event){
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

        // Update the Player Bar information
        $('.currently-playing .song-name').text(currentSongFromAlbum.title);
        $('.currently-playing .artist-name').text(currentAlbum.artist);
        $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
        
        $('.main-controls .play-pause').html(playerBarPauseButton);


        var $previousSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
        var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

        $previousSongNumberCell.html(pauseButtonTemplate);
        $lastSongNumberCell.html(lastSongNumber);
    });
    
    $nextButton.click(function(event) {
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

        // Update the Player Bar information
        $('.currently-playing .song-name').text(currentSongFromAlbum.title);
        $('.currently-playing .artist-name').text(currentAlbum.artist);
        $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
        
        $('.main-controls .play-pause').html(playerBarPauseButton);

        var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
        var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

        $nextSongNumberCell.html(pauseButtonTemplate);
        $lastSongNumberCell.html(lastSongNumber);
    });

    //$previousButton.click(previousSong);
    //$nextButton.click(nextSong);
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
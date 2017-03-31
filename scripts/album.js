// Example Album
 var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/10.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };
 
 // Another Example Album
 var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };
// Third album
var albumFood = {
    title: 'The Hunger',
    artist: 'Munchies',
    label: 'Stovetop',
    year: '2017',
    albumArtUrl: 'assets/images/album_covers/02.png',
    songs: [
        { title: 'Pineapple Pizza!?', duration: '3:01' },
        { title: 'Spicy Chicken Nachos', duration: '6:66' },
        { title: 'Pulled Pork Sandwiches', duration: '3:13' },
        { title: 'Rock Lobster!', duration: '4:20' },
        { title: 'Scrambled Eggs and Ham', duration: '11:11' }
    ]
};

var albumFood = {
    title: 'The Hunger',
    artist: 'Munchies',
    label: 'Stovetop',
    year: '2017',
    albumArtUrl: 'assets/images/album_covers/02.png',
    songs: [
        { title: 'Pineapple Pizza!?', duration: '3:01' },
        { title: 'Spicy Chicken Nachos', duration: '6:66' },
        { title: 'Pulled Pork Sandwiches', duration: '3:13' },
        { title: 'Rock Lobster!', duration: '4:20' },
        { title: 'Scrambled Eggs and Ham', duration: '11:11' }
    ]
};


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
        var songNumber = songNumberCell.attr('data-song-number');
        if (songNumber !== currentlyPlayingSong) {
        songNumberCell.html(playButtonTemplate);
        }
    };
    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(songNumber);
        }
    };
    
    $row.click(function(event){
        var songNumber = $(this).find(".song-item-number").attr('data-song-number')
        if (currentlyPlayingSong !== null) {
		      // Revert to song number for currently playing song because user started playing new song.
		      var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
              currentlyPlayingCell.html(currentlyPlayingSong);
	       }
           if (currentlyPlayingSong === songNumber) {
              // Switch from Pause -> Play button to pause currently playing song.
              $(this).find(".song-item-number").html(playButtonTemplate);
              currentlyPlayingSong = null;
            } else if (currentlyPlayingSong !== songNumber) {
             // Switch from Play -> Pause button to indicate new song is playing.
             $(this).find(".song-item-number").html(pauseButtonTemplate);
              currentlyPlayingSong = songNumber;
           }
    });
    /*var clickHandler = function() {
	var songNumber = $(this).attr('data-song-number');

	if (currentlyPlayingSong !== null) {
		// Revert to song number for currently playing song because user started playing new song.
		var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
		currentlyPlayingCell.html(currentlyPlayingSong);
	}
	if (currentlyPlayingSong !== songNumber) {
		// Switch from Play -> Pause button to indicate new song is playing.
		$(this).html(pauseButtonTemplate);
		currentlyPlayingSong = songNumber;
	} else if (currentlyPlayingSong === songNumber) {
		// Switch from Pause -> Play button to pause currently playing song.
		$(this).html(playButtonTemplate);
		currentlyPlayingSong = null;
	}
    };
    */
    //// ## they make a clickHandler helper function before using it. #####
    //$row.find('.song-item-number').click(clickHandler);

    $row.hover(onHover, offHover);
    return $row;
};


    var albumImage = document.getElementsByClassName('album-cover-art')[0];
    var setCurrentAlbum = function(album) {
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


var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var currentlyPlayingSong = null;

 $(document).ready(function() {
    var list = [albumPicasso, albumMarconi, albumFood];
    var n = 0;
    setCurrentAlbum(list[n]);
    albumImage.addEventListener("click", function(event){
        n++;
        if(n == list.length) {
            n = 0;
        };
        setCurrentAlbum(list[n]);
    });
 });


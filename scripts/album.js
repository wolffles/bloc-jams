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
    return $(template);
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

// function takes element as a className not a css selector
var findParentByClassName = function(element, targetClass){
     if (element) {
        var currentParent = element.parentElement;
        while (currentParent.className !== targetClass && currentParent.className !== null) {
            currentParent = currentParent.parentElement;
        }
        return currentParent;
    }
};
var getSongItem = function(element) {
    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }  ;
};

var clickHandler = function(targetElement) {
    var songItem = getSongItem(targetElement);
        if (currentlyPlayingSong === null) {
            songItem.innerHTML = pauseButtonTemplate;
            currentlyPlayingSong = songItem.getAttribute('data-song-number');
        }else if(currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
            songItem.innerHTML = playButtonTemplate;
            currentlyPlayingSong = null;
        }else if(currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
            var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
            currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
            songItem.innerHTML = pauseButtonTemplate;
            currentlyPlayingSong = songItem.getAttribute('data-song-number');
        }
};
   
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var currentlyPlayingSong = null;

 window.onload = function() {
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
     
    songListContainer.addEventListener('mouseover', function(event){
        //console.log(event.target);
        // Only target individual song rows during event delegation
        if (event.target.parentElement.className === 'album-view-song-item') {
            //change the content form the number to the play button's HTML
            //event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
            //changed
            var songItem = getSongItem(event.target);
            if(songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
                songItem.innerHTML = playButtonTemplate;
            }
        }
    });
     
    for(var i = 0; i< songRows.length; i++) {
        songRows[i].addEventListener('mouseleave', function(event) {
            //this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
            //#changed 
            var songItem = getSongItem(event.target);
            var songItemNumber = songItem.getAttribute('data-song-number');
            //
            if(songItemNumber !== currentlyPlayingSong) {
                songItem.innerHTML = songItemNumber;
            }
        });
        songRows[i].addEventListener('click',function(event){
            clickHandler(event.target)
        })
    }
 };


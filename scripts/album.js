// Example Album
 var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
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

var createSongRow = function(songNumber, songName, songLength) {
    var template =
        '<tr class="album-view-song-item">'
    + '   <td class= "song-item-number">' + songNumber + '</td>' 
    + '   <td class="song-item-title">' + songName + '</td>'
    + '   <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>'
    ;
    return template;
};

var setCurrentAlbum = function(album) {
    /* we selet all of the html elements required to display on 
    the album page: title, artist, release info, image, and song 
    list. we want to populate these elements with information. To 
    do so we assign the corresponding values of the album 
    objects' properties ot the html elements.*/
    var albumTitle = document.getElementsByClassName('album-view-title')[0];
    var albumArtist = document.getElementsByClassName('album-view-artist')[0];
    var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
    var albumImage = document.getElementsByClassName('album-cover-art')[0];
    var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
    
    /* the firstChild property identifies the first child node
    of the element, and nodeValue returns or sets the value of
    a node. Alternatively, we could technically use innerHTML
    to insert plain text (like we did in collection.js), but 
    it's excessive and semantically misleading in this context
    because we arent adding any html. */
    
    /* for example, the .albumTitle element has only one node 
    and it's text node. When we use the firstChild property and
    nodeValue properties together on the .albumTitle element,
    we set the value of that text node to album.title. */ 
    albumTitle.firstChild.nodeValue = album.title;
     albumArtist.firstChild.nodeValue = album.artist;
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
     albumImage.setAttribute('src', album.albumArtUrl);
 
     /* When we populated the Collection view with albums, we 
     initially set the value of the parent container's innerHTML 
     to an empty string. This ensured that we were working with a 
     clean slate. We do the same here, at #3, and clear the album 
     song list HTML to make sure there are no interfering elements.
     */
     albumSongList.innerHTML = '';

     
    // use a for loop to add createSongRow function to add html to page.
     for (var i = 0; i < album.songs.length; i++) {
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
     }
 };

window.onload = function() {
     setCurrentAlbum(albumPicasso);
 };









/* this creates a template giving the web page more dynamic functionality*/
var collectionItemTemplate =
     '<div class="collection-album-container column fourth">'
   + '  <img src="assets/images/album_covers/01.png"/>'
   + '  <div class="collection-album-info caption">'
   + '    <p>'
   + '      <a class="album-name" href="album.html"> The Colors </a>'
   + '      <br/>'
   + '      <a href="album.html"> Pablo Picasso </a>'
   + '      <br/>'
   + '      X songs'
   + '      <br/>'
   + '    </p>'
   + '  </div>'
   + '</div>'
    ;

window.onload = function(){
    // we select the element with "album-covers" class name
    var collectionContainer = document.getElementsByClassName('album-covers')[0];
    // assign an empty string to collectionContainer's innerHTML property to clear its content
    // this ensures we're working with a clean slate before we insert content wiht javascript
    collectionContainer.innerHTML = '';
    
    /*for loop, inserts 12 albums using the += operator, which appends content to strings.
    Each loop adds the contents of collectionItemTemplate to the innerHTML of collecitonContainer,
    thereby generating the albums that display on the colelction page. */
    for(var i = 0; i < 12; i++) {
        collectionContainer.innerHTML += collectionItemTemplate;
    }
}
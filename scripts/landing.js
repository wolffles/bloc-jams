
var animatePoints = function() {
    var revealPoint = function() {
        // this here refers to each of the '.point' elements that are iterated on line 12
        
        $(this).css({
            opacity: 1,
            transform: 'scaleX(1) translateY(0)'
        });
    };
    // <$.each()> is a function iterates over each .point 
    // element and executes the call back function
    $.each($('.point'),revealPoint);
}
$(window).load(function() {
    // updated the innerHeight property to jQuery's height() 
    //method, which gets or sets an objects height. 
    // default or leaving blank means it gets the height
    if ($(window).height() > 950){
        animatePoints();
    }
    // .offset() is a jQuery method replaced getBoundingClientRect()
    var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;
    // addEventListener() became jQuery's <Scroll()> method. 
    //it takes a function as an argument. and 
    //is still an event handler.
    $(window).scroll(function(event){
        // $(window).scrollTrop() is a jQuery method.
        if ($(window).scrollTop() >= scrollDistance) {
            animatePoints();
        }
     });
});


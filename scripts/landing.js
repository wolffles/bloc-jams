
var pointsArray = document.getElementsByClassName('point');

var animatePoints = function(points) {
    var revealPoint = function(idx){
            points[idx].style.opacity = 1;
            points[idx].style.transform = "scaleX(1) translateY(0)";
            points[idx].style.msTransform = "scaleX(1) translateY(0)";
            points[idx].style.WebkitTransform = "scaleX(1) translateY(0)";
        };
     for(var i = 0; i < points.length; i++){
         revealPoint(i)
    };
};
/*"Attaching behavior to the scroll event"
    window is an object
    addEventListener() is a method takes 3 arguments.
        <type>, is string, required, (represents type of event for which DOM should be listening)
        <listener>, is function, required, (Passed in as an event handler and contains the code that executes when the events fires.)
        <useCapture>, boolean, no, (Specifies whether the user wishes toinitiate capture.)
*/
window.onload = function() {
    if(window.innerHeight > 950) {
        animatePoints(pointsArray);
    }
    
    var sellingPoints = document.getElementsByClassName('selling-points')[0];
    var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
    window.addEventListener("scroll",function(event) {
        /* line 27 helps you console.log distance from top to spot on document.
        console.log("current offset from the top is " + sellingPoints.getBoundingClientRect().top + "pixels");
        */
        if(document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance){
            animatePoints(pointsArray);
        }
    });
}


/* jQuery */

// function mover(pos,full,shrink) {
//     $('.sliding').css({
//       left : pos + 'px'
//     });  
//     shrink = full - pos;
//     $('.content-left').css({
//       width : pos + 'px'
//     });
//     $('.content-right').css({
//       width : shrink + 'px'
//     });  
// }
// $(".box-itself").mousemove(function(event) {
// mousePosition = event.clientX;
// fullWidth = $(".box-itself").width();
// mover(mousePosition,fullWidth);  
// });


/* vanillaJS */

function mover(pos,full) {
  let shrink = full - pos;
  let sliding = document.getElementsByClassName('sliding')[0];
     sliding.setAttribute("style", "left:" + pos + "px"); 
  let contentLeft = document.getElementsByClassName('content-left')[0];
     contentLeft.setAttribute("style", "width:" + pos + "px");
  let contentRight = document.getElementsByClassName('content-right')[0];
     contentRight.setAttribute("style", "width:" + shrink + "px"); 
}
const cont = document.getElementsByClassName('box-itself')[0];
cont.addEventListener('mousemove', function(e) {
    let mousePosition = e.clientX;
    let fullWidth = cont.offsetWidth;
    mover(mousePosition,fullWidth); 
});

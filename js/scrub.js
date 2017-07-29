/* Scrubber Slider */
  /* vanillaJS */

function Scrub(el) {

  // scrubber slider main action fn
  function mover(pos,full) {
    let shrink = full - pos;
    let sliding = document.getElementsByClassName('sliding')[0];
       sliding.setAttribute("style", "left:" + pos + "px");
    let contentLeft = document.getElementsByClassName('content-left')[0];
       contentLeft.setAttribute("style", "width:" + pos + "px");
    let contentRight = document.getElementsByClassName('content-right')[0];
       contentRight.setAttribute("style", "width:" + shrink + "px");
  }

  // get chosen slider container
  // checking id > class > attr name
  var scrubSlider;
  if ( document.getElementById(el) != null ) {
    scrubSlider = document.getElementById(el)[0];
  }
  else if ( document.getElementsByClassName(el) != null ) {
    scrubSlider = document.getElementsByClassName(el)[0];
  }
  else {
    scrubSlider = document.getElementsByName(el)[0];
  }
  scrubSlider.className += " scrub-slider";

  // get chosen slider's children(images)


  // add scrubber control/handle
  const scrubberHandle = document.createElement('div');
  scrubberHandle.className="sliding";
  scrubberHandle.innerHTML = '<span class="sliding-left"></span><span class="sliding-right"></span>';
  scrubSlider.appendChild(scrubberHandle);

  // add mousemove listener
  scrubSlider.addEventListener('mousemove', function(e) {
    let mousePosition = e.clientX;
    let fullWidth = cont.offsetWidth;
    mover(mousePosition,fullWidth);
  });

}








/* jQuery version - incomplete */

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

/* Scrubber Slider */
  /* vanillaJS */

function Scrub(el) {

  function utilityFn(callback) {

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

      // get chosen slider's images
        const scrubChildren = document.getElementsByClassName('scrub-slider')[0].children;
       
     function createScrubImages(el,type,index) {
        if ( type == 'DIV' ) {
           let scrubImage = document.createElement('div');
           scrubImage.className= "scrub-content" +  ( i == 0 ) ? "scrub-left" : "scrub-right";
           scrubImage.appendChild( ( i == 0 ) ? scrubChildren[0] : scrubChildren[1] );
           if ( el.style.backgroundImage == '' ) {
            // warning no image
           }
        }
        else if ( type == 'IMG' ) {
           let scrubImage = document.createElement('div');
           let imgSrc = el.getAttribute('src');
           scrubImage.className= "scrub-content" +  ( i == 0 ) ? "scrub-left" : "scrub-right";
           scrubImage.appendChild( document.createElement('div') );
           scrubImage.children[0].style.backgroundImage = 'url(' + imgSrc + ')';
        }
        else {
        }       
      scrubSlider.appendChild(scrubImage);
     }
    
    for(i=0; i < 2; i++) {
      let child = scrubChildren[i];
      if ( scrubChildren[i] && child.tagName ) {
        createScrubImages( scrubChildren[i], child.tagName, i );
      }
    }
    
      // wrap in scrub html 
      /*
      var scrubLeft = document.createElement('div');
      scrubLeft.className= "scrub-content scrub-left";
      scrubLeft.appendChild((scrubChildren[0]) ? scrubChildren[0] : '<img src="" title="Missing image" />');
      var scrubRight = document.createElement('div');
      scrubRight.className= "scrub-content scrub-right";
      scrubRight.appendChild((scrubChildren[1]) ? scrubChildren[1] : '<img src="" title="Missing image" />');
      // scrubRight.innerHTML = (scrubChildren[1]) ? scrubChildren[1] : '<img src="" title="Missing image" />';
      */
    
      // inject
      scrubSlider.innerHTML = '';
//       scrubSlider.appendChild(scrubLeft);
//       scrubSlider.appendChild(scrubRight);

      callback(scrubSlider);
  }

  utilityFn(function(scrubSlider) {
    // add scrubber control/handle
    const scrubberHandle = document.createElement('div');
    scrubberHandle.className= "sliding";
    scrubberHandle.innerHTML = '<span class="sliding-left"></span><span class="sliding-right"></span>';
    scrubSlider.appendChild(scrubberHandle);

    // scrubber slider main action fn
    function mover(pos,full) {
      let shrink = full - pos;
      let sliding = document.getElementsByClassName('sliding')[0];
//          sliding.setAttribute("style", "left:" + pos + "px");
         sliding.style.left = ((pos > 0) ? pos : 0) + "px";
      let contentLeft = document.getElementsByClassName('scrub-left')[0];
//          contentLeft.setAttribute("style", "width:" + ((pos > 0) ? pos : 0) + "px");
         contentLeft.style.width = ((pos > 0) ? pos : 0) + "px";
      let contentRight = document.getElementsByClassName('scrub-right')[0];
//          contentRight.setAttribute("style", "width:" + ((shrink > 0) ? shrink : 0) + "px");      
         contentRight.style.width = ((shrink > 0) ? shrink : 0) + "px";
    }

    // add mousemove listener
    scrubSlider.addEventListener('mousemove', function(e) {
      let mousePosition = e.clientX;
      let fullWidth = scrubSlider.offsetWidth;
      mover(mousePosition,fullWidth);
    });
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

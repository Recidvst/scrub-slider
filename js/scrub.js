/* Scrub Slider */

function Scrub(scrubArg) {

    var isObject = function(a) {
        return (!!a) && (a.constructor === Object);
    };
    // check if simple call or config passed
    if ( isObject(scrubArg) ) {
        // set function default arguments
          scrubArg.target = ( typeof scrubArg.target !== 'undefined' && isObject(scrubArg) ) ? scrubArg.target : null;
          scrubArg.height = ( typeof scrubArg.height !== 'undefined' && isObject(scrubArg) ) ? scrubArg.height : '500px';
          scrubArg.handle = ( typeof scrubArg.handle !== 'undefined' && isObject(scrubArg) ) ? scrubArg.handle : true;
          scrubArg.src = ( typeof scrubArg.src !== 'undefined' && isObject(scrubArg) ) ? scrubArg.src : null;
          scrubArg.alt = ( typeof scrubArg.alt !== 'undefined' && isObject(scrubArg) ) ? scrubArg.alt : null;

        ScrubInitiate();
    }
    else {
        ScrubInitiate();
    }

function ScrubInitiate() {
    // get chosen slider container
    const scrubSlider = ( isObject(scrubArg) ) ? document.querySelectorAll(scrubArg.target)[0] : document.querySelectorAll(scrubArg)[0] ;

    try{
        function utilityFn(callback) {

          // avoid non-specific classes..
          var scrubName = ( isObject(scrubArg) ) ? (scrubArg.target) : scrubArg;
          scrubName = scrubName.replace("#", "");
          scrubName = scrubName.replace(".", "");
          if ( scrubName.indexOf('.') > -1 && document.querySelectorAll(scrubName).length > 1 ) {
            console.warn('%cScrub Slider works best if you use an %cID%c or a %cunique%c class... ','color:cornflowerblue;','color:indianred;','color:cornflowerblue;','color:indianred;','color:cornflowerblue;');
          }

            if ( scrubSlider != undefined ) {
              scrubSlider.className += " scrub-slider";
              const sliderWidth = scrubSlider.offsetWidth;
              // set height if given
              if ( scrubArg.height != null ) {
                scrubSlider.style.height = scrubArg.height;
              }

                // get chosen slider's images
                let scrubChildren = scrubSlider.children;

                function createScrubImages(el,type,index) {
                    if ( type == 'DIV' ) {
                       // clone div
                       let scrubImage = el.cloneNode(true);
                       el.parentNode.removeChild(el);
                       // inject scrub container
                       let scrubCont = document.createElement('div');
                       scrubCont.className = ( index == 0 ) ? "scrub-content scrub-left" : "scrub-content scrub-right";
                       scrubCont.style.width = parseInt(sliderWidth / 2) + "px";
                       scrubSlider.insertBefore(scrubCont,scrubSlider.firstChild);
                       // re-attach div
                       scrubImage.style.width = sliderWidth + "px";
                           // if alt specified manually
                           if ( scrubArg.alt != null ) {
                               scrubImage.setAttribute('alt', ( ( index == 0 ) ? scrubArg.alt[0] : scrubArg.alt[1] ) )
                           }
                            // if src specified manually
                            if ( scrubArg.src != null ) {
                                let imgSrc = ( index == 0 ) ? scrubArg.src[0] : scrubArg.src[1] ;
                                scrubImage.style.backgroundImage = 'url(' + imgSrc + ')';
                            }
                       scrubCont.append(scrubImage);
                       // need a background image..
                       if ( el.style.backgroundImage == '' ) {
                        console.warn('%cScrub Slider divs must have a %cbackground image to work!%c >:[','color:cornflowerblue;','color:indianred;','color:cornflowerblue;');
                       }
                    }
                    else if ( type == 'IMG' ) {
                       // clone div
                       let scrubImage = document.createElement('div');
                       let imgSrc = el.getAttribute('src');
                            // if src specified manually
                            if ( scrubArg.src != null ) {
                                imgSrc = ( index == 0 ) ? scrubArg.src[0] : scrubArg.src[1] ;
                            }
                       el.parentNode.removeChild(el);
                       // inject scrub container
                       let scrubCont = document.createElement('div');
                       scrubCont.className = ( index == 0 ) ? "scrub-content scrub-left" : "scrub-content scrub-right";
                       scrubCont.style.width = parseInt(sliderWidth / 2) + "px";
                           // if alt specified
                           if ( scrubArg.alt != null ) {
                               scrubImage.setAttribute('alt', ( ( index == 0 ) ? scrubArg.alt[0] : scrubArg.alt[1] ) )
                           }
                       scrubSlider.insertBefore(scrubCont,scrubSlider.firstChild);
                       // re-attach div
                       scrubImage.style.width = sliderWidth + "px";
                       scrubImage.style.backgroundImage = 'url(' + imgSrc + ')';
                       scrubCont.append(scrubImage);
                    }
                }
                for(let i=0; i < 2; i++) {
                  let child = scrubChildren[i];
                  if ( scrubChildren[i] && child.tagName ) {
                    createScrubImages( scrubChildren[i], child.tagName, i );
                  }
                }

            callback(scrubSlider);
            }
            else {
                console.warn('%cScrub Slider needs to be passed an appropriate selector %c- preferably an ID, but a specific, unique class works too.','color:cornflowerblue;','color:indianred;');
            }
        }

            utilityFn(function(scrubSlider) {
                // add scrub control/handle
                const scrubHandle = document.createElement('div');
                scrubHandle.className= "sliding handleOn ";
                scrubHandle.innerHTML = '<span class="sliding-left"></span><span class="sliding-right"></span>';
                scrubSlider.appendChild(scrubHandle);

                // remove handle if specified
                if ( scrubArg.handle == false ) {
                    scrubHandle.innerHTML = '';
                    scrubHandle.classList.remove('handleOn');
                }

                // debounce (thanks to Underscore)
                function debounce(func, wait, immediate) {
                	var timeout;
                	return function() {
                		var context = this, args = arguments;
                		var later = function() {
                			timeout = null;
                			if (!immediate) func.apply(context, args);
                		};
                		var callNow = immediate && !timeout;
                		clearTimeout(timeout);
                		timeout = setTimeout(later, wait);
                		if (callNow) func.apply(context, args);
                	};
                };
                // scrub slider main action fn
                var mover = debounce(function(pos,full,slider) {
                    if ( scrubHandle ) {
                        let shrink = full - pos;
                        let sliding = slider.querySelectorAll('.sliding');
                           sliding[0].style.left = ((pos > 0) ? pos : 0) + "px";
                        let contentLeft = slider.querySelectorAll('.scrub-left');
                           contentLeft[0].style.width = ((pos > 0) ? pos : 0) + "px";
                        let contentRight = slider.querySelectorAll('.scrub-right');
                           contentRight[0].style.width = ((shrink > 0) ? shrink : 0) + "px";
                    }
                }, 0);
                // add mousemove listener
                scrubSlider.addEventListener('mousemove', function(e) {
                  let mousePosition = e.clientX - this.offsetLeft;
                  let fullWidth = scrubSlider.offsetWidth;
                  mover(mousePosition,fullWidth,scrubSlider);
                });
            });
    }catch(e){
        console.trace('%cuh-oh: %c' + e + '','color:indianred;','color:cornflowerblue;');
    }
}
}

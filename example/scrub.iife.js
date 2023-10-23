var Scrub = (function () {
  "use strict";

  /* Scrub Slider */
  /* helper functions */
  // object test
  var isObject = function (a) {
    return !!a && a.constructor === Object;
  };
  // debounce (thanks to Underscore)
  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var context = this;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
  function Scrub(scrubArg) {
    var _a, _b, _c, _d, _e;
    // set function default arguments
    var scrubConfig = scrubArg;
    scrubConfig.target = (_a = scrubConfig.target) !== null && _a !== void 0 ? _a : null;
    scrubConfig.height = (_b = scrubConfig.height) !== null && _b !== void 0 ? _b : "500px";
    scrubConfig.handle = (_c = scrubConfig.handle) !== null && _c !== void 0 ? _c : true;
    scrubConfig.src = (_d = scrubConfig.src) !== null && _d !== void 0 ? _d : null;
    scrubConfig.alt = (_e = scrubConfig.alt) !== null && _e !== void 0 ? _e : null;
    // check if simple call or config passed
    if (isObject(scrubArg) || typeof scrubArg == "object") {
      ScrubInitiate();
    } else {
      ScrubInitiate();
    }
    function ScrubInitiate() {
      var _a;
      // get chosen slider container
      var scrubSlider = document.querySelector(
        (_a = scrubArg.target) !== null && _a !== void 0 ? _a : scrubArg
      );
      if (!scrubSlider || scrubSlider == null) {
        return null;
      }
      try {
        function utilityFn(callback) {
          // avoid non-specific classes..
          var scrubName =
            isObject(scrubArg) || typeof scrubArg == "object" ? scrubConfig.target : scrubArg;
          if (scrubName != null) {
            scrubName = scrubName.replace("#", "");
            scrubName = scrubName.replace(".", "");
            if (scrubName.indexOf(".") > -1 && document.querySelectorAll(scrubName).length > 1) {
              console.warn(
                "%cScrub Slider works best if you use an %cID%c or a %cunique%c class... ",
                "color:cornflowerblue;",
                "color:indianred;",
                "color:cornflowerblue;",
                "color:indianred;",
                "color:cornflowerblue;"
              );
            }
          }
          if (scrubSlider != undefined && scrubSlider != null) {
            scrubSlider.className += " scrub-slider";
            var sliderWidth = scrubSlider.offsetWidth;
            // set height if given
            if (scrubConfig.height != null) {
              scrubSlider.style.height = scrubConfig.height;
            }
            // get chosen slider's images
            var scrubChildren = scrubSlider.children;
            function createScrubImages(el, type, index) {
              var _a, _b, _c;
              var scrubImage;
              var imgSrc;
              var scrubCont;
              var resizeFn;
              if (type == "DIV") {
                // clone div
                scrubImage = el.cloneNode(true);
                (_a = el.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(el);
                // inject scrub container
                scrubCont = document.createElement("div");
                scrubCont.className =
                  index == 0 ? "scrub-content scrub-left" : "scrub-content scrub-right";
                scrubCont.style.width = sliderWidth / 2 + "px";
                scrubSlider.insertBefore(scrubCont, scrubSlider.firstChild);
                // re-attach div
                scrubImage.style.width = sliderWidth + "px";
                // if alt specified manually
                if (scrubConfig.alt != null) {
                  scrubImage.setAttribute(
                    "alt",
                    index == 0 ? scrubConfig.alt[0] : scrubConfig.alt[1]
                  );
                }
                // if src specified manually
                if (scrubConfig.src != null) {
                  imgSrc = index == 0 ? scrubConfig.src[0] : scrubConfig.src[1];
                  scrubImage.style.backgroundImage = "url(" + imgSrc + ")";
                }
                scrubCont.appendChild(scrubImage);
                // need a background image..
                if (el.style.backgroundImage == "") {
                  console.warn(
                    "%cScrub Slider divs must have a %cbackground image to work!%c >:[",
                    "color:cornflowerblue;",
                    "color:indianred;",
                    "color:cornflowerblue;"
                  );
                }
                // handle resize
                var reziseFn = debounce(
                  function (img) {
                    var newSliderWidth = scrubSlider.offsetWidth;
                    scrubCont.style.width = newSliderWidth / 2 + "px";
                    img.style.width = newSliderWidth + "px";
                  },
                  500,
                  false
                );
                window.addEventListener("resize", function (e) {
                  reziseFn(scrubImage);
                });
              } else if (type == "IMG") {
                // clone div
                scrubImage = document.createElement("div");
                imgSrc = (_b = el.getAttribute("src")) !== null && _b !== void 0 ? _b : "";
                // if src specified manually
                if (scrubConfig.src != null) {
                  imgSrc = index == 0 ? scrubConfig.src[0] : scrubConfig.src[1];
                }
                (_c = el.parentNode) === null || _c === void 0 ? void 0 : _c.removeChild(el);
                // inject scrub container
                scrubCont = document.createElement("div");
                scrubCont.className =
                  index == 0 ? "scrub-content scrub-left" : "scrub-content scrub-right";
                scrubCont.style.width = sliderWidth / 2 + "px";
                // if alt specified
                if (scrubConfig.alt != null) {
                  scrubImage.setAttribute(
                    "alt",
                    index == 0 ? scrubConfig.alt[0] : scrubConfig.alt[1]
                  );
                }
                scrubSlider.insertBefore(scrubCont, scrubSlider.firstChild);
                // re-attach div
                scrubImage.style.width = sliderWidth + "px";
                scrubImage.style.backgroundImage = "url(" + imgSrc + ")";
                scrubCont.appendChild(scrubImage);
                // handle resize
                var reziserFn = debounce(
                  function (img) {
                    var newSliderWidth = scrubSlider.offsetWidth;
                    scrubCont.style.width = newSliderWidth / 2 + "px";
                    img.style.width = newSliderWidth + "px";
                  },
                  500,
                  false
                );
                window.addEventListener("resize", function (e) {
                  reziserFn(scrubImage);
                });
              }
            }
            for (var i = 0; i < 2; i++) {
              var child = scrubChildren[i];
              if (scrubChildren[i] && child.tagName) {
                createScrubImages(scrubChildren[i], child.tagName, i);
              }
            }
            callback(scrubSlider);
          } else {
            console.warn(
              "%cScrub Slider needs to be passed an appropriate selector %c- preferably an ID, but a specific, unique class works too.",
              "color:cornflowerblue;",
              "color:indianred;"
            );
          }
        }
        utilityFn(function (slider) {
          // add scrub control/handle
          var scrubHandle = document.createElement("div");
          scrubHandle.className = "sliding handleOn ";
          scrubHandle.innerHTML =
            '<span class="sliding-left"></span><span class="sliding-right"></span>';
          slider.appendChild(scrubHandle);
          // remove handle if specified
          if (scrubConfig.handle == false) {
            scrubHandle.innerHTML = "";
            scrubHandle.classList.remove("handleOn");
          }
          // scrub slider main action fn
          var mover = debounce(
            function (pos, full, sldr) {
              if (scrubHandle) {
                var shrink = full - pos;
                var sliding = sldr.querySelector(".sliding");
                if (sliding) {
                  sliding.style.left = (pos > 0 ? pos : 0) + "px";
                  var contentLeft = sldr.querySelector(".scrub-left");
                  if (contentLeft) {
                    contentLeft.style.width = (pos > 0 ? pos : 0) + "px";
                  }
                  var contentRight = sldr.querySelector(".scrub-right");
                  if (contentRight) {
                    contentRight.style.width = (shrink > 0 ? shrink : 0) + "px";
                  }
                }
              }
            },
            1,
            false
          );
          // add mousemove listener
          slider.addEventListener("mousemove", function (e) {
            var mousePosition = e.clientX - this.offsetLeft;
            var fullWidth = slider.offsetWidth;
            mover(mousePosition, fullWidth, slider);
          });
        });
      } catch (e) {
        console.trace("%cuh-oh: %c" + e + "", "color:indianred;", "color:cornflowerblue;");
      }
    }
  }

  return Scrub;
})();

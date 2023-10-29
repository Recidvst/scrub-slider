"use strict";

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
// handle main scrub action
var mover = debounce(
  function (pos, full, sldr, handle) {
    if (handle) {
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
// create html needed for doing the scrub effect
function createScrubImages(slider, config, el, type, index) {
  var _a, _b, _c;
  var scrubImage;
  var imgSrc;
  var scrubCont;
  var sliderWidth = slider.offsetWidth;
  if (type == "IMG") {
    // clone div
    scrubImage = document.createElement("div");
    imgSrc = (_a = el.getAttribute("src")) !== null && _a !== void 0 ? _a : "";
    // if src specified manually
    if (config.src != null) {
      imgSrc = index == 0 ? config.src[0] : config.src[1];
    }
    (_b = el.parentNode) === null || _b === void 0 ? void 0 : _b.removeChild(el);
    // inject scrub container
    scrubCont = document.createElement("div");
    scrubCont.className = index == 0 ? "scrub-content scrub-left" : "scrub-content scrub-right";
    scrubCont.style.width = sliderWidth / 2 + "px";
    // if alt specified
    if (config.alt != null) {
      scrubImage.setAttribute("alt", index == 0 ? config.alt[0] : config.alt[1]);
    }
    slider.insertBefore(scrubCont, slider.firstChild);
    // re-attach div
    scrubImage.style.width = sliderWidth + "px";
    scrubImage.style.backgroundImage = "url(" + imgSrc + ")";
    scrubCont.appendChild(scrubImage);
  } else {
    // clone div
    scrubImage = el.cloneNode(true);
    (_c = el.parentNode) === null || _c === void 0 ? void 0 : _c.removeChild(el);
    // inject scrub container
    scrubCont = document.createElement("div");
    scrubCont.className = index == 0 ? "scrub-content scrub-left" : "scrub-content scrub-right";
    scrubCont.style.width = sliderWidth / 2 + "px";
    slider.insertBefore(scrubCont, slider.firstChild);
    // re-attach div
    scrubImage.style.width = sliderWidth + "px";
    // if alt specified manually
    if (config.alt != null) {
      scrubImage.setAttribute("alt", index == 0 ? config.alt[0] : config.alt[1]);
    }
    // if src specified manually
    if (config.src != null) {
      imgSrc = index == 0 ? config.src[0] : config.src[1];
      scrubImage.style.backgroundImage = "url(" + imgSrc + ")";
    }
    scrubCont.appendChild(scrubImage);
    // need a background image...
    if (config.src == null && el.style.backgroundImage == "") {
      console.warn(
        "%cScrub Slider divs must have a %cbackground image to work! It's best to set these on the html directly.%c",
        "color:cornflowerblue;",
        "color:indianred;",
        "color:cornflowerblue;"
      );
    }
  }
  // handle resize
  var resizeHandler = debounce(
    function (img) {
      var newSliderWidth = slider.offsetWidth;
      scrubCont.style.width = newSliderWidth / 2 + "px";
      img.style.width = newSliderWidth + "px";
    },
    500,
    false
  );
  window.addEventListener("resize", function (e) {
    resizeHandler(scrubImage, slider, scrubCont);
  });
}
// avoid non-specific classes..
function alertOnNonSpecificClassNames(config) {
  var scrubName = config.target;
  if (scrubName != null) {
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
}
// find the user-targeted slider
function findAndCreateSlider(scrubConfig) {
  alertOnNonSpecificClassNames(scrubConfig);
  // get chosen slider container
  var scrubSlider = document.querySelector(scrubConfig.target);
  if (scrubSlider != undefined && scrubSlider != null) {
    // add control class
    scrubSlider.className += " scrub-slider";
    // set height if given
    if (scrubConfig.height != null) {
      scrubSlider.style.height = scrubConfig.height;
    }
    // get chosen slider's images
    var scrubChildren = scrubSlider.children;
    // create slider images and control their functionality
    for (var i = 0; i < 2; i++) {
      var child = scrubChildren[i];
      if (scrubChildren[i] && child.tagName) {
        createScrubImages(scrubSlider, scrubConfig, scrubChildren[i], child.tagName, i);
      }
    }
    // add scrub control/handle
    // always added in the background to enable the sliding action
    var scrubHandle_1;
    scrubHandle_1 = document.createElement("div");
    scrubHandle_1.className = "sliding handleOn ";
    scrubHandle_1.innerHTML =
      '<span class="sliding-left"></span><span class="sliding-right"></span>';
    scrubSlider.appendChild(scrubHandle_1);
    // remove the physical handle if not required
    if ((scrubConfig === null || scrubConfig === void 0 ? void 0 : scrubConfig.handle) == false) {
      scrubHandle_1.innerHTML = "";
      scrubHandle_1.classList.remove("handleOn");
      scrubHandle_1.className += " handleOff ";
    }
    // add mousemove listener to the slider
    scrubSlider.addEventListener("mousemove", function (e) {
      var mousePosition = e.clientX - this.offsetLeft;
      var fullWidth = scrubSlider.offsetWidth;
      mover(mousePosition, fullWidth, scrubSlider, scrubHandle_1);
    });
  } else {
    console.warn(
      "%cScrub Slider needs to be passed an appropriate selector %c- preferably an ID, but a specific, unique class works too.",
      "color:cornflowerblue;",
      "color:indianred;"
    );
  }
}
// main entry fn
function Scrub(scrubArg) {
  var _a, _b, _c, _d, _e;
  // set function default arguments
  var scrubConfig = {
    target: (_a = scrubArg.target) !== null && _a !== void 0 ? _a : scrubArg,
  };
  scrubConfig.height = (_b = scrubArg.height) !== null && _b !== void 0 ? _b : "500px";
  scrubConfig.handle = (_c = scrubArg.handle) !== null && _c !== void 0 ? _c : true;
  scrubConfig.src = (_d = scrubArg.src) !== null && _d !== void 0 ? _d : null;
  scrubConfig.alt = (_e = scrubArg.alt) !== null && _e !== void 0 ? _e : null;
  // init functionality
  try {
    findAndCreateSlider(scrubConfig);
  } catch (e) {
    console.trace("%cuh-oh: %c" + e + "", "color:indianred;", "color:cornflowerblue;");
  }
}

module.exports = Scrub;

/* Scrub Slider */

import "../scss/scrub.scss";

interface ScrubConfig {
  target: string;
  height?: string;
  handle?: boolean;
  src?: [string, string] | null;
  alt?: [string, string] | null;
}

// debounce (thanks to Underscore)
function debounce(func: (...args: any[]) => void, wait: number, immediate: boolean) {
  let timeout: number | null;

  return function (this: any, ...args: any[]) {
    const context = this;
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// handle main scrub action
const mover = debounce(
  function (pos: number, full: number, sldr: HTMLElement, handle: HTMLElement) {
    if (handle) {
      const shrink: number = full - pos;
      const sliding: HTMLElement | null = sldr.querySelector(".sliding");
      if (sliding) {
        sliding.style.left = (pos > 0 ? pos : 0) + "px";
        const contentLeft: HTMLElement | null = sldr.querySelector(".scrub-left");
        if (contentLeft) {
          contentLeft.style.width = (pos > 0 ? pos : 0) + "px";
        }
        const contentRight: HTMLElement | null = sldr.querySelector(".scrub-right");
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
function createScrubImages(
  slider: HTMLElement,
  config: ScrubConfig,
  el: HTMLElement,
  type: string,
  index: number
) {
  let scrubImage: HTMLElement;
  let imgSrc: string;
  let scrubCont: HTMLElement;
  let sliderWidth = slider.offsetWidth;
  if (type == "DIV") {
    // clone div
    scrubImage = el.cloneNode(true) as HTMLElement;
    el.parentNode?.removeChild(el);
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
    if (el.style.backgroundImage == "") {
      console.warn(
        "%cScrub Slider divs must have a %cbackground image to work!%c >:[",
        "color:cornflowerblue;",
        "color:indianred;",
        "color:cornflowerblue;"
      );
    }
  } else if (type == "IMG") {
    // clone div
    scrubImage = document.createElement("div");
    imgSrc = el.getAttribute("src") ?? "";
    // if src specified manually
    if (config.src != null) {
      imgSrc = index == 0 ? config.src[0] : config.src[1];
    }
    el.parentNode?.removeChild(el);
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
  }

  // handle resize
  const resizeHandler = debounce(
    function (img: HTMLElement) {
      const newSliderWidth = slider.offsetWidth;
      scrubCont.style.width = newSliderWidth / 2 + "px";
      img.style.width = newSliderWidth + "px";
    },
    500,
    false
  );
  window.addEventListener("resize", function (e: Event) {
    resizeHandler(scrubImage, slider, scrubCont);
  });
}

// avoid non-specific classes..
function alertOnNonSpecificClassNames(config: ScrubConfig) {
  let scrubName: string | null | undefined = config.target;
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
function findAndCreateSlider(scrubConfig: ScrubConfig): void {
  alertOnNonSpecificClassNames(scrubConfig);

  // get chosen slider container
  const scrubSlider: HTMLElement = document.querySelector(
    scrubConfig.target as string
  ) as HTMLElement;

  if (scrubSlider != undefined && scrubSlider != null) {
    // add control class
    scrubSlider.className += " scrub-slider";
    // set height if given
    if (scrubConfig.height != null) {
      scrubSlider.style.height = scrubConfig.height;
    }

    // get chosen slider's images
    const scrubChildren: HTMLCollection = scrubSlider.children;

    // create slider images and control their functionality
    for (let i = 0; i < 2; i++) {
      const child: HTMLElement = <HTMLElement>scrubChildren[i];
      if (scrubChildren[i] && child.tagName) {
        createScrubImages(
          scrubSlider,
          scrubConfig,
          scrubChildren[i] as HTMLElement,
          child.tagName,
          i
        );
      }
    }

    // add scrub control/handle
    // always added in the background to enable the sliding action
    let scrubHandle: HTMLElement;
    scrubHandle = document.createElement("div");
    scrubHandle.className = "sliding handleOn ";
    scrubHandle.innerHTML = '<span class="sliding-left"></span><span class="sliding-right"></span>';
    scrubSlider.appendChild(scrubHandle);

    // remove the physical handle if not required
    if (scrubConfig?.handle == false) {
      scrubHandle.innerHTML = "";
      scrubHandle.classList.remove("handleOn");
      scrubHandle.className += " handleOff ";
    }

    // add mousemove listener to the slider
    scrubSlider.addEventListener("mousemove", function (e: MouseEvent) {
      const mousePosition = e.clientX - this.offsetLeft;
      const fullWidth = scrubSlider.offsetWidth;
      mover(mousePosition, fullWidth, scrubSlider, scrubHandle);
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
function Scrub(scrubArg: string | ScrubConfig): void {
  // set function default arguments
  let scrubConfig: ScrubConfig = {
    target: (scrubArg as ScrubConfig).target ?? (scrubArg as string),
  };
  scrubConfig.height = (scrubArg as ScrubConfig).height ?? "500px";
  scrubConfig.handle = (scrubArg as ScrubConfig).handle ?? true;
  scrubConfig.src = (scrubArg as ScrubConfig).src ?? null;
  scrubConfig.alt = (scrubArg as ScrubConfig).alt ?? null;

  // init functionality
  try {
    findAndCreateSlider(scrubConfig);
  } catch (e) {
    console.trace("%cuh-oh: %c" + e + "", "color:indianred;", "color:cornflowerblue;");
  }
}

export default Scrub;

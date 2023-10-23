/* Scrub Slider */

import "../scss/scrub.scss";

interface ScrubConfig {
  target?: string | null;
  height?: string;
  handle?: boolean;
  src?: [string, string] | null;
  alt?: [string, string] | null;
}

/* helper functions */
// object test
const isObject = (a: any): boolean => {
  return !!a && a.constructor === Object;
};
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

function Scrub(scrubArg: string | ScrubConfig): void {
  // set function default arguments
  const scrubConfig: ScrubConfig = scrubArg as ScrubConfig;
  scrubConfig.target = scrubConfig.target ?? null;
  scrubConfig.height = scrubConfig.height ?? "500px";
  scrubConfig.handle = scrubConfig.handle ?? true;
  scrubConfig.src = scrubConfig.src ?? null;
  scrubConfig.alt = scrubConfig.alt ?? null;

  // check if simple call or config passed
  if (isObject(scrubArg) || typeof scrubArg == "object") {
    ScrubInitiate();
  } else {
    ScrubInitiate();
  }

  function ScrubInitiate(): void | null {
    // get chosen slider container
    const scrubSlider: HTMLElement = document.querySelector(
      (scrubArg as ScrubConfig).target ?? (scrubArg as string)
    ) as HTMLElement;
    if (!scrubSlider || scrubSlider == null) {
      return null;
    }

    try {
      function utilityFn(callback: Function): void {
        // avoid non-specific classes..
        var scrubName: string | null | undefined =
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
          var scrubChildren: HTMLCollection = scrubSlider.children;

          function createScrubImages(el: HTMLElement, type: string, index: number) {
            var scrubImage: HTMLElement;
            var imgSrc: string;
            var scrubCont: HTMLElement;
            var resizeFn: Function;
            if (type == "DIV") {
              // clone div
              scrubImage = el.cloneNode(true) as HTMLElement;
              el.parentNode?.removeChild(el);
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
              // need a background image...
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
                function (img: HTMLElement) {
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
              imgSrc = el.getAttribute("src") ?? "";
              // if src specified manually
              if (scrubConfig.src != null) {
                imgSrc = index == 0 ? scrubConfig.src[0] : scrubConfig.src[1];
              }
              el.parentNode?.removeChild(el);
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
            var child: HTMLElement = <HTMLElement>scrubChildren[i];
            if (scrubChildren[i] && child.tagName) {
              createScrubImages(scrubChildren[i] as HTMLElement, child.tagName, i);
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

      utilityFn(function (slider: HTMLElement): void {
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
          function (pos: number, full: number, sldr: HTMLElement) {
            if (scrubHandle) {
              var shrink: number = full - pos;
              var sliding: HTMLElement | null = sldr.querySelector(".sliding");
              if (sliding) {
                sliding.style.left = (pos > 0 ? pos : 0) + "px";
                var contentLeft: HTMLElement | null = sldr.querySelector(".scrub-left");
                if (contentLeft) {
                  contentLeft.style.width = (pos > 0 ? pos : 0) + "px";
                }
                var contentRight: HTMLElement | null = sldr.querySelector(".scrub-right");
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
        slider.addEventListener("mousemove", function (e: MouseEvent) {
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

export default Scrub;

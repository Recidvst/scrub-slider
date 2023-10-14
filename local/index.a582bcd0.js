function debounce(e, t, r) {
  var l;
  return function () {
    var c = this,
      n = arguments,
      o = function () {
        (l = null), r || e.apply(c, n);
      },
      i = r && !l;
    clearTimeout(l), (l = setTimeout(o, t)), i && e.apply(c, n);
  };
}
function Scrub(e) {
  function t() {
    var t =
      isObject(e) || "object" == typeof e
        ? document.querySelectorAll(e.target)[0]
        : document.querySelectorAll(e)[0];
    try {
      !(function (r) {
        var l = isObject(e) || "object" == typeof e ? e.target : e;
        if (
          ((l = l.replace("#", "")),
          (l = l.replace(".", "")),
          l.indexOf(".") > -1 &&
            document.querySelectorAll(l).length > 1 &&
            console.warn(
              "%cScrub Slider works best if you use an %cID%c or a %cunique%c class... ",
              "color:cornflowerblue;",
              "color:indianred;",
              "color:cornflowerblue;",
              "color:indianred;",
              "color:cornflowerblue;",
            ),
          void 0 != t)
        ) {
          t.className += " scrub-slider";
          var c = t.offsetWidth;
          null != e.height && (t.style.height = e.height);
          for (var n = t.children, o = 0; o < 2; o++) {
            var i = n[o];
            n[o] &&
              i.tagName &&
              (function (r, l, n) {
                if ("DIV" == l) {
                  var o = r.cloneNode(!0);
                  r.parentNode.removeChild(r);
                  var i = document.createElement("div");
                  if (
                    ((i.className =
                      0 == n ? "scrub-content scrub-left" : "scrub-content scrub-right"),
                    (i.style.width = parseInt(c / 2) + "px"),
                    t.insertBefore(i, t.firstChild),
                    (o.style.width = c + "px"),
                    null != e.alt && o.setAttribute("alt", 0 == n ? e.alt[0] : e.alt[1]),
                    null != e.src)
                  ) {
                    var s = 0 == n ? e.src[0] : e.src[1];
                    o.style.backgroundImage = "url(" + s + ")";
                  }
                  i.appendChild(o),
                    "" == r.style.backgroundImage &&
                      console.warn(
                        "%cScrub Slider divs must have a %cbackground image to work!%c >:[",
                        "color:cornflowerblue;",
                        "color:indianred;",
                        "color:cornflowerblue;",
                      );
                  var a = debounce(function (e) {
                    var r = t.offsetWidth;
                    (i.style.width = parseInt(r / 2) + "px"), (e.style.width = r + "px");
                  }, 500);
                  window.addEventListener("resize", function (e) {
                    a(o);
                  });
                } else if ("IMG" == l) {
                  var o = document.createElement("div"),
                    s = r.getAttribute("src");
                  null != e.src && (s = 0 == n ? e.src[0] : e.src[1]), r.parentNode.removeChild(r);
                  var i = document.createElement("div");
                  (i.className = 0 == n ? "scrub-content scrub-left" : "scrub-content scrub-right"),
                    (i.style.width = parseInt(c / 2) + "px"),
                    null != e.alt && o.setAttribute("alt", 0 == n ? e.alt[0] : e.alt[1]),
                    t.insertBefore(i, t.firstChild),
                    (o.style.width = c + "px"),
                    (o.style.backgroundImage = "url(" + s + ")"),
                    i.appendChild(o);
                  var a = debounce(function (e) {
                    var r = t.offsetWidth;
                    (i.style.width = parseInt(r / 2) + "px"), (e.style.width = r + "px");
                  }, 500);
                  window.addEventListener("resize", function (e) {
                    a(o);
                  });
                }
              })(n[o], i.tagName, o);
          }
          r(t);
        } else
          console.warn(
            "%cScrub Slider needs to be passed an appropriate selector %c- preferably an ID, but a specific, unique class works too.",
            "color:cornflowerblue;",
            "color:indianred;",
          );
      })(function (t) {
        var r = document.createElement("div");
        (r.className = "sliding handleOn "),
          (r.innerHTML = '<span class="sliding-left"></span><span class="sliding-right"></span>'),
          t.appendChild(r),
          0 == e.handle && ((r.innerHTML = ""), r.classList.remove("handleOn"));
        var l = debounce(function (e, t, l) {
          if (r) {
            var c = t - e;
            l.querySelectorAll(".sliding")[0].style.left = (e > 0 ? e : 0) + "px";
            l.querySelectorAll(".scrub-left")[0].style.width = (e > 0 ? e : 0) + "px";
            l.querySelectorAll(".scrub-right")[0].style.width = (c > 0 ? c : 0) + "px";
          }
        }, 1);
        t.addEventListener("mousemove", function (e) {
          var r = e.clientX - this.offsetLeft,
            c = t.offsetWidth;
          l(r, c, t);
        });
      });
    } catch (e) {
      console.trace("%cuh-oh: %c" + e, "color:indianred;", "color:cornflowerblue;");
    }
  }
  isObject(e) || "object" == typeof e
    ? ((e.target = void 0 === e.target || (!isObject(e) && "object" != typeof e) ? null : e.target),
      (e.height =
        void 0 === e.height || (!isObject(e) && "object" != typeof e) ? "500px" : e.height),
      (e.handle = void 0 === e.handle || (!isObject(e) && "object" != typeof e) || e.handle),
      (e.src = void 0 === e.src || (!isObject(e) && "object" != typeof e) ? null : e.src),
      (e.alt = void 0 === e.alt || (!isObject(e) && "object" != typeof e) ? null : e.alt),
      t())
    : t();
}
var isObject = function (e) {
  return !!e && e.constructor === Object;
};

//# sourceMappingURL=index.a582bcd0.js.map

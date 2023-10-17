// import Scrub from "../../dist/scrub.esm";

// setting height for hero example.
var a = document.getElementById("slider1");
if (a.offsetTop < window.innerHeight) {
  var b = window.innerHeight - a.offsetTop + "px";
}

// different methods of initiating a slider
Scrub({
  target: "#slider1",
  height: b,
  handle: true,
  src: [
    "https://raw.github.com/Recidvst/recidvst-images/master/mustang-old-min.jpg",
    "https://raw.github.com/Recidvst/recidvst-images/master/mustang-old-inverted-min.jpg",
  ],
  alt: ["Image number 1 alt", "Image number 2 alt"],
});
Scrub("#slider2");
Scrub({
  target: ".slider3",
  height: "800px",
});

// Scrub('nonexistent');

import Scrub from "../../dist/scrub.esm.js";

// setting height for hero example.
var a = document.getElementById("slider1");
if (a.offsetTop < window.innerHeight) {
  var b = window.innerHeight - a.offsetTop + "px";
}

// different methods of initiating a slider //

// config object passed and providing images via the config (so uses background images on the provided empty divs)
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

// simple selector passed and using the images from the html
Scrub("#slider2");

// Scrub(".row"); // warn that the selector must be more specific and also that it needs an image

// Scrub('nonexistent'); // warn that the selector is wrong

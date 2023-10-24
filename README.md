[![npm](https://img.shields.io/npm/dt/scrub-slider.svg)]()
[![npm](https://img.shields.io/npm/v/scrub-slider.svg)]()
[![license](https://img.shields.io/github/license/recidvst/scrub-slider.svg)]()

# Scrub Slider

A lightweight javascript library that lets you 'scrub' transition between two images with style.

[Demo Page](https://recidvst.github.io/scrub-slider "scrub demo")

## Install

- Install the package from [NPM](https://www.npmjs.com/package/scrub-slider "npm download") or [Yarn](https://yarnpkg.com/en/package/scrub-slider "yarn download").
- Or download manually from [Github](https://github.com/Recidvst/scrub-slider/archive/master.zip "Github download").

```bash
npm install scrub-slider
```

### JS

Either import the JS as a module:

```js
import Scrub from "scrub-slider";
```

Or consume the module as UMD/IIFE

```html
<script src="./scrub.iife.js"></script>
```

### CSS

Either import the CSS into your JS/CSS:

```js
import "scrub-slider/dist/scrub.css";
```

```scss
@import "scrub-slider/dist/scrub.css";
```

Or include it the old fashioned way:

```html
<link href="./scrub.css" rel="stylesheet" />
```

## Usage

> Scrub needs to be passed a containing element plus two images to work

- Initiate a Scrub instance by calling Scrub() with a valid selector (of the parent element). This is best as an ID but a unique class is fine too.
- If you wish to configure your slider, pass Scrub() an object with config options (see below).
- The container should have a width.
- You have a choice for how you want to pass the two images:
  - `<div>` with background-image
  - `<img>` with src properties
  - use a different tag and pass the src via config
- Edit the css provided to add your own styling to e.g. the handle

## Configure

You can configure your Scrub instance by passing your selector and some config parameters as an object. The available options are as follows:

### `Target`

**Purpose:** This is the item which you wish to become a Scrub slider! Pass the id or unique class of a container element.  
**Type:** string  
**Default:** null  
**Required:** Yes.

### `Height`

**Purpose:** This is the height of your Scrub instance. Defaults to 500px. Specify height in pixels.  
**Type:** string  
**Default:** 500px  
**Required:** No. But recommended.

### `Handle`

**Purpose:** This is the switch for the circular handle control on the slider's dividing line. Set to false to hide. If you want to style this differently, add your own css on '.sliding'.  
**Type:** bool  
**Default:** true  
**Required:** No.

### `Src`

**Purpose:** Alternate method of specifying slider images. Pass an array of two strings containing an img src. Left then right.  
**Type:** array  
**Default:** null  
**Required:** No. As long as the element you want to instantiate as a Scrub slider is an image with valid src property or a div with a valid background-image property.

### `Alt`

**Purpose:** Add an alt tag to the slider. Pass an array of two strings describing each image. Left then right.  
**Type:** array  
**Default:** null  
**Required:** No.

## Example

```js
Scrub({
  target: "#slider1",
  height: "500",
  handle: true,
  src: [
    "https://raw.github.com/Recidvst/recidvst-images/master/mustang-old-min.jpg",
    "https://raw.github.com/Recidvst/recidvst-images/master/mustang-old-inverted-min.jpg",
  ],
  alt: ["Image number 1 alt", "Image number 2 alt"],
});
```

[![npm](https://img.shields.io/npm/dt/scrub-slider.svg)]()
[![npm](https://img.shields.io/npm/v/scrub-slider.svg)]()
[![license](https://img.shields.io/github/license/recidvst/scrub-slider.svg)]()

# Scrub Slider

A lightweight javascript library that lets you 'scrub' transition between two images with style.

[Demo Page](https://recidvst.github.io/scrub-slider 'scrub demo')

## Get Scrub Slider

### Download

- Install the package (or download the dist files manually) from [Github](https://github.com/Recidvst/scrub-slider/archive/master.zip 'Github download') or from [NPM](https://www.npmjs.com/package/scrub-slider 'npm download') or [Yarn](https://yarnpkg.com/en/package/scrub-slider 'yarn download').
- Include the js and css in your application:

### Install

#### JS

Either import the JS as a module:

```bash
npm install scrub-slider
```

```js
import Scrub from 'scrub-slider'
```

Or consume the module as UMD/IIFE

```html
<script src="dist/scrub.iife.js"></script>
```

#### CS

Either import the CSS into your JS/CSS:

```js
import 'scrub-slider/dist/scrub.css'
```

```scss
@import 'scrub-slider/dist/scrub.css';
```

Or include it the old fashioned way:

```html
<link href="dist/scrub.css" rel="stylesheet" />
```

### Initiate

- Scrub needs to be passed a containing element and two image objects.
- Initiate a Scrub instance by calling Scrub() with a valid selector (of the parent element). This is best as an ID but a unique class is fine too.
- If you wish to configure your slider, pass Scrub() an object with config options (see below).
- The container should have a width. You have a choice for the two image children -> divs with background-images or imgs with src set are preferred, but you can also use a different tag and pass the src via config.

### Configure

You can configure your Scrub instance by passing your selector and some config parameters as an object. The available options are as follows:

#### Target

**Purpose:** This is the item which you wish to become a Scrub slider! Pass the id or unique class of a container element.  
**Type:** string  
**Default:** null  
**Required:** Yes.

#### Height

**Purpose:** This is the height of your Scrub instance. Defaults to 500px. Specify height in pixels.  
**Type:** string  
**Default:** 500px  
**Required:** No. But recommended.

#### Handle

**Purpose:** This is the switch for the circular handle control on the slider's dividing line. Set to false to hide. If you want to hide the vertical bar as well, use css on '.sliding'.  
**Type:** bool  
**Default:** true  
**Required:** No.

#### Src

**Purpose:** Alternate method of specifying slider images. Pass an array of two strings containing an img src. Left then right.  
**Type:** array  
**Default:** null  
**Required:** No. As long as the element you want to instantiate as a Scrub slider is an image or a div with a valid background-image style.

#### Alt

**Purpose:** Add an alt tag to the slider. Pass an array of two strings describing each image. Left then right.  
**Type:** array  
**Default:** null  
**Required:** No.

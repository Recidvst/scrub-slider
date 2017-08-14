# Scrub Slider
A lightweight javascript plugin that lets you display transition images with style.

[Landing Page](https://recidvst.github.io/scrub-slider 'scrub landing')

[Codepen POC](https://codepen.io/Recidvst/pen/WjybOa 'scrub poc')

To-do:
- Create as npm & yarn packages.
- Test suite.
- Performance improvements.
- Improve landing page.


## Get Scrub Slider

### Download
- Download the Scrub Slider dist files from [Github](https://github.com/Recidvst/scrub-slider/archive/master.zip 'Github download') or from NPM or Yarn (coming soon..)
- Include the minified Scrub.min.js and Scrub.min.css files in the usual fashion...

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
    **Required:** Yes.*  
#### Height
    **Purpose:** This is the height of your Scrub instance. Defaults to 500px. Specify height in pixels.  
    **Type:** string  
    **Default:** 500px  
    **Required:** No. But recommended.*   
#### Handle
    **Purpose:** This is the switch for the circular handle control on the slider's dividing line. Set to false to hide. If you want to hide the vertical bar as well, use css on '.sliding'.  
    **Type:** bool  
    **Default:** true  
    **Required:** No.*   
#### Src
    **Purpose:** Alternate method of specifying slider images. Pass an array of two strings containing an img src. Left then right.  
    **Type:** array  
    **Default:** null  
    **Required:** No. As long as the element you want to instantiate as a Scrub slider is an image or a div with a valid background-image style.*   
#### Alt
    **Purpose:** Add an alt tag to the slider. Pass an array of two strings describing each image. Left then right.  
    **Type:** array  
    **Default:** null  
    **Required:** No.

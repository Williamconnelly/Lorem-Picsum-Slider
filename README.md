# Lorem Picsum Slider

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.

A live demo can be found [here](https://williamconnelly.github.io/Lorem-Picsum-Slider/).

## Approach

The slider takes an array of images and renders the full length of them absolutely positioned outside of the visible slider box. The slider component tracks the current index of the array and as it increments forwards and backwards, each neighboring image is 'prepared' and positioned either to the left or right depending on the anticipated direction. When the slider has run the length of the array, it queues the first image into alignment and resets the counter.

Each time the Next or Previous methods are invoked, they apply and remove several positional classes from the image at the current index and it's neighboring elements. It's more DOM interaction than I would have liked but this also avoids applying inline styles with high-specificity by setting attributes or by altering the elements' styles directly.

## Features

##### Controls

- Slides can be navigated with the press of either the Next or Previous buttons. You can also use the Back and Forward arrow keys.
- Toggling Automate will flip forward through the slides until toggled off. Using the arrow keys to navigate, pressing the buttons, opening a modal, and toggling the same button all end the automation.
- Clicking on an image will bring up a larger modal of the slide clicked. The modal can be closed by clicking outside of it, pressing Escape, or by pressing the upper-right-hand button.

##### Design

> While the classic slideshow look dictates floating arrows for left and right, I felt that a tray of buttons would scale better to a mobile interface and would visually stand out regardless of the current image. The banner link, the slides, and each of the buttons have clear interactive prompts via hover and focus. The Automate button changes color and text when active and triggers an animation on the Next button with each increment. 

##### Responsiveness

> Layout scales well across different screen sizes. In order to accommodate images of varying scale, the layout doesn't scale as smoothly as it otherwise could, instead making use of a few, hard-coded breakpoints. 

## Issues

As it stands, there is no pagination for the incoming images and each element of the array is fully rendered and so, were the slider provided with a larger dataset, this may become an issue. 

For the sake of preserving aspect ratio, slides do not have a min-width and so the slider would likely do poorly with especially narrow images.

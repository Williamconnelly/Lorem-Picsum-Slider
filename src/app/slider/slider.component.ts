import { Component, OnInit } from '@angular/core';
import { SlideService } from '../slide.service';

interface Image {
  author: string;
}

interface Slide {
  post_url: string;
  url: string;
}

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  slides: Array<Object> = [];
  currentIndex = 0;
  // Upper-scope variable so that different methods can start and stop it
  interval = null;
  constructor(private _slideService: SlideService) { }

  ngOnInit() {
    // When initialized, make an http req to Picsum
    this._slideService.getSlides().subscribe(images => {
      // Filter through ALL images for those authored by Alejandro Escamilla and store them in component slides variable
      this.slides = images.filter((image: Image) => image.author === 'Alejandro Escamilla');
      // Add new, valid Img URL to each slide for display
      this.slides.map((slide: Slide) => {
        slide.url = `http://source.unsplash.com/${slide.post_url.split('/')[slide.post_url.split('/').length - 1]}`;
      });
    });
    // Add event listeners for arrow keys
    window.onkeydown = event => {
      if (event.key === 'ArrowRight') {
        this.nextSlide(event);
      }
      if (event.key === 'ArrowLeft') {
        this.previousSlide(event);
      }
    };
  }
  // Advance slideshow forwards
  nextSlide(e) {
    // If the interval is running, clear it when invoked by user input
    if (e.target.classList[0] !== 'toggle') {
      this.stopAutomate();
    }
    // Grab all slide elements
    const eSlides = document.getElementsByClassName('slide');
    // Swap classes to slide left
    eSlides[this.currentIndex].classList.remove('center');
    eSlides[this.currentIndex].classList.add('left');
    // If on the last slide, reset the index. If not, move 1 forward
    this.currentIndex === this.slides.length - 1 ? this.currentIndex = 0 : this.currentIndex += 1;
    // Swap classes and slide left into center position
    eSlides[this.currentIndex].classList.remove('reset-right', 'left', 'right', 'reset-left');
    eSlides[this.currentIndex].classList.add('center');
    // If NOW on the final slide, reset the position of first slide. If not, reset the position of next slide.
    if (this.currentIndex === this.slides.length - 1) {
      eSlides[0].classList.add('reset-right');
    } else {
      eSlides[this.currentIndex + 1].classList.remove('reset-left');
      eSlides[this.currentIndex + 1].classList.add('reset-right');
    }
  }
  // Regress slideshow backawards
  previousSlide(e) {
    // If the interval is running, clear it when invoked by user input
    if (e.target.className !== 'toggle') {
      this.stopAutomate();
    }
    // Grab all slide elements
    const eSlides = document.getElementsByClassName('slide');
    // Swap classes to slide right
    eSlides[this.currentIndex].classList.remove('center');
    eSlides[this.currentIndex].classList.add('right');
    // When previous is the first action, prepare the final img element to the left
    if (this.currentIndex === 0) {
      eSlides[this.slides.length - 1].classList.add('reset-left');
      // Trigger DOM reflow to move the element before further animations
      void eSlides[this.slides.length - 1].offsetWidth;
    }
    // If on the first slide, move index to the end. If not, move 1 backwards
    this.currentIndex === 0 ? this.currentIndex = this.slides.length - 1 : this.currentIndex -= 1;
    // Swap classes and slide right into center position
    eSlides[this.currentIndex].classList.remove('reset-left', 'right', 'left', 'reset-right');
    eSlides[this.currentIndex].classList.add('center');
    // If NOW on the final slide, reset the position of first slide. If not, reset the position of next slide.
    if (this.currentIndex === 0) {
      eSlides[this.slides.length - 1].classList.add('reset-left');
    } else {
      eSlides[this.currentIndex - 1].classList.remove('reset-right');
      eSlides[this.currentIndex - 1].classList.add('reset-left');
    }
  }
  // Sets or clears an interval that calls nextSlide()
  toggleAutomate(event) {
    if (this.interval !== null) {
      this.stopAutomate();
    } else {
      this.interval = setInterval(() => {
        this.nextSlide(event);
      }, 2000);
    }
  }
  // Clears automate interval
  stopAutomate() {
  clearInterval(this.interval);
    this.interval = null;
  }
}

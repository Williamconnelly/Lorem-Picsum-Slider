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
  }
  // Advance slideshow forward
  nextSlide() {
    // Grab all slide elements
    const referenceSlides = document.getElementsByClassName('slide');
    // If currently on the final slide, reset the index
    if (this.currentIndex === this.slides.length - 1) {
      referenceSlides[this.currentIndex].style.display = 'none';
      this.currentIndex = 0;
      // else, increase the index by 1
    } else {
      this.currentIndex += 1;
      referenceSlides[this.currentIndex - 1].style.display = 'none';
    }
    // Set the slide of the new current index to visible
    referenceSlides[this.currentIndex].classList.remove('slide-left');
    referenceSlides[this.currentIndex].classList.add('slide-right');
    referenceSlides[this.currentIndex].style.display = 'block';
  }
  // Revert slideshow back
  previousSlide() {
    // Grab all slide elements
    const referenceSlides = document.getElementsByClassName('slide');
    // If currently on the first slide, move index to the last slide
    if (this.currentIndex === 0) {
      referenceSlides[this.currentIndex].style.display = 'none';
      this.currentIndex = this.slides.length -1;
      // else, reduce the index by 1
    } else {
      this.currentIndex -= 1;
      referenceSlides[this.currentIndex + 1].style.display = 'none';
    }
    // Set the slide of the new current index to visible
    referenceSlides[this.currentIndex].classList.remove('slide-right');
    referenceSlides[this.currentIndex].classList.add('slide-left');
    referenceSlides[this.currentIndex].style.display = 'block';
  }
  // Sets or clears an interval that calls nextSlide()
  toggleAutomate() {
    if (this.interval !== null) {
      clearInterval(this.interval);
      this.interval = null;
    } else {
      this.interval = setInterval(() => {
        this.nextSlide();
      }, 2000);
    }
  }
}

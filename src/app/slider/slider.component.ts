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
  nextSlide() {
    const referenceSlides = document.getElementsByClassName('slide');
    if (this.currentIndex === this.slides.length - 1) {
      referenceSlides[this.currentIndex].style.display = 'none';
      this.currentIndex = 0;
    } else {
      this.currentIndex += 1;
      referenceSlides[this.currentIndex - 1].style.display = 'none';
    }
    referenceSlides[this.currentIndex].style.display = 'block';
  }
  previousSlide() {
    const referenceSlides = document.getElementsByClassName('slide');
    if (this.currentIndex === 0) {
      referenceSlides[this.currentIndex].style.display = 'none';
      this.currentIndex = this.slides.length -1;
    } else {
      this.currentIndex -= 1;
      referenceSlides[this.currentIndex + 1].style.display = 'none';
    }
    referenceSlides[this.currentIndex].style.display = 'block';
  }
}
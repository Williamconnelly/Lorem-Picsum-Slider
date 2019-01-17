import { Component, OnInit } from '@angular/core';
import { SlideService } from '../slide.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  constructor(private _slideService: SlideService) { }

  ngOnInit() {
    this._slideService.getSlides().subscribe(result => {
      console.log(result);
    });
  }

}

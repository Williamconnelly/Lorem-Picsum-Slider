import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SlideService {
  // Picsum endpoint for getting all images
  private _picsumURL = `https://picsum.photos/list`;
  constructor(private http: HttpClient) { }
  // Service method to make the Http request to Picsum and return an observable
  getSlides() {
    return this.http.get<Array<Object>>(this._picsumURL);
  }
}

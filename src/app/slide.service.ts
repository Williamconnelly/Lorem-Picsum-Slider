import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SlideService {
  private _picsumURL = `https://picsum.photos/list`;
  constructor(private http: HttpClient) { }
  getSlides() {
    return this.http.get<any>(this._picsumURL);
  }
}

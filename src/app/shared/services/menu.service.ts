import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private _http:HttpClient) { }
  getMenuItems(): Observable<any> {
    return this._http.get('Category/GetsMenu');
  }


}

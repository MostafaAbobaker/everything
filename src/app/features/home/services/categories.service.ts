import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _http:HttpClient) { }

  getCategories(pNum:number, pSize: number):Observable<any> {
    return this._http.get(`Category/GetCategory?PageNumber=${pNum}&PageSize=${pSize}`);
  }
  /* getLastCategories():Observable<any> {
    return this._http.get('Category/GetCategory');
  } */
}

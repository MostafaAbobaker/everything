import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductSearchService {

  constructor(private _http:HttpClient) { }

  getProductsSearch(name: string):Observable<any> {
    return this._http.get(`api/ProductWeb/GetAllProductsByName?SearchTerm=${name}`)
  }


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http: HttpClient) { }

  getNewProducts():Observable<any> {
    return this._http.get('Product/GetNewProduct');
  }
  getMostPopular():Observable<any> {
    return this._http.get('Product/GetMostPopular');
  }
  getBestSeller():Observable<any> {
    return this._http.get('Product/GetBestSeller');
  }
  getFeatured():Observable<any> {
    return this._http.get('Product/GetFeaterd');
  }
  getProductDetails(id:string):Observable<any> {
    return this._http.get(`products/${id}`)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private _http:HttpClient) { }

  getBrands():Observable<any> {
    return this._http.get('Brands/GetBrandList');
  }
  getBrandsFilter(id:number[]):Observable<any> {
    return this._http.get(`api/ProductWeb/GetProductsByBrandIds?BrandIds=${id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '../interface/IResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http: HttpClient) { }
  getAllProducts(page:number,size:number):Observable<any>{
    return this._http.get(`api/ProductWeb/GetNewProduct?pageNumber=${page}&PageSize=${size}`)
  }

  getNewProducts(page:number,size:number):Observable<IResponse> {
    return this._http.get<IResponse>(`api/ProductWeb/GetNewProduct?pageNumber=${page}&pageSize=${size}`);
  }
  getMostPopular():Observable<IResponse> {
    return this._http.get<IResponse>(`api/ProductWeb/GetMostPopular`);
  }
  getBestSeller():Observable<IResponse> {
    return this._http.get<IResponse>(`api/ProductWeb/GetBestSeller`);
  }
  getFeatured():Observable<any> {
    return this._http.get('api/ProductWeb/GetFeaterd');
  }
  getProductDetails(id:number):Observable<any> {
    return this._http.get(`api/ProductWeb/GetProductDetails?productId=${id}`)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from '../interface/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ShapingCartService {

  CartItemNumber= new BehaviorSubject<number>(0);
  CartItemProduct= new BehaviorSubject<IProduct[]>([])
  constructor(private _http:HttpClient) {
    this.showCart()

  }

  showCart() {
    this.getCartItems().subscribe({
      next:(result) => {
        this.CartItemProduct.next(result.data.products);

        this.CartItemNumber.next(result.numOfCartItems);
      }
    })
  }
  getCartItems(): Observable<any> {
    return this._http.get('cart')
  }
  addCartItem(product_id:string): Observable<any> {
    return this._http.post('cart',
      {productId: product_id}
      )
  }
  updateCartItem(id:string,count:number): Observable<any> {
    return this._http.put(`cart/${id}`,
      {count: count}
      )
  }
  removeCartItem(id:string): Observable<any> {
    return this._http.delete(`cart/${id}`
      )
  }

  deleteCart(): Observable<any> {
    return this._http.delete('cart'
      )
  }

  shippingAddress(id:any , form:object): Observable<any> {
    return this._http.post(`orders/checkout-session/${id}?url=http://localhost:4200`,
      {shippingAddress: form}
    )
  }

}

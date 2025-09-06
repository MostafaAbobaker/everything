import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from '../interface/iproduct';
import { IcartItem, PaymentOrder } from '../interface/icart-item';

@Injectable({
  providedIn: 'root',
})
export class ShapingCartService {
  CartItemNumber = new BehaviorSubject<number>(0);
  CartItemProduct = new BehaviorSubject<IProduct[]>([]);
  constructor(private _http: HttpClient) {}

  addCartItem(product_id: string): Observable<any> {
    return this._http.post('cart', { productId: product_id });
  }
  updateCartItem(id: string, count: number): Observable<any> {
    return this._http.put(`cart/${id}`, { count: count });
  }
  removeCartItem(id: string): Observable<any> {
    return this._http.delete(`cart/${id}`);
  }

  AddToCart(form: object): Observable<any> {
    return this._http.post('api/Cart/AddToCart', form);
  }
  GetAllItemsCartByUserId(userId: string): Observable<any> {
    return this._http.get(`api/Cart/GetAllItemsCartByUserId?userId=${userId}`);
  }

  GetItemsCartNotPurchased(userId: string): Observable<any> {
    return this._http.get(`api/Cart/GetItemsCartNotPurchased?userId=${userId}`);
  }

  RemoveAllItemsFromCart(userId: string): Observable<any> {
    return this._http.delete(
      `api/Cart/RemoveAllProductsFromCart?userId=${userId}`,
      {}
    );
  }

  RemoveItemFromCart(form: IcartItem): Observable<any> {
    return this._http.delete(
      `api/Cart/RemoveProductFromCartById?productId=${form.productId}&userId=${form.userId}`,
      {}
    );
  }

  IncreaseQuantityOfItemInCart(form: object): Observable<any> {
    return this._http.post('api/Cart/IncreaseQuantityOfItemInCart', form);
  }

  DecreaseQuantityOfItemFromCart(form: object): Observable<any> {
    return this._http.post('api/Cart/DecreaseQuantityOfItemFromCart', form);
  }

  shippingAddress(id: any, form: object): Observable<any> {
    return this._http.post(
      `orders/checkout-session/${id}?url=http://localhost:4200`,
      { shippingAddress: form }
    );
  }
  CreateOrder(_paymentOrder: PaymentOrder): Observable<any> {
    return this._http.post(
      `api/OrderWeb/CreateOrder?userId=${_paymentOrder.userId}&orderPaymentMethod=${_paymentOrder.orderPaymentMethod}`,
      {}
    );
  }
  GetOrders(userId: string): Observable<any> {
    return this._http.get(`api/OrderWeb/GetOrders?userId=${userId}`);
  }
}

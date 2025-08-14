import { Component } from '@angular/core';
import { ShapingCartService } from '../../services/shaping-cart.service';
import { IcartItem } from '../../interface/icart-item';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shaping-cart',
  templateUrl: './shaping-cart.component.html',
  styleUrl: './shaping-cart.component.scss'
})
export class ShapingCartComponent {
  cartItems: IcartItem[] = [];
  totalCartPrice: number = 0;
  apiErrorMassage: string = '';
  constructor(private _cartService: ShapingCartService,
    private _shapingCartService: ShapingCartService,
    private toastr: ToastrService
  ) { }
  ngOnInit(): void {

    this.getCartItems();
  }
  getCartItems() {
    debugger
    this._cartService.GetAllItemsCartByUserId(localStorage.getItem('everything-userId') || '').subscribe({
      next:(result) => {
        console.log(result);
        this.cartItems = result.data;
        this.totalCartPrice = this.cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
        },
      error:(err) => {  console.log(err ); this.apiErrorMassage = err.error.message}
    });
  }
  RemoveAllItemsFromCart() {
    this._cartService.RemoveAllItemsFromCart(localStorage.getItem('everything-userId') || '').subscribe({
      next: (result) => {
        this.toastr.error(result.message, 'All Products Removed from Cart', {
          closeButton: true,
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
        this.getCartItems();
      },
      error: (err) => {
        this.toastr.error(err.message, 'error', {
          closeButton: true,
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
      }
    });
  }
  RemoveItemFromCart(cartItem: IcartItem) {
    this._cartService.RemoveItemFromCart(cartItem).subscribe({
      next: (result) => {
        this.toastr.error(result.message, 'Product Removed from Cart', {
          closeButton: true,
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
        this.getCartItems();
      },
      error: (err) => {
        this.toastr.error(err.message, 'error', {
          closeButton: true,
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
      }
    });
  }
  IncreaseQuantityInCart(cartItem: IcartItem) {
    let cartObj = {
      "userId": localStorage.getItem('everything-userId') || '',
      "productId": cartItem.productId,
      "quantity": 1,
      "featuresId": cartItem.featuresId
    };
    this._shapingCartService.IncreaseQuantityOfItemInCart(cartObj).subscribe({
      next: (result) => {
        this.getCartItems();
      },
      error: (err) => {
        this.toastr.error(err.message, 'error', {
          closeButton: true,
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
      },
    });
  }
  DecreaseQuantityFromCart(cartItem: IcartItem) {
    let cartObj = {
      "userId": localStorage.getItem('everything-userId') || '',
      "productId": cartItem.productId,
      "quantity": 1,
      "featuresId": cartItem.featuresId
    };
    this._cartService.DecreaseQuantityOfItemFromCart(cartObj).subscribe({
      next: (result) => {
        this.getCartItems();
      },
      error: (err) => {
        this.toastr.error(err.message, 'error', {
          closeButton: true,
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
      }
    });
  }
}

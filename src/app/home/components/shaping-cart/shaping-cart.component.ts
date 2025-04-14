import { Component } from '@angular/core';
import { ShapingCartService } from '../../services/shaping-cart.service';

@Component({
  selector: 'app-shaping-cart',
  templateUrl: './shaping-cart.component.html',
  styleUrl: './shaping-cart.component.scss'
})
export class ShapingCartComponent {
  cartItems?: any;
  apiErrorMassage: string = '';
  constructor(private _cartService:ShapingCartService) { }
  ngOnInit(): void {
    this._cartService.getCartItems().subscribe({
      next:(result) => {
        this.cartItems = result.data;
        console.log(this.cartItems);

        },
      error:(err) => {  console.log(err ); this.apiErrorMassage = err.error.message}
    });

  }
  /*  updateCartItem(id:string,count:number){
    this._cartService.updateCartItem(id,count).subscribe({
      next:(result) => {
        console.log(result);
        this.cartItems = result.data;
      },
      error:(err) => {  console.log(err) }
    });
  }
  removeCartItem(id:string){
    this._cartService.removeCartItem(id).subscribe({
      next:(result) => {
        console.log(result);
        this.cartItems = result.data;
      },
      error:(err) => {  console.log(err) }
    });
  }
  deleteCart(){
    this._cartService.deleteCart().subscribe({
      next:(result) => {
        console.log(result);
        this.cartItems = null;
      },
      error:(err) => {  console.log(err) }
    });
  } */
}

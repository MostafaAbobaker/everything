import { Component } from '@angular/core';
import { ShapingCartService } from '../../services/shaping-cart.service';
import { IcartItem, PaymentOrder } from '../../interface/icart-item';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../../environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-shaping-cart',
  templateUrl: './shaping-cart.component.html',
  styleUrl: './shaping-cart.component.scss'
})
export class ShapingCartComponent {
  imagePath = environment.imagePath;
  cartItems: IcartItem[] = [];
  totalCartPrice: number = 0;
  apiErrorMassage: string = '';
  constructor(private _cartService: ShapingCartService,
    private _shapingCartService: ShapingCartService,
    private toastr: ToastrService,
    private _router: Router
  ) { }
  ngOnInit(): void {
    this.getCartItems();
  }
  getCartItems() {
    debugger
    this._cartService
      .GetItemsCartNotPurchased(localStorage.getItem('everything-userId') || '')
      .subscribe({
        next: (result) => {
          this.cartItems = result.data;
          this.totalCartPrice = this.cartItems.reduce(
            (sum, item) => sum + item.totalPrice,
            0
          );
        },
        error: (err) => {
          this.apiErrorMassage = err.error.message;
        },
      });
  }
  RemoveAllItemsFromCart() {
    this._cartService.RemoveAllItemsFromCart(localStorage.getItem('everything-userId') || '').subscribe({
      next: (result) => {
        if (result.succeeded) {
          this.toastr.success(result.message, '', {
            closeButton: true,
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'increasing',
          });
          this.getCartItems();
        }
        else {
          this.toastr.warning(result.message, '', {
            closeButton: true,
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'increasing',
          });
        }
      },
      error: (err) => {
        this.toastr.error(err.message, '', {
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
        if (result.succeeded) {
          this.toastr.success(result.message, '', {
            closeButton: true,
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'increasing',
          });
          this.getCartItems();
        }
        else {
          this.toastr.warning(result.message, '', {
            closeButton: true,
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'increasing',
          });
        }
      },
      error: (err) => {
        this.toastr.error(err.message, '', {
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
        if (result.succeeded) {
          this.toastr.success(result.message, '', {
            closeButton: true,
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'increasing',
          });
          this.getCartItems();
        }
        else {
          this.toastr.warning(result.message, '', {
            closeButton: true,
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'increasing',
          });
        }

      },
      error: (err) => {
        this.toastr.error(err.message, '', {
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
        if (result.succeeded) {
          this.toastr.success(result.message, '', {
            closeButton: true,
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'increasing',
          });
          this.getCartItems();
        }
        else {
          this.toastr.warning(result.message, '', {
            closeButton: true,
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'increasing',
          });
        }
      },
      error: (err) => {
        this.toastr.error(err.message, '', {
          closeButton: true,
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
      }
    });
  }

  pay() {
    debugger
    let _paymentOrder: PaymentOrder = {
      userId: localStorage.getItem('everything-userId') || '',
      orderPaymentMethod:1
    };

    this._cartService.CreateOrder(_paymentOrder).subscribe({
      next: (result) => {
        if (result.succeeded) {
          this.toastr.success(result.message, '', {
            closeButton: true,
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'increasing',
          });
          this.getCartItems();
          this._router.navigate(['/account/orders']);
        return;
        }
        else {
          this.toastr.warning(result.message, '', {
            closeButton: true,
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'increasing',
          });
        }
      },
      error: (err) => {
        this.toastr.error(err.message, '', {
          closeButton: true,
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'decreasing',
        });
      }
    });
  }
}

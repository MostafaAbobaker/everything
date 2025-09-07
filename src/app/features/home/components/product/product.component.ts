import { Component, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { IProduct, IProductItem } from '../../interface/iproduct';
import { environment } from '../../../../../environments/environment';
import { ShapingCartService } from '../../services/shaping-cart.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
   private platformId = inject(PLATFORM_ID);


  isLogin:boolean = false

  constructor(private _shapingCartService: ShapingCartService, private toastr: ToastrService ,private _router:Router) { }

  isInFavorite:boolean= false
  imagePath = environment.imagePath;


  @Input() product!: IProductItem
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {

      this.isLogin= localStorage.getItem('everything-token')? true : false
    }
  }
  addWish(id: string) {

  }
  compareItemWishlistInProduct(id: string) {
    return false
  }
  addToCart(product: IProductItem) {
    if (isPlatformBrowser(this.platformId)) {
    if(this.isLogin) {
    debugger
    if (!localStorage.getItem('everything-userId')) {
      this._router.navigate(['/auth/login']);
      return;
    }
    let cartItem = {
      "userId": localStorage.getItem('everything-userId') || '',
      "productId": product.id,
      "quantity": 1,
      "featuresId": 0
    };
    this._shapingCartService.AddToCart(cartItem).subscribe({
      next: (result) => {
        debugger
        if (result.succeeded) {
          this.toastr.success(result.message, 'Success', {
            closeButton: true,
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'increasing',
          });
        }
        else {
          this.toastr.warning(result.message, 'warning', {
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
  }else {
    this._router.navigate(['/login'])
  }
  }
  }
}

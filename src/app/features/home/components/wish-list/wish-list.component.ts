import { Component, inject, PLATFORM_ID } from '@angular/core';
import { IProduct, IProductItem } from '../../interface/iproduct';
import { WishListService } from '../../services/wish-list.service';
import { ShapingCartService } from '../../services/shaping-cart.service';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../../services/products.service';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent {
  WishListItems?: IProductItem[];
   private platformId = inject(PLATFORM_ID);
  imagePath = environment.imagePath;
  constructor(
    private _wishlistService: WishListService,
    private _cartService: ShapingCartService,
    private toastr: ToastrService,
    private _productsService:ProductsService
  ) {}

  ngOnInit(): void {
    this.showWishlist();
  }
  showWishlist(): void {

    this._productsService.getMostPopular().subscribe({
      next: (result) => {
        this.WishListItems = result.data;
      },
      error: (err) => {
      },
    });
    /* this._wishlistService.getWishlistItems().subscribe({
      next: (result) => {
        this.WishListItems = result.data;
      },
      error: (err) => {
      },
    }); */
  }

  addToCart(product: IProductItem) {
    if (!isPlatformBrowser(this.platformId)) {

      let cartItem = {
        "userId": localStorage.getItem('everything-userId') || '',
        "productId": product.id,
        "quantity": 1,
        "featuresId": 0
      };
      this._cartService.AddToCart(cartItem).subscribe({
        next: (result) => {
          this._cartService.CartItemNumber.next(result.numOfCartItems);
          this.toastr.success(result.message, 'Add Product', {
            closeButton: true,
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'increasing',
          });
        },
        error: (err) => {
        },
      });
    }

  }
  deleteItemWishList(id: string) {
    this._wishlistService.removeWishlistItem(id).subscribe({
      next: (res) => {
        this.showWishlist();
        this.toastr.info(res.message, 'Deleted', {
          closeButton: true,
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'increasing',
        });
        this._wishlistService.WishlistNumber.next(res.data.length);
        // this.WishListItems = data.data;
      },
      error: (err) => {
      },
    });
  }
}

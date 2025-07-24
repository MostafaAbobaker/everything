import { Component } from '@angular/core';
import { IProduct, IProductItem } from '../../interface/iproduct';
import { WishListService } from '../../services/wish-list.service';
import { ShapingCartService } from '../../services/shaping-cart.service';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent {
  WishListItems?: IProductItem[];
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
        console.log(err);
      },
    });
    /* this._wishlistService.getWishlistItems().subscribe({
      next: (result) => {
        this.WishListItems = result.data;
      },
      error: (err) => {
        console.log(err);
      },
    }); */
  }

  addToCart(product_id: string) {
    this._cartService.addCartItem(product_id).subscribe({
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
        console.log(err);
      },
    });
  }
  deleteItemWishList(id: string) {
    this._wishlistService.removeWishlistItem(id).subscribe({
      next: (res) => {
        console.log('Delete Item', res);
        this.showWishlist();
        console.log('+===+=>', res.data.length);
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
        console.log(err);
      },
    });
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { IProduct, IProductItem } from '../../interface/iproduct';
import { environment } from '../../../../../environments/environment';
import { ShapingCartService } from '../../services/shaping-cart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {

  constructor(private _shapingCartService: ShapingCartService, private toastr: ToastrService) { }
  
  isInFavorite:boolean= false
  imagePath = environment.imagePath;
  @Input() product!: IProductItem
  ngOnInit(): void {

  }
  addWish(id: string) {

  }
  compareItemWishlistInProduct(id: string) {
    return false
  }
  addToCart(product: IProductItem) {
    debugger
    let cartItem = {
      "userId": localStorage.getItem('everything-userId') || '',
      "productId": product.id,
      "quantity": 1,
      "featuresId": 0
    };
    this._shapingCartService.AddToCart(cartItem).subscribe({
      next: (result) => {
        debugger
          this.toastr.success(result.message, 'Product Added to Cart', {
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

}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { ShapingCartService } from '../../services/shaping-cart.service';
import { ToastrService } from 'ngx-toastr';
import { IProductDetails, ProductProperty } from '../../interface/iproduct-details';
import { IProductItem } from '../../interface/iproduct';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  productUrl:string |null  = null
  errorMassage!:string
  productDetails ?:IProductDetails
  inputQuantity: number = 1

  defaultValue!:ProductProperty

  constructor(
    private _activatedRoute:ActivatedRoute ,
    private _productsService: ProductsService,
    private _shapingCartService: ShapingCartService,
    private toastr: ToastrService,
    private _router: Router
  ) {
    this._activatedRoute.paramMap.subscribe(params => {
      this.productUrl = params.get('id')
    });
  }
  ngOnInit(): void {

    this.getProductDetails()

  }


getProductDetails() {
  if(this.productUrl != null) {

      this._productsService.getProductDetails(+this.productUrl).subscribe({
      // this._productsService.getProductDetails(267).subscribe({
        next:(result) => {
          this.productDetails = result.data


        },
        error:(err) => {
          this.errorMassage = err.message

        }
      })
    }
  }

  addToCart(product: IProductDetails|undefined) {
      debugger
      if (!localStorage.getItem('everything-userId')) {
        this._router.navigate(['/auth/login']);
        return;
      }
      let cartItem = {
        "userId": localStorage.getItem('everything-userId') || '',
        "productId": product?.id,
        "quantity": 1,
        "featuresId": 0
      };
      this._shapingCartService.AddToCart(cartItem).subscribe({
        next: (result) => {
          debugger
          if (result.succeeded) {
            this.toastr.success(result.message, '', {
              closeButton: true,
              timeOut: 3000,
              progressBar: true,
              progressAnimation: 'increasing',
            });
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


}

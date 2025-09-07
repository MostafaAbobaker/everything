import { Component, inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Route, Router} from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { ShapingCartService } from '../../services/shaping-cart.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../../environments/environment';
import { IProductDetails, ProductProperty } from '../../interface/iproduct-details';
import { IProductItem } from '../../interface/iproduct';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  productUrl:string |null  = null
  errorMassage!:string
  productDetails :IProductDetails = {} as IProductDetails
  inputQuantity: number = 1
  imagePath = environment.imagePath;
  defaultValue!:ProductProperty
   private platformId = inject(PLATFORM_ID);


  isLogin:boolean = false

  constructor(
    private _activatedRoute:ActivatedRoute ,
    private _productsService: ProductsService,
    private _shapingCartService: ShapingCartService,
    private toastr: ToastrService,
    private _router:Router
  ) {
    this._activatedRoute.paramMap.subscribe(params => {
      this.productUrl = params.get('id')
    });
  }
  ngOnInit(): void {

    this.getProductDetails()
    if(isPlatformBrowser(this.platformId)) {

      this.isLogin= localStorage.getItem('everything-token')? true : false
    }
  }


getProductDetails() {
  if(this.productUrl != null) {

      this._productsService.getProductDetails(+this.productUrl).subscribe({
      // this._productsService.getProductDetails(267).subscribe({
        next:(result) => {
          this.productDetails = result.data
          console.log(this.productDetails);


        },
        error:(err) => {
          this.errorMassage = err.message

        }
      })
    }
}




  addToCart(product: IProductDetails|undefined) {
      debugger
      if(isPlatformBrowser(this.platformId)) {
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
    changeOption(name:ProductProperty) {
      console.log(name);
      this.defaultValue = name
    }

}


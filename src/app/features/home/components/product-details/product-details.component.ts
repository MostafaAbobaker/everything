import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../interface/iproduct';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  productUrl:string |null  = null
  errorMassage!:string
  productDetails ?:IProduct
  inputQuantity: number = 1
  constructor(
    private _activatedRoute:ActivatedRoute ,
    private _productsService:ProductsService,
  ) {
    this._activatedRoute.paramMap.subscribe(params => {
      this.productUrl = params.get('id')
    });
  }
  ngOnInit(): void {

    if(this.productUrl != null) {
      console.log('Helloooooooo');

      this._productsService.getProductDetails(this.productUrl).subscribe({
        next:(result) => {
          this.productDetails = result.data

        },
        error:(err) => {
          this.errorMassage = err.error.message

        }
      })
    }

  }




}

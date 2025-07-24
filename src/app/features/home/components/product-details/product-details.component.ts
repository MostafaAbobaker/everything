import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { IProductDetails } from '../../interface/iproduct-details';

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
  constructor(
    private _activatedRoute:ActivatedRoute ,
    private _productsService:ProductsService,
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
      console.log('Helloooooooo', this.productUrl);

      this._productsService.getProductDetails(+this.productUrl).subscribe({
        next:(result) => {
          this.productDetails = result.data[0]
          console.log('Product Details:', this.productDetails);


        },
        error:(err) => {
          this.errorMassage = err.message

        }
      })
    }
}


}

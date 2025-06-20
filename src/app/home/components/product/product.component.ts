import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../interface/iproduct';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {

  imagePath = environment.imagePath;
  @Input() product!: IProduct
  ngOnInit(): void {

  }
  addWish(id: string) {

  }
  compareItemWishlistInProduct(id: string) {
    return false
  }
}

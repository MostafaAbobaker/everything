import { Component, Input } from '@angular/core';
import { IProduct } from '../../interface/iproduct';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() product!: IProduct

  addWish(id: string) {

  }
  compareItemWishlistInProduct(id: string) {
    return false
  }
}

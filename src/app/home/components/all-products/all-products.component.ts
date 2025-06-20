import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../interface/iproduct';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss'
})
export class AllProductsComponent implements OnInit{
  allProducts?:IProduct[]
constructor(private _productsService:ProductsService){}
  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    this._productsService.getBestSeller().subscribe({
      next:(res)=>{this.allProducts =res.data},
      error:(err)=>{alert(err)}
    })
  }
}

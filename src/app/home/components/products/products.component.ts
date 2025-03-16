import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../interface/iproduct';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  productsData :IProduct[] = []

   constructor(private _productsService:ProductsService) { }
  ngOnInit(): void {

    this.getProducts()
  }

  getProducts() {
    this._productsService.getProducts().subscribe({
      next: (data) => {
        this.productsData = data.data
        console.log(data);
        console.log(this.productsData);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  customOptions: OwlOptions = {
      rtl: true,
      loop: true,
      mouseDrag: false,
      touchDrag: false,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
      margin: 15,

      navText: ['<i class="fa-solid fa-angle-right"></i>', ' <i class="fa-solid fa-angle-left"></i>'],

      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 2
        },
        740: {
          items: 3
        },
        940: {
          items: 6
        }
      },
      nav: true
    }
    addWish(id: string) {

    }
    compareItemWishlistInProduct(id: string) {
      return false
    }
}

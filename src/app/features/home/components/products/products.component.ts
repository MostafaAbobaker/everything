import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from '../../services/products.service';
import {  IProductItem } from '../../interface/iproduct';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  NewProductsData :IProductItem[] = []
  MostPopularData :IProductItem[] = []
  BestSellerData :IProductItem[] = []
  FeaturedData :IProductItem[] = []
   constructor(private _productsService:ProductsService) { }
  ngOnInit(): void {
    this.getNewProducts()
    this.getMostPopular()
    this.getBestSeller()
    this.getFeatured()
  }

  getNewProducts() {

    this._productsService.getNewProducts(1,1000).subscribe({
      next: (data) => {

        this.NewProductsData = data.data;
        console.log('New Products Data:', this.NewProductsData);

      },
      error: (error) => {
        console.log(error);
      }
    })

  }
  getMostPopular() {
    this._productsService.getMostPopular().subscribe({
      next: (data) => {
        this.MostPopularData = data.data
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  getBestSeller() {
    this._productsService.getBestSeller().subscribe({
      next: (data) => {
        this.BestSellerData = data.data
        /* console.log(this.BestSellerData);
        console.log(data); */

      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  getFeatured() {
    this._productsService.getFeatured().subscribe({
      next: (data) => {
        this.FeaturedData = data
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

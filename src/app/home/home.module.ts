import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ShopingCartComponent } from './components/shoping-cart/shoping-cart.component';
import { ProductsFavoriteComponent } from './components/products-favorite/products-favorite.component';
import { SharedModule } from '../shared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    CategoriesComponent,
    CategoryComponent,
    ProductsComponent,
    ProductComponent,
    ProductDetailsComponent,
    ShopingCartComponent,
    ProductsFavoriteComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    CarouselModule,
    HttpClientModule
  ]
})
export class HomeModule { }

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
import { ShapingCartComponent } from './components/shaping-cart/shaping-cart.component';
import { ProductsFavoriteComponent } from './components/products-favorite/products-favorite.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { CategoriesPageComponent } from './components/categories-page/categories-page.component';
import { BrandsComponent } from './components/brands/brands.component';
import { SharedModule } from '../../shared/shared.module';
import { FilterComponent } from './components/filter/filter.component';


@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    CategoriesComponent,
    CategoryComponent,
    ProductsComponent,
    ProductComponent,
    ProductDetailsComponent,
    ShapingCartComponent,
    ProductsFavoriteComponent,
    AllProductsComponent,
    WishListComponent,
    CategoriesPageComponent,
    BrandsComponent,
    FilterComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    CarouselModule,
    HttpClientModule,
    FormsModule
  ]
})
export class HomeModule { }

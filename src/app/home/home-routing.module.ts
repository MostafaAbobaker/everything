import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { HomeComponent } from './components/home/home.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ShapingCartComponent } from './components/shaping-cart/shaping-cart.component';
import { authGuard } from '../auth/Guards/auth.guard';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { CategoriesPageComponent } from './components/categories-page/categories-page.component';
import { BrandsComponent } from './components/brands/brands.component';

const routes: Routes = [
  { path: '', component: LayoutComponent, children:[
    {path:'',redirectTo:'home', pathMatch:'full'},
    { path: 'home',component: HomeComponent},
    { path: 'allProducts',component: AllProductsComponent},
    { path: 'categories',component: CategoriesPageComponent},
    { path: 'brands',component: BrandsComponent},
    { path: 'product/:id', component:ProductDetailsComponent},
    { path: 'shaping-cart',canActivate:[authGuard], component:ShapingCartComponent},
    { path: 'wish-list',canActivate:[authGuard], component:WishListComponent},

  ] }, // Default route

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

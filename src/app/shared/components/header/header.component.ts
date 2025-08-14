import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { ProductSearchService } from '../../services/productSearch.service';
import { Router, RouterModule } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',

})
export class HeaderComponent {
  language:string = 'ar';
  // isLogin:boolean = localStorage.getItem('everything-token') ? true : false;
  isLogin:boolean = this._localStorageService.getItem('everything-token') ? true : false;
  searchInput:string=''
  constructor(private _localStorageService:LocalStorageService,
    private _productSearchService:ProductSearchService,
    private _router:Router
  ){}

  changeLanguage(lang :string):void {
    this.language = lang;
  }
  logout():void {
    // localStorage.removeItem('everything-token');
    this._localStorageService.removeItem('everything-token');
    this.isLogin = false;
    window.location.reload();
  }


  getProductSearch() {
    this._router.navigate(['/allProducts']);
   /* this._productSearchService.getProductsSearch(this.searchInput).subscribe({
n
   }) */
  }
}

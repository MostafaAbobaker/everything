import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { ProductSearchService } from '../../services/productSearch.service';
import { Router, RouterModule } from '@angular/router';
import { FormControl } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',

})
export class HeaderComponent implements OnInit {
   private platformId = inject(PLATFORM_ID);

  language:string = 'ar';
  // isLogin:boolean = localStorage.getItem('everything-token') ? true : false;
  isLogin:boolean = false
  searchInput:string=''
  constructor(private _localStorageService:LocalStorageService,
    private _productSearchService:ProductSearchService,
    private _router:Router
  ){}
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {

      this.isLogin = this._localStorageService.getItem('everything-token') ? true : false;
    }
  }

  changeLanguage(lang :string):void {
    this.language = lang;
  }
  logout():void {
    if (isPlatformBrowser(this.platformId)) {
      // localStorage.removeItem('everything-token');
      this._localStorageService.removeItem('everything-token');
      this.isLogin = false;
      window.location.reload();

    }
  }


  getProductSearch() {
    if(this.searchInput) {

      this._router.navigate(['/allProducts','search'+ this.searchInput]);
    }
   /* this._productSearchService.getProductsSearch(this.searchInput).subscribe({
n
   }) */
  }
}

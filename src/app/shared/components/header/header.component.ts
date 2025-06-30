import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  language:string = 'ar';
  // isLogin:boolean = localStorage.getItem('everything-token') ? true : false;
  isLogin:boolean = this._localStorageService.getItem('everything-token') ? true : false;
  constructor(private _localStorageService:LocalStorageService){}

  changeLanguage(lang :string):void {
    this.language = lang;
  }
  logout():void {
    // localStorage.removeItem('everything-token');
    this._localStorageService.removeItem('everything-token');
    this.isLogin = false;
    window.location.reload();
  }
}

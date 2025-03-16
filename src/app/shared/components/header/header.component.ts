import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  language:string = 'ar';
  isLogin:boolean = false;

  changeLanguage(lang :string):void {
    this.language = lang;
  }
}

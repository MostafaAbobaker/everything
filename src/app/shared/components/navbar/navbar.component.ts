import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { IMenu } from '../../interface/imenu';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isShowMenu: boolean = false;
  menuItems: IMenu[] = [];
  activeSubMenu: string | null = null;
  constructor(private _menuService:MenuService) {}
  ngOnInit(): void {
    this.getMenuItems();
  }


  getMenuItems() {

    this._menuService.getMenuItems().subscribe({
      next:(result) => {

        this.menuItems = result;
        console.log('Menu Items:', this.menuItems.length);
      },
      error:(err) => {
        alert('Error fetching menu items' + err);
      }
    })
  }
  getDetailsService(id:number , name :string) {
    this.activeSubMenu = this.activeSubMenu === name ? null : name;
  }
}

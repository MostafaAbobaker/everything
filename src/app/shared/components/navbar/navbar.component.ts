import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
 interface IMenu {
  key: number
  label: string
  parentId: number
  secondLevels: SecondLevel[]
}

 interface SecondLevel {
  key: number
  label: string
  parentId: any
  thirdLevels: ThreeLevel[]
}

 interface ThreeLevel {
  key: number
  label: string
  parentId: any
}
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

        this.menuItems = result.data;
        console.log('Menu Items:', this.menuItems);
      },
      error:(err) => {
        console.log(err);

        alert('Error fetching menu items' + err);
      }
    })
  }
  getDetailsService(id:number , name :string) {
    this.activeSubMenu = this.activeSubMenu === name ? null : name;
  }
}

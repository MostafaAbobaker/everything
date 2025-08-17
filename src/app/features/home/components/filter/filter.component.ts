import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { ICategory, ILastCategory } from '../../interface/icategory';
import { BrandsService } from '../../services/brands.service';
import { IBrand } from '../../interface/ibrand';
import { MenuService } from '../../../../shared/services/menu.service';
import { IMenu, SecondLevel, ThreeLevel } from '../../../../shared/interface/imenu';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit {
  @Output() brandSelect = new EventEmitter<number[]>()

  categoriesList:IMenu[]  = [];
  BrandsData:IBrand []=[]
  files!: IMenu[];
  selectedFile!: IMenu;
  rawCategories: IMenu[] = []; // افترض إن عندك قائمة من IMenu هنا
  brandList:number[] = []
  constructor(
    private _categoriesService:MenuService,
    private _brandsService:BrandsService
  ) { }
  ngOnInit(): void {
        this.getCategories();
        this.getBrands();

        // افترض إن عندك قائمة من IMenu اسمها rawCategories


  }

  getCategories() {
    this._categoriesService.getMenuItems().subscribe({
      next: (data) => {
        this.categoriesList = data ;
        console.log();


      },
      error: (error) => {
        alert(error);
      }
    });
  }
  getBrands() {
    this._brandsService.getBrands().subscribe({
      next:(res)=>{
        this.BrandsData = res.data
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }


  /* Prime ng */

 convertToTreeNodes(categories: IMenu[]): TreeNode[] {
  return categories.map((menu: IMenu) => ({
    label: menu.name,
    key: menu.id.toString(),
    children: menu.secondLevels?.map((second: SecondLevel) => ({
      label: second.name,
      key: second.id.toString(),
      children: second.threeLevels?.map((third: ThreeLevel) => ({
        label: third.name,
        key: third.id.toString(),
        leaf: true
      })) || [],
    })) || [],
  }));
}


brandItemSelect() {
  this.brandSelect.emit(this.brandList)
}

}

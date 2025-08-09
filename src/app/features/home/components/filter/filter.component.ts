import { Component, OnInit } from '@angular/core';
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
  categoriesList:IMenu[]  = [];
  BrandsData:IBrand []=[]
  files!: IMenu[];
  selectedFile!: IMenu;
  rawCategories: IMenu[] = []; // افترض إن عندك قائمة من IMenu هنا
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
    this._categoriesService.getFilterMenu().subscribe({
      next: (data) => {
        this.categoriesList = data.data ;
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
    /* label: menu.name, // أو menu.nameAr لو عايز عربي
    data: menu,
    children: menu.secondLevels?.map((second: SecondLevel) => ({
      label: second.name,
      data: second,
      children: second.threeLevels?.map((third: ThreeLevel) => ({
        label: third.name,
        data: third,
        leaf: true
      })) || [],
    })) || [], */
  }))

  ;
}

  /* nodeExpand(event: any) {
        this.messageService.add({ severity: 'success', summary: 'Node Expanded', detail: event.node.label });
    }

    nodeCollapse(event: any) {
        this.messageService.add({ severity: 'warn', summary: 'Node Collapsed', detail: event.node.label });
    }

    nodeSelect(event: any) {
        this.messageService.add({ severity: 'info', summary: 'Node Selected', detail: event.node.label });
    }

    nodeUnselect(event: any) {
        this.messageService.add({ severity: 'info', summary: 'Node Unselected', detail: event.node.label });
    } */
  /* Prime ng */
}

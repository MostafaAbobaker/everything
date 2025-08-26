import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { ICategory, ILastCategory } from '../../interface/icategory';
import { BrandsService } from '../../services/brands.service';
import { IBrand } from '../../interface/ibrand';
import { MenuService } from '../../../../shared/services/menu.service';
import { TreeNode } from 'primeng/api';
import { IMenu } from '../../../../shared/interface/imenu';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit {
  @Output() brandSelect = new EventEmitter<number[]>()
  @Output() categorySelect = new EventEmitter<number>()

  IsSubMenuShow:string | null = null; // Tracks the active submenu
  isCollapsed: boolean = false; // Tracks the sidebar state
  activeParentId: number | null = null;
  activeSecondId: number | null = null;


  // categoriesList:TreeNode[]  = [];
  categoriesList:IMenu[]  = [];
  BrandsData:IBrand []=[]
  files!: IMenu[];
  selectedFile!: IMenu ;
  rawCategories: IMenu[] = []; // افترض إن عندك قائمة من IMenu هنا
  brandList:number[] = [];
  categoryList!:number ;

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
        /* this.categoriesList = this.convertToTreeNodes(data) ; */

        this.categoriesList = data.data ;


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
      }
    })
  }


  /* Prime ng */

/*  convertToTreeNodes(categories: IMenu[]): TreeNode[] {
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
} */


brandItemSelect() {
  this.brandSelect.emit(this.brandList)

}
categoryItemSelect(id:number) {
  this.categorySelect.emit(this.categoryList = id)

}



getMenuShow(name: string, id: number, level: 'parent' | 'second' | 'third'): void {
  if (level === 'parent') {
    this.activeParentId = this.activeParentId === id ? null : id;
    this.activeSecondId = null; // Reset second level
  } else if (level === 'second') {
    this.activeSecondId = this.activeSecondId === id ? null : id;
  } else if (level === 'third') {
    console.log('Clicked third level:', name, id);
    // ممكن تضيف منطق إضافي هنا
  }
}

}

import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { ICategory, ILastCategory } from '../../interface/icategory';
import { BrandsService } from '../../services/brands.service';
import { IBrand } from '../../interface/ibrand';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit {
  categoriesList:ILastCategory[] = [];
  BrandsData:IBrand []=[]
  constructor(private _categoriesService:CategoriesService,
    private _brandsService:BrandsService
  ) { }
  ngOnInit(): void {
        this.getCategories();
        this.getBrands();
  }

  getCategories() {
    this._categoriesService.getCategories().subscribe({
      next: (data) => {
        this.categoriesList = data.data;
        console.log(data);


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
}

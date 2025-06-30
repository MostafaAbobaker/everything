import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { ICategory, ILastCategory } from '../../interface/icategory';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit {
  categoriesList:ILastCategory[] = [];
  constructor(private _categoriesService:CategoriesService) { }
  ngOnInit(): void {
        this.getCategories();
  }

  getCategories() {
    this._categoriesService.getLastCategories().subscribe({
      next: (data) => {
        this.categoriesList = data;

      },
      error: (error) => {
        alert(error);
      }
    });
  }
}

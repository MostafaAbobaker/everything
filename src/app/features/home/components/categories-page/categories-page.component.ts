import { Component } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../interface/category';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.scss'
})
export class CategoriesPageComponent {
 CategoriesData:Category []=[]
  constructor(private _categoriesService:CategoriesService){}
  ngOnInit(): void {
    this.getCategories()
  }
  getCategories() {
    this._categoriesService.getCategories(1,1000).subscribe({
      next: (data) => {
        this.CategoriesData = data.data;

      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}

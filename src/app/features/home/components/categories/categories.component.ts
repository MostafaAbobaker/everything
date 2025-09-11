import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../interface/category';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  imagePath= environment.imagePath;
  CategoriesData:Category []=[]
  constructor(private _categoriesService:CategoriesService){}
  ngOnInit(): void {
    this.getCategories()
  }
  getCategories() {
    this._categoriesService.getCategories(0).subscribe({
      next: (data) => {
        this.CategoriesData = data.data;

      },
      error: (error) => {
        console.error(error);
      }
    });
  }


  customOptions: OwlOptions = {
    rtl: true,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    margin: 15,

    navText: ['<i class="fa-solid fa-angle-right"></i>', ' <i class="fa-solid fa-angle-left"></i>'],

    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }
}

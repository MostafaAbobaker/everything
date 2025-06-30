import { Component, Input } from '@angular/core';
import { Category } from '../../interface/category';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
    imagePath= environment.imagePath;

@Input() category!: Category;
}

import { Component } from '@angular/core';
import { BrandsService } from '../../services/brands.service';
import { IBrand } from '../../interface/ibrand';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  imagePath= environment.imagePath;

  BrandsData:IBrand []=[]
  constructor(private _brandsService:BrandsService){}
  ngOnInit(): void {
    this.getBrands()
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
}

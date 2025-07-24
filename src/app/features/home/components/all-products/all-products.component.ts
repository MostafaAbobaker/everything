import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProduct, IProductItem } from '../../interface/iproduct';

interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss'
})
export class AllProductsComponent implements OnInit{
  allProducts:IProductItem[] = [];
  originalProductList: IProductItem[] = [];
  stateSorting: string = 'الأكثر رواجاً'; // Default sorting state

page : number = 1
first: number = 0;

rows: number = 10;
totalRecords: number = 0;



constructor(private _productsService:ProductsService){}
  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {

    this._productsService.getNewProducts(this.first,this.rows ).subscribe({
      next:(res)=>{
        this.allProducts =res.data
        this.originalProductList = [...this.allProducts]; // Store the original list for sorting
      console.log(res);
        this.page= res.pageSize;
        this.totalRecords =  res.totalCount;
      /*

        first :    0
        page      :        0
        pageCount     :        1
        rows     :         20
      */

      },
      error:(err)=>{console.log(err);
      }
    })
  }


  sortProducts(type: string) {
    if (type === 'highLow') {
      this.allProducts.sort((a, b) => b.price - a.price);
      this.stateSorting = 'الأعلى إلى الأقل';
    } else if (type === 'lowHigh') {
      this.allProducts.sort((a, b) => a.price - b.price);
      this.stateSorting = 'الأقل إلى الأعلى';
    } else {
      // Implement recommended or default sorting if needed
      // Reset to original order
      this.allProducts = [...this.originalProductList];
      this.stateSorting = 'الأكثر رواجاً';
    }
  }

onPageChange(event: any) {
  console.log('Page changed:', event);
    this.page = event.page ; // Adjusting for 0-based index
    this.first = event.first;
    this.rows = event.rows;

    this.getAllProducts()
}
}

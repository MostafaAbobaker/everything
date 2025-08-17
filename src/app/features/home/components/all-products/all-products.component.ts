import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProduct, IProductItem } from '../../interface/iproduct';
import { PaginatorState } from 'primeng/paginator';
import { log } from 'console';
import { BrandsService } from '../../services/brands.service';
import { ActivatedRoute } from '@angular/router';

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


productUrl:string |null = '' ;

constructor(private _productsService:ProductsService , private _brandsService:BrandsService,
  private _activatedRoute:ActivatedRoute
){
}
  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params => {
      this.productUrl = params.get('id')
    });

    this.getAllProducts();
  }



  getAllProducts() {
    if(this.productUrl?.includes('id')) {
      let id = this.productUrl.replace('id','')
      this._productsService.getProductsByCategory(+id,this.page, this.rows ).subscribe({
        next:(res)=>{
          this.allProducts =res.data
          this.originalProductList = [...this.allProducts]; // Store the original list for sorting
          console.log(res);
          this.totalRecords =  res.totalCount;


        },
        error:(err)=>{console.log(err);
        }
      })

    } else if(this.productUrl?.includes('search')){
      let name = this.productUrl.replace('search', '');
      this._productsService.getProductsByName(name,this.page, this.rows ).subscribe({
        next:(res)=>{
          this.allProducts =res.data
          this.originalProductList = [...this.allProducts]; // Store the original list for sorting
          console.log(res);
          this.totalRecords =  res.totalCount;


        },
        error:(err)=>{console.log(err);
        }
      })
    }

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





    onPageChange(event: PaginatorState) {
      console.log(event);
        this.page = (event.page?? 0) + 1 ;
        this.first = event.first ?? 0;
        this.rows = event.rows ?? 10;
        this.getAllProducts()
    }

    getSelectBrand(event:number[]){
      console.log(event);

      if(event.length> 0) {
        this._brandsService.getBrandsFilter(event).subscribe({
          next:(res) => {
            console.log(res);
            this.allProducts = res.data;
            this.totalRecords =  res.totalCount;
          },
          error:(err) => {
            console.log(err);

          }

        })

      } else {
        this.getAllProducts()
      }
    }


}

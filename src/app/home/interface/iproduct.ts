import { IBrand } from "./ibrand";
import { ICategory } from "./icategory";
import { ISubcategory } from "./isubcategory";

export interface IProduct {
  _id: string,
  title: string,
  description: string,
  quantity: number,
  price: number,
  imageCover: string,
  category :ICategory,
  brand:IBrand,
  subcategory:ISubcategory,
  images:string[],
  ratingsAverage: number,
  ratingsQuantity: number,

}


export interface IProduct {
  id: number,
  name: string,
  nameAr: string,
  review: string,
  isStook: boolean,
  price: number,
  oldPrice: number,
  image: string,
  productImageForWeb: string,
  isRefundable: boolean,
  shippingEnabled: boolean,
  isInFavourite: boolean,
  isInQuotation: boolean,
  isInCart: boolean,


}

export interface IProductItem {
  id: number
  productName: string
  categoryId: number
  brandId: number
  categoryName: string
  price: number
  oldPrice: number
  image: string
  isStook: boolean
  rating: number
}

/* export interface IProductDetails {
  description: string
  brandId: number
  brandName: string
  isRefundable: boolean
  images: string[]
  id: number
  productName: string
  categoryId: number
  categoryName: string
  price: number
  oldPrice: number
  image: string
  isStook: boolean
  rating: number
} */


export interface IProductDetails {
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
  description: string
  brandName: string
  isRefundable: boolean
  images: any[]
  productProperties: ProductProperty[]
}

export interface ProductProperty {
  quantity: number
  unitPrice: number
  totalPrice: number
  valueName: string
}

import { IProductItem } from "./iproduct"

export interface IResponse {
  data: IProductItem[]
  pageNumber: number
  pageSize: number
  totalCount: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

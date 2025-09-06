export interface IcartItem {
  cartId: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  productId: string;
  productName: string;
  userId: string;
  featuresId: number;
  addedDate: string;
  productImage: string;
  productsId: string;
}

export interface PaymentOrder {
  orderPaymentMethod: number;
  userId: string;
}

export interface Order {
  orderDate: string;
  orderId: number;
  orderItems: IcartItem[];
  totalPrice: number;
  orderStatus: number;
}

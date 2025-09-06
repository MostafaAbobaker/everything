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
}

export interface PaymentOrder {
  orderPaymentMethod: number;
  userId: string;
}

export interface Order {
  orderDate: string;
  orderId: number;
  orderItems: OrderItem[];
  totalPrice: number;
  orderStatus: number;
}

export interface OrderItem {
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  itemName:string;
}
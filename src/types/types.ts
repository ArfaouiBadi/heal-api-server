export interface PaymentRequestBody {
  products: Product[];
}

export interface Product {
  id: string;
  productName: string;
  price: number;
  quantity: number;
  qty: number;
}


export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  processor: string;
  ram: string;
  storage: string;
  display: string;
  condition: string;
  in_stock: boolean;
  date_added: string;
  created_at: string;
  updated_at: string;
}

export interface CartItem extends Product {
  quantity: number;
}

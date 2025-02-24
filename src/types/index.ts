export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  images?: string[];
  features?: string[];
  quantity?: number;
}

export interface CartItem extends Product {
  quantity: number;
}
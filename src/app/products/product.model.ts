export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  status: 'Active' | 'Inactive';
  createdDate: Date;
} 
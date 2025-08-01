import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private storageKey = 'products';
  private products: Product[] = [
    { id: 1, name: 'Laptop', description: 'High performance laptop', price: 1200, category: 'Electronics', status: 'Active', imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80', createdDate: new Date() },
    { id: 2, name: 'Smartphone', description: 'Latest model smartphone', price: 800, category: 'Electronics', status: 'Active', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80', createdDate: new Date() },
    { id: 3, name: 'Wireless Headphones', description: 'Noise cancelling headphones', price: 200, category: 'Accessories', status: 'Active', imageUrl: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80', createdDate: new Date() },
    { id: 4, name: 'Smartwatch', description: 'Fitness tracking smartwatch', price: 250, category: 'Wearables', status: 'Active', imageUrl: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=80', createdDate: new Date() },
    { id: 5, name: 'Bluetooth Speaker', description: 'Portable speaker with deep bass', price: 150, category: 'Audio', status: 'Active', imageUrl: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80', createdDate: new Date() },
    { id: 6, name: 'Tablet', description: '10-inch HD tablet', price: 400, category: 'Electronics', status: 'Active', imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80', createdDate: new Date() },
    { id: 7, name: 'Gaming Mouse', description: 'Ergonomic gaming mouse', price: 60, category: 'Accessories', status: 'Active', imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80', createdDate: new Date() },
    { id: 8, name: 'Mechanical Keyboard', description: 'RGB mechanical keyboard', price: 120, category: 'Accessories', status: 'Active', imageUrl: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80', createdDate: new Date() },
    { id: 9, name: 'External SSD', description: '1TB portable SSD', price: 180, category: 'Storage', status: 'Active', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80', createdDate: new Date() },
    { id: 10, name: 'Monitor', description: '27-inch 4K monitor', price: 350, category: 'Electronics', status: 'Active', imageUrl: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=80', createdDate: new Date() }
  ];

  constructor() {
    // Initialize with sample products if not present
    const storedProducts = localStorage.getItem(this.storageKey);
    if (!storedProducts || JSON.parse(storedProducts).length === 0) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.products));
      console.log('Initialized products in localStorage:', this.products.length);
    }
  }

  getProducts(): Product[] {
    const products = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    console.log('Retrieved products from localStorage:', products.length);
    return products;
  }

  getProductById(id: number): Product | undefined {
    return this.getProducts().find(p => p.id === id);
  }

  addProduct(product: Product): void {
    const products = this.getProducts();
    product.id = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    product.createdDate = new Date();
    products.push(product);
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  updateProduct(product: Product): void {
    const products = this.getProducts();
    const idx = products.findIndex(p => p.id === product.id);
    if (idx > -1) {
      products[idx] = { ...product };
      localStorage.setItem(this.storageKey, JSON.stringify(products));
    }
  }

  deleteProduct(id: number): void {
    let products = this.getProducts();
    products = products.filter(p => p.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }

  searchProducts(term: string): Product[] {
    const lower = term.toLowerCase();
    return this.getProducts().filter(p =>
      p.name.toLowerCase().includes(lower) ||
      p.description.toLowerCase().includes(lower) ||
      p.category.toLowerCase().includes(lower)
    );
  }

  resetToDefaultProducts(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.products));
    console.log('Reset to default products:', this.products.length);
  }
} 
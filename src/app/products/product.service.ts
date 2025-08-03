import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { ApiService } from '../core/api.service';
import { API_CONFIG } from '../core/api.config';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private apiService: ApiService) {}

  getProducts(): Observable<Product[]> {
    return this.apiService.get<Product[]>(API_CONFIG.EXTERNAL_APIS.PRODUCTS.LIST);
  }

  getProductById(id: number): Observable<Product> {
    return this.apiService.get<Product>(API_CONFIG.EXTERNAL_APIS.PRODUCTS.GET(id.toString()));
  }

  addProduct(product: Omit<Product, 'id'>): Observable<Product> {
    return this.apiService.post<Product>(API_CONFIG.EXTERNAL_APIS.PRODUCTS.CREATE, product);
  }

  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.apiService.put<Product>(API_CONFIG.EXTERNAL_APIS.PRODUCTS.UPDATE(id.toString()), product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.apiService.delete<any>(API_CONFIG.EXTERNAL_APIS.PRODUCTS.DELETE(id.toString()));
  }

  searchProducts(term: string): Observable<Product[]> {
    return this.apiService.get<Product[]>(`${API_CONFIG.EXTERNAL_APIS.PRODUCTS.LIST}?search=${term}`);
  }
} 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from './order.model';
import { ApiService } from '../core/api.service';
import { API_CONFIG } from '../core/api.config';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private apiService: ApiService) {}

  getOrders(): Observable<Order[]> {
    return this.apiService.get<Order[]>(API_CONFIG.EXTERNAL_APIS.ORDERS.LIST);
  }

  getOrderById(id: number): Observable<Order> {
    return this.apiService.get<Order>(API_CONFIG.EXTERNAL_APIS.ORDERS.GET(id.toString()));
  }

  addOrder(order: Omit<Order, 'id'>): Observable<Order> {
    return this.apiService.post<Order>(API_CONFIG.EXTERNAL_APIS.ORDERS.CREATE, order);
  }

  updateOrder(id: number, order: Partial<Order>): Observable<Order> {
    return this.apiService.put<Order>(API_CONFIG.EXTERNAL_APIS.ORDERS.UPDATE(id.toString()), order);
  }

  deleteOrder(id: number): Observable<any> {
    return this.apiService.delete<any>(API_CONFIG.EXTERNAL_APIS.ORDERS.DELETE(id.toString()));
  }

  searchOrders(term: string): Observable<Order[]> {
    return this.apiService.get<Order[]>(`${API_CONFIG.EXTERNAL_APIS.ORDERS.LIST}?search=${term}`);
  }

  getOrderHistory(): Observable<Order[]> {
    return this.apiService.get<Order[]>(API_CONFIG.EXTERNAL_APIS.ORDERS.HISTORY);
  }
} 
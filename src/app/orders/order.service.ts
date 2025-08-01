import { Injectable } from '@angular/core';
import { Order } from './order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private storageKey = 'orders';

  constructor() {
    // Initialize with sample orders if not present
    if (!localStorage.getItem(this.storageKey)) {
      const defaultOrders: Order[] = [
        {
          id: 1,
          customerName: 'John Doe',
          customerPhone: '1234567890',
          customerAddress: '123 Main St',
          productId: 1,
          productName: 'Laptop',
          assignedEngineerId: 2,
          assignedEngineerName: 'Engineer',
          status: 'Pending',
          priority: 'High',
          description: 'Setup and install',
          createdDate: new Date(),
          updatedDate: new Date()
        }
      ];
      localStorage.setItem(this.storageKey, JSON.stringify(defaultOrders));
    }
  }

  getOrders(): Order[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  getOrderById(id: number): Order | undefined {
    return this.getOrders().find(o => o.id === id);
  }

  addOrder(order: Order): void {
    const orders = this.getOrders();
    order.id = orders.length ? Math.max(...orders.map(o => o.id)) + 1 : 1;
    order.createdDate = new Date();
    order.updatedDate = new Date();
    orders.push(order);
    localStorage.setItem(this.storageKey, JSON.stringify(orders));
  }

  updateOrder(order: Order): void {
    const orders = this.getOrders();
    const idx = orders.findIndex(o => o.id === order.id);
    if (idx > -1) {
      order.updatedDate = new Date();
      orders[idx] = { ...order };
      localStorage.setItem(this.storageKey, JSON.stringify(orders));
    }
  }

  deleteOrder(id: number): void {
    let orders = this.getOrders();
    orders = orders.filter(o => o.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(orders));
  }

  searchOrders(term: string): Order[] {
    const lower = term.toLowerCase();
    return this.getOrders().filter(o =>
      o.customerName.toLowerCase().includes(lower) ||
      o.productName.toLowerCase().includes(lower) ||
      o.assignedEngineerName.toLowerCase().includes(lower) ||
      o.status.toLowerCase().includes(lower) ||
      o.priority.toLowerCase().includes(lower)
    );
  }
} 
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent {
  orders: any[] = [];
  user: any = null;

  constructor() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.orders = JSON.parse(localStorage.getItem('userOrders') || '[]');
  }

  getOrderTotal(order: any): number {
    return order.items.reduce((sum: number, it: any) => sum + it.product.price * it.quantity, 0);
  }

  getTotalSpent(): number {
    return this.orders.reduce((sum: number, order: any) => sum + this.getOrderTotal(order), 0);
  }

  isLastItemOfLatestOrder(order: any, itemIdx: number): boolean {
    return this.orders.length > 0 && this.orders[0] === order && itemIdx === order.items.length - 1;
  }
} 
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import { Order } from '../order.model';
import { FormsModule } from '@angular/forms';
import { DatePipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [DatePipe],
  templateUrl: './order-list.html',
  styleUrl: './order-list.css'
})
export class OrderList {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  searchTerm = '';
  isSuperAdmin = false;
  currentEngineerId: number | null = null;

  constructor(private orderService: OrderService, private router: Router) {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      this.isSuperAdmin = user.role === 'Super Admin';
      if (user.role === 'Service Engineer') {
        this.currentEngineerId = user.id;
      }
    }
    this.loadOrders();
  }

  loadOrders() {
    this.orders = this.orderService.getOrders();
    this.applyRoleFilter();
  }

  applyRoleFilter() {
    if (this.isSuperAdmin) {
      this.filteredOrders = this.orders;
    } else if (this.currentEngineerId !== null) {
      this.filteredOrders = this.orders.filter(o => o.assignedEngineerId === this.currentEngineerId);
    } else {
      this.filteredOrders = [];
    }
  }

  onSearch() {
    let base = this.isSuperAdmin ? this.orders : this.filteredOrders;
    if (this.searchTerm.trim()) {
      this.filteredOrders = base.filter(o =>
        o.customerName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        o.productName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        o.assignedEngineerName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        o.status.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        o.priority.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.applyRoleFilter();
    }
  }

  addOrder() {
    this.router.navigate(['/orders/new']);
  }

  editOrder(id: number) {
    this.router.navigate(['/orders', id, 'edit']);
  }

  deleteOrder(id: number) {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(id);
      this.loadOrders();
      this.onSearch();
    }
  }

  updateStatus(order: Order) {
    this.orderService.updateOrder(order);
    this.loadOrders();
  }
}

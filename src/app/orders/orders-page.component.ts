import { Component } from '@angular/core';
import { OrderList } from './order-list/order-list';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [OrderList, RouterOutlet],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.css'
})
export class OrdersPageComponent {} 
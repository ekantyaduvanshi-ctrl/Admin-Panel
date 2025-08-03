import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';
import { Order } from '../order.model';
import { ProductService } from '../../products/product.service';
import { UserService } from '../../users/user.service';
import { Product } from '../../products/product.model';
import { User } from '../../users/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './order-form.html',
  styleUrl: './order-form.css'
})
export class OrderForm implements OnInit {
  orderForm!: FormGroup;
  isEdit = false;
  orderId: number | null = null;
  products: Product[] = [];
  engineers: User[] = [];

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private productService: ProductService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });

    this.userService.getUsers().subscribe(users => {
      this.engineers = users.filter((u: any) => u.role === 'Service Engineer' && u.status === 'Active');
      this.orderForm = this.fb.group({
        customerName: ['', Validators.required],
        customerPhone: ['', Validators.required],
        customerAddress: ['', Validators.required],
        productId: ['', Validators.required],
        assignedEngineerId: ['', Validators.required],
        priority: ['Medium', Validators.required],
        description: ['', Validators.required],
        status: ['Pending']
      });
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.orderId = +params['id'];
        this.orderService.getOrderById(this.orderId).subscribe(order => {
          if (order) {
            this.orderForm.patchValue({
              customerName: order.customerName,
              customerPhone: order.customerPhone,
              customerAddress: order.customerAddress,
              productId: order.productId,
              assignedEngineerId: order.assignedEngineerId,
              priority: order.priority,
              description: order.description,
              status: order.status
            });
          }
        });
      }
    });
  }

  onSubmit() {
    if (this.orderForm.invalid) return;
    const formValue = this.orderForm.value;
    const product = this.products.find(p => p.id === +formValue.productId);
    const engineer = this.engineers.find(e => e.id === +formValue.assignedEngineerId);
    
    if (this.isEdit && this.orderId !== null && product && engineer) {
      const orderData = {
        customerName: formValue.customerName,
        customerPhone: formValue.customerPhone,
        customerAddress: formValue.customerAddress,
        productId: product.id,
        productName: product.name,
        assignedEngineerId: engineer.id,
        assignedEngineerName: engineer.name,
        priority: formValue.priority,
        description: formValue.description,
        status: formValue.status
      };
      this.orderService.updateOrder(this.orderId, orderData).subscribe(() => {
        this.router.navigate(['/orders']);
      });
    } else if (product && engineer) {
      const newOrder = {
        customerName: formValue.customerName,
        customerPhone: formValue.customerPhone,
        customerAddress: formValue.customerAddress,
        productId: product.id,
        productName: product.name,
        assignedEngineerId: engineer.id,
        assignedEngineerName: engineer.name,
        status: 'Pending' as const,
        priority: formValue.priority as 'Low' | 'Medium' | 'High',
        description: formValue.description,
        createdDate: new Date(),
        updatedDate: new Date()
      };
      this.orderService.addOrder(newOrder).subscribe(() => {
        this.router.navigate(['/orders']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/orders']);
  }
}

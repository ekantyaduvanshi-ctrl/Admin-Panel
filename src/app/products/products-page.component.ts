import { Component } from '@angular/core';
import { Product } from './product.model';
import { ProductService } from './product.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css'
})
export class ProductsPageComponent {
  products: Product[] = [];
  cart: { [productId: number]: { product: Product, quantity: number } } = {};
  showAddressModal = false;
  billingAddress = '';
  deliveryAddress = '';
  newProduct = { name: '', price: 0, category: '', imageUrl: '', status: 'Active' as 'Active', description: '' };
  showAddProductForm = false;

  constructor(private productService: ProductService, private router: Router) {
    this.products = this.productService.getProducts();
  }

  addNewProduct() {
    const newId = this.products.length ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
    const product: Product = {
      id: newId,
      name: this.newProduct.name,
      price: +this.newProduct.price,
      category: this.newProduct.category,
      imageUrl: this.newProduct.imageUrl,
      status: this.newProduct.status,
      description: this.newProduct.description,
      createdDate: new Date()
    };
    this.products.unshift(product);
    // Update localStorage
    localStorage.setItem('products', JSON.stringify(this.products));
    // Reset form
    this.newProduct = { name: '', price: 0, category: '', imageUrl: '', status: 'Active' as 'Active', description: '' };
  }

  toggleAddProductForm() {
    this.showAddProductForm = !this.showAddProductForm;
  }

  addToCart(product: Product) {
    if (!this.cart[product.id]) {
      this.cart[product.id] = { product, quantity: 1 };
    } else {
      this.cart[product.id].quantity++;
    }
  }

  removeFromCart(product: Product) {
    if (this.cart[product.id]) {
      this.cart[product.id].quantity--;
      if (this.cart[product.id].quantity <= 0) {
        delete this.cart[product.id];
      }
    }
  }

  get cartItems() {
    return Object.values(this.cart);
  }

  getCartTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  proceedToCheckout() {
    this.showAddressModal = true;
  }

  submitAddress() {
    // Generate a new order and redirect to order details page
    const orderId = 'ORD' + Date.now();
    const order = {
      id: orderId,
      items: this.cartItems,
      billingAddress: this.billingAddress,
      deliveryAddress: this.deliveryAddress,
      createdDate: new Date(),
      status: 'Pending'
    };
    // Store order in localStorage (order history)
    const userOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    userOrders.unshift(order);
    localStorage.setItem('userOrders', JSON.stringify(userOrders));
    this.showAddressModal = false;
    this.cart = {};
    this.billingAddress = '';
    this.deliveryAddress = '';
    this.router.navigate(['/order-details', orderId]);
  }

  closeModal() {
    this.showAddressModal = false;
  }
} 
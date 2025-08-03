import { Component, OnInit } from '@angular/core';
import { UserService } from './users/user.service';
import { ProductService } from './products/product.service';
import { OrderService } from './orders/order.service';
import { Router, RouterModule } from '@angular/router';
import { DatePipe, CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  providers: [DatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  isSuperAdmin = false;
  user: any = null;
  sidebarOpen = true;
  stats = {
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    myOrders: 0,
    completedOrders: 0
  };
  recentOrders: any[] = [];
  currentEngineerId: number | null = null;
  selectedSection = 'dashboard';
  searchTerm = '';
  filteredOrders: any[] = [];

  // Products section
  showAddProductForm = false;
  newProduct = { name: '', price: 0, category: '', imageUrl: '', status: 'Active', description: '' };
  products: any[] = [];
  cart: { [key: string]: { product: any, quantity: number } } = {};
  cartItems: any[] = [];
  showAddressModal = false;
  billingAddress = '';
  deliveryAddress = '';

  // Users section
  searchUserTerm = '';
  filteredUsers: any[] = [];

  // Settings section
  profileForm: FormGroup;

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router,
    private fb: FormBuilder
  ) {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      this.user = JSON.parse(userStr);
      this.isSuperAdmin = this.user.role === 'Super Admin';
      if (this.user.role === 'Service Engineer') {
        this.currentEngineerId = this.user.id;
      }
    }
    this.profileForm = this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
      address: [''],
      profileImage: ['']
    });
  }

  ngOnInit() {
    this.selectedSection = 'dashboard';
    this.loadProducts();
    this.loadStats();
    this.onSearch();
    this.userService.getUsers().subscribe(users => {
      this.filteredUsers = users;
    });
  }

  loadProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      console.log('Loaded products:', this.products.length);
    });
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  loadStats() {
    this.userService.getUsers().subscribe(users => {
      this.stats.totalUsers = users.length;
    });
    
    this.productService.getProducts().subscribe(products => {
      this.stats.totalProducts = products.length;
    });
    
    this.orderService.getOrders().subscribe(orders => {
      this.stats.totalOrders = orders.length;
      this.stats.pendingOrders = orders.filter((o: any) => o.status === 'Pending').length;
      if (!this.isSuperAdmin && this.currentEngineerId !== null) {
        this.stats.myOrders = orders.filter((o: any) => o.assignedEngineerId === this.currentEngineerId).length;
        this.stats.completedOrders = orders.filter((o: any) => o.assignedEngineerId === this.currentEngineerId && o.status === 'Completed').length;
      }
    });
  }

  loadRecentOrders() {
    this.orderService.getOrders().subscribe(orders => {
      let filtered = orders;
      if (!this.isSuperAdmin && this.currentEngineerId !== null) {
        filtered = orders.filter((o: any) => o.assignedEngineerId === this.currentEngineerId);
      }
      this.recentOrders = filtered.sort((a: any, b: any) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()).slice(0, 5);
    });
  }

  addUser() {
    this.router.navigate(['/users/new']);
  }

  addProduct() {
    this.router.navigate(['/products/new']);
  }

  addOrder() {
    this.router.navigate(['/orders/new']);
  }

  selectSection(section: string) {
    this.selectedSection = section;
    if (section === 'orders') {
      this.onSearch();
    }
    if (section === 'dashboard') {
      this.loadStats();
    }
  }

  goToSettings() {
    this.selectedSection = 'settings';
  }

  onSearch() {
    // Implement search logic for orders
    this.orderService.getOrders().subscribe(orders => {
      this.filteredOrders = orders.filter((order: any) =>
        order.productName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
  }

  updateStatus(order: any) {
    // Implement status update logic
  }

  // Products section methods
  toggleAddProductForm() {
    this.showAddProductForm = !this.showAddProductForm;
  }
  addNewProduct() {
    this.products.push({ ...this.newProduct });
    this.newProduct = { name: '', price: 0, category: '', imageUrl: '', status: 'Active', description: '' };
    this.showAddProductForm = false;
  }
  addToCart(product: any) {
    if (!this.cart[product.id]) {
      this.cart[product.id] = { product, quantity: 1 };
    } else {
      this.cart[product.id].quantity++;
    }
    this.updateCartItems();
  }
  removeFromCart(product: any) {
    if (this.cart[product.id]) {
      this.cart[product.id].quantity--;
      if (this.cart[product.id].quantity <= 0) {
        delete this.cart[product.id];
      }
      this.updateCartItems();
    }
  }
  updateCartItems() {
    this.cartItems = Object.values(this.cart);
  }
  getCartTotal() {
    return this.cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }
  proceedToCheckout() {
    this.showAddressModal = true;
  }
  submitAddress() {
    this.showAddressModal = false;
    this.cart = {};
    this.updateCartItems();
    this.billingAddress = '';
    this.deliveryAddress = '';
  }
  closeModal() {
    this.showAddressModal = false;
  }

  // Users section methods
  onUserSearch() {
    this.userService.getUsers().subscribe(users => {
      this.filteredUsers = users.filter((user: any) =>
        user.name.toLowerCase().includes(this.searchUserTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchUserTerm.toLowerCase())
      );
    });
  }

  // Settings section methods
  onSubmit() {
    // Save profile changes
  }
}

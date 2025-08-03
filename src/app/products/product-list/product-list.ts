import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { FormsModule } from '@angular/forms';
import { DatePipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [DatePipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm = '';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = this.products;
    });
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      this.productService.searchProducts(this.searchTerm).subscribe(products => {
        this.filteredProducts = products;
      });
    } else {
      this.filteredProducts = this.products;
    }
  }

  addProduct() {
    this.router.navigate(['/products/new']);
  }

  editProduct(id: number) {
    this.router.navigate(['/products', id, 'edit']);
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadProducts();
        this.onSearch();
      });
    }
  }
}

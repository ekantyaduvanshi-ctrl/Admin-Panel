import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductForm implements OnInit {
  productForm: FormGroup;
  isEdit = false;
  productId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      imageUrl: ['', Validators.required],
      status: ['Active', Validators.required],
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.productId = +params['id'];
        this.productService.getProductById(this.productId).subscribe(product => {
          if (product) {
            this.productForm.patchValue({
              name: product.name,
              description: product.description,
              price: product.price,
              category: product.category,
              imageUrl: product.imageUrl,
              status: product.status
            });
          }
        });
      }
    });
  }

  onSubmit() {
    if (this.productForm.invalid) return;
    const formValue = this.productForm.value;
    
    if (this.isEdit && this.productId !== null) {
      const productData = {
        name: formValue.name,
        description: formValue.description,
        price: formValue.price,
        category: formValue.category,
        imageUrl: formValue.imageUrl,
        status: formValue.status
      };
      this.productService.updateProduct(this.productId, productData).subscribe(() => {
        this.router.navigate(['/products']);
      });
    } else {
      const newProduct = {
        name: formValue.name,
        description: formValue.description,
        price: formValue.price,
        category: formValue.category,
        imageUrl: formValue.imageUrl,
        status: formValue.status,
        createdDate: new Date()
      };
      this.productService.addProduct(newProduct).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/products']);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css'
})
export class UserForm implements OnInit {
  userForm!: FormGroup;
  isEdit = false;
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.userId = params['id'];
        if (this.userId) {
          this.userService.getUserById(this.userId).subscribe(user => {
            this.userForm.patchValue({
              name: user.name,
              email: user.email,
              phone: user.phone,
              password: '', // Leave blank for edit
              confirmPassword: '',
              role: user.role
            });
            this.userForm.get('password')?.clearValidators();
            this.userForm.get('password')?.updateValueAndValidity();
          });
        }
      }
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.userForm.invalid) return;
    const formValue = this.userForm.value;
    if (this.isEdit && this.userId !== null) {
      this.userService.updateUser(this.userId, {
        name: formValue.name,
        email: formValue.email,
        phone: formValue.phone,
        password: formValue.password,
        role: formValue.role
      }).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error updating user:', error);
        }
      });
    } else {
      const newUser: Omit<User, 'id'> = {
        name: formValue.name,
        email: formValue.email,
        phone: formValue.phone,
        password: formValue.password,
        role: formValue.role,
        status: 'Active',
        createdDate: new Date()
      };
      this.userService.addUser(newUser).subscribe({
        next: (user) => {
          // Simulate login after signup
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error creating user:', error);
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/users']);
  }
}

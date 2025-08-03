import { Component } from "@angular/core";
import { UserService } from "../users/user.service";
import { User } from "../users/user.model";
import { SharedModule } from "../shared/shared-module";
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { timeout, catchError, throwError } from 'rxjs';

@Component({
  selector: "app-signup",
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: "./signup.html",
  styleUrls: ["./signup.css"]
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  confirmPassword: string = '';
  error: string = '';
  success: string = '';
  loading: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault();
    console.log('Signup form submitted');
    
    if (!this.name || !this.email || !this.phone || !this.password || !this.confirmPassword) {
      this.error = 'Please fill in all fields.';
      this.success = '';
      return;
    }
    
    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match.';
      this.success = '';
      return;
    }
    
    this.loading = true;
    this.error = '';
    this.success = '';
    
    console.log('Creating new user:', { name: this.name, email: this.email, phone: this.phone });
    
    this.userService.getUsers().pipe(
      timeout(10000), // 10 second timeout
      catchError((error: any) => {
        console.error('Get users error:', error);
        if (error.name === 'TimeoutError' || error.message?.includes('timeout')) {
          return throwError(() => new Error('Request timeout. Please check your connection and try again.'));
        }
        if (error.status === 0) {
          return throwError(() => new Error('Network error. Please check your internet connection.'));
        }
        return throwError(() => new Error('Failed to check existing users. Please try again.'));
      })
    ).subscribe({
      next: (users) => {
        if (users.find((u: any) => u.email === this.email)) {
          this.error = 'Email already exists';
          this.success = '';
          this.loading = false;
          return;
        }
        
        const newUser: Omit<User, 'id'> = {
          name: this.name,
          email: this.email,
          phone: this.phone,
          password: this.password,
          role: 'Normal User',
          status: 'Active',
          createdDate: new Date()
        };
        
        console.log('Adding new user to database:', newUser);
        
        this.userService.addUser(newUser).pipe(
          timeout(10000), // 10 second timeout
          catchError((error: any) => {
            console.error('Add user error:', error);
            if (error.name === 'TimeoutError' || error.message?.includes('timeout')) {
              return throwError(() => new Error('Signup timeout. Please check your connection and try again.'));
            }
            if (error.status === 0) {
              return throwError(() => new Error('Network error. Please check your internet connection.'));
            }
            if (error.status === 409) {
              return throwError(() => new Error('User already exists with this email.'));
            }
            return throwError(() => new Error('Signup failed. Please try again.'));
          })
        ).subscribe({
          next: (createdUser) => {
            console.log('User created successfully:', createdUser);
            this.error = '';
            this.success = 'Signup successful! Redirecting to dashboard...';
            this.loading = false;
            setTimeout(() => {
              console.log('Navigating to dashboard');
              this.router.navigate(['/dashboard']);
            }, 1000);
          },
          error: (error) => {
            console.error('Signup error:', error);
            this.error = error.message || 'Signup failed. Please try again.';
            this.success = '';
            this.loading = false;
          }
        });
      },
      error: (error) => {
        console.error('Get users error:', error);
        this.error = error.message || 'Failed to check existing users. Please try again.';
        this.success = '';
        this.loading = false;
      }
    });
  }
} 
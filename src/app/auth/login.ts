import { Component } from "@angular/core";
import { AuthService } from "../core/auth.service";
import { Router } from '@angular/router';
import { SharedModule } from "../shared/shared-module";
import { CommonModule } from '@angular/common';

@Component({
  selector: "app-login",
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: "./login.html",
  styleUrls: ["./login.css"]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault();
    
    if (!this.email || !this.password) {
      this.error = 'Please enter both email and password.';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login({ email: this.email, password: this.password })
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.loading = false;
          this.error = error.error?.error || 'Login failed. Please try again.';
        }
      });
  }

  goToLogin() {
    this.router.navigate(['/login-form']);
  }
}

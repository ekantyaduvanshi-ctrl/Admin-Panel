import { Component } from "@angular/core";
import { AuthService } from "../core/auth.service";
import { Router } from '@angular/router';
import { SharedModule } from "../shared/shared-module";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: "app-login-form",
  standalone: true,
  imports: [SharedModule, CommonModule, RouterModule],
  templateUrl: "./login-form.html",
  styleUrls: ["./login-form.css"]
})
export class LoginFormComponent {
  username: string = 'adminCshare';
  password: string = 'adminCshare';
  error: string = '';
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault();
    
    if (!this.username || !this.password) {
      this.error = 'Please enter both username and password.';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login({ username: this.username, password: this.password })
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
} 
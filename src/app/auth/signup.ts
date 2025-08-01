import { Component } from "@angular/core";
import { UserService } from "../users/user.service";
import { User } from "../users/user.model";
import { SharedModule } from "../shared/shared-module";
import { Router } from '@angular/router';

@Component({
  selector: "app-signup",
  standalone: true,
  imports: [SharedModule],
  templateUrl: "./signup.html",
  styleUrls: ["./signup.css"]
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  error: string = '';
  success: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault();
    if (!this.name || !this.email || !this.password) {
      this.error = 'Please fill in all fields.';
      this.success = '';
      return;
    }
    
    this.userService.getUsers().subscribe(users => {
      if (users.find((u: any) => u.email === this.email)) {
        this.error = 'Email already exists';
        this.success = '';
        return;
      }
      
      const newUser: Omit<User, 'id'> = {
        name: this.name,
        email: this.email,
        phone: '',
        password: this.password,
        role: 'Normal User',
        status: 'Active',
        createdDate: new Date()
      };
      
      this.userService.addUser(newUser).subscribe({
        next: () => {
          this.error = '';
          this.success = 'Signup successful! Redirecting...';
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1000);
        },
        error: (error) => {
          this.error = 'Signup failed. Please try again.';
          this.success = '';
        }
      });
    });
  }
} 
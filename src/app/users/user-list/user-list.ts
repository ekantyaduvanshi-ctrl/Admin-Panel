import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { FormsModule } from '@angular/forms';
import { DatePipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [DatePipe],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.filteredUsers = users;
    });
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      this.userService.searchUsers(this.searchTerm).subscribe(users => {
        this.filteredUsers = users;
      });
    } else {
      this.filteredUsers = this.users;
    }
  }

  addUser() {
    this.router.navigate(['/users/new']);
  }

  editUser(id: string) {
    this.router.navigate(['/users', id, 'edit']);
  }

  deleteUser(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.loadUsers();
          this.onSearch();
        },
        error: (error) => {
          console.error('Error deleting user:', error);
        }
      });
    }
  }
}

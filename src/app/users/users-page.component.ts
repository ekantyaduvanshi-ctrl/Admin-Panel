import { Component } from '@angular/core';
import { UserList } from './user-list/user-list';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [UserList, RouterOutlet],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css'
})
export class UsersPageComponent {} 
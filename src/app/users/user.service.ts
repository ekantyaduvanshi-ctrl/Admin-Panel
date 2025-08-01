import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { ApiService } from '../core/api.service';
import { API_CONFIG } from '../core/api.config';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private apiService: ApiService) {}

  getUsers(): Observable<User[]> {
    return this.apiService.get<User[]>(API_CONFIG.ENDPOINTS.USERS.LIST);
  }

  getUserById(id: string): Observable<User> {
    return this.apiService.get<User>(API_CONFIG.ENDPOINTS.USERS.GET(id));
  }

  addUser(user: Omit<User, 'id'>): Observable<User> {
    return this.apiService.post<User>(API_CONFIG.ENDPOINTS.USERS.CREATE, user);
  }

  updateUser(id: string, user: Partial<User>): Observable<User> {
    return this.apiService.put<User>(API_CONFIG.ENDPOINTS.USERS.UPDATE(id), user);
  }

  deleteUser(id: string): Observable<any> {
    return this.apiService.delete<any>(API_CONFIG.ENDPOINTS.USERS.DELETE(id));
  }

  searchUsers(term: string): Observable<User[]> {
    return this.apiService.get<User[]>(`${API_CONFIG.ENDPOINTS.USERS.LIST}?search=${term}`);
  }
} 
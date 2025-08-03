import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, timeout, retry, tap } from 'rxjs/operators';
import { API_CONFIG } from './api.config';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: User;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Check if user is already logged in
    const user = localStorage.getItem('user');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    
    const loginUrl = API_CONFIG.EXTERNAL_APIS.AUTH.LOGIN;
    console.log('API_CONFIG.EXTERNAL_APIS.AUTH.LOGIN:', API_CONFIG.EXTERNAL_APIS.AUTH.LOGIN);
    console.log('Attempting login to:', loginUrl);
    console.log('Credentials:', { ...credentials, password: '***' });
    console.log('Headers:', headers);
    
    return this.http.post<LoginResponse>(loginUrl, credentials, { headers })
      .pipe(
        timeout(30000), // 30 second timeout for external API
        retry(1), // Retry once on failure
        tap(response => {
          console.log('Login successful:', response);
          if (response.success && response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            this.currentUserSubject.next(response.user);
          } else {
            throw new Error(response.message || 'Login failed');
          }
        }),
        catchError((error: any) => {
          console.error('Login error details:', error);
          let errorMessage = 'Login failed. Please try again.';
          
          if (error.error?.message) {
            errorMessage = error.error.message;
          } else if (error.message) {
            errorMessage = error.message;
          }
          
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  register(userData: any): Observable<any> {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    
    return this.http.post(API_CONFIG.EXTERNAL_APIS.AUTH.REGISTER, userData, { headers });
  }

  logout(): Observable<any> {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    
    return this.http.post(API_CONFIG.EXTERNAL_APIS.AUTH.LOGOUT, {}, { headers })
      .pipe(
        tap(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.currentUserSubject.next(null);
        }),
        catchError((error: any) => {
          // Even if logout API fails, clear local storage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.currentUserSubject.next(null);
          return throwError(() => new Error('Logout failed'));
        })
      );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  hasRole(role: string): boolean {
    const user = this.currentUserValue;
    return user ? user.role === role : false;
  }

  isAdmin(): boolean {
    return this.hasRole('admin') || this.hasRole('Super Admin');
  }
} 
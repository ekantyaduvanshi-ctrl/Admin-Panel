import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_CONFIG } from './api.config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private useExternalApis = true; // Set to true to use external APIs

  constructor(private http: HttpClient) {}

  // Method to get the base URL based on configuration
  private getBaseUrl(): string {
    return this.useExternalApis ? '' : 'http://localhost:5000/api';
  }

  // Method to get full URL for external APIs
  private getExternalUrl(endpoint: string): string {
    return this.useExternalApis ? endpoint : `${this.getBaseUrl()}${endpoint}`;
  }

  // Method to get headers for external APIs
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json'
    };
    
    if (this.useExternalApis) {
      headers['companyid'] = API_CONFIG.COMPANY_ID;
      if (token) {
        headers['x-auth-token'] = token;
      }
    } else {
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }
    
    return new HttpHeaders(headers);
  }

  get<T>(endpoint: string): Observable<T> {
    const url = this.getExternalUrl(endpoint);
    const headers = this.getHeaders();
    return this.http.get<T>(url, { headers }).pipe(catchError(this.handleError));
  }

  post<T>(endpoint: string, data: any): Observable<T> {
    const url = this.getExternalUrl(endpoint);
    const headers = this.getHeaders();
    return this.http.post<T>(url, data, { headers }).pipe(catchError(this.handleError));
  }

  put<T>(endpoint: string, data: any): Observable<T> {
    const url = this.getExternalUrl(endpoint);
    const headers = this.getHeaders();
    return this.http.put<T>(url, data, { headers }).pipe(catchError(this.handleError));
  }

  delete<T>(endpoint: string): Observable<T> {
    const url = this.getExternalUrl(endpoint);
    const headers = this.getHeaders();
    return this.http.delete<T>(url, { headers }).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = error.error?.message || error.message || `Error ${error.status}: ${error.statusText}`;
    }
    
    console.error('API Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
} 
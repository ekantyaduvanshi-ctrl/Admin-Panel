import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../core/api.config';

export interface Template {
  id: string;
  name: string;
  type: string;
  created_at: string;
  updated_at: string;
}

export interface TemplateFilterParams {
  template_types?: string;
  from?: string;
  to?: string;
}

export interface CreateTemplateRequest {
  name: string;
  heading: string;
  description: string;
  [key: string]: any; // Allow additional fields
}

export interface UpdateTemplateRequest {
  name?: string;
  heading?: string;
  description?: string;
  [key: string]: any; // Allow additional fields
}

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private http: HttpClient) { }

  // Get headers for template API calls
  private getTemplateHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'companyid': API_CONFIG.COMPANY_ID,
      'x-auth-token': token || ''
    });
  }

  // Get templates with filter
  getTemplatesWithFilter(params: TemplateFilterParams): Observable<Template[]> {
    let httpParams = new HttpParams();
    
    if (params.template_types) {
      httpParams = httpParams.set('template_types', params.template_types);
    }
    if (params.from) {
      httpParams = httpParams.set('from', params.from);
    }
    if (params.to) {
      httpParams = httpParams.set('to', params.to);
    }

    const headers = this.getTemplateHeaders();
    return this.http.get<Template[]>(API_CONFIG.EXTERNAL_APIS.TEMPLATES.FILTER, { 
      params: httpParams,
      headers 
    });
  }

  // Get all templates
  getTemplates(): Observable<Template[]> {
    const headers = this.getTemplateHeaders();
    return this.http.get<Template[]>(API_CONFIG.EXTERNAL_APIS.TEMPLATES.LIST, { headers });
  }

  // Get template by ID
  getTemplate(id: string): Observable<Template> {
    const headers = this.getTemplateHeaders();
    return this.http.get<Template>(API_CONFIG.EXTERNAL_APIS.TEMPLATES.GET(id), { headers });
  }

  // Create template
  createTemplate(template: CreateTemplateRequest): Observable<Template> {
    const headers = this.getTemplateHeaders();
    return this.http.post<Template>(API_CONFIG.EXTERNAL_APIS.TEMPLATES.CREATE, template, { headers });
  }

  // Update template
  updateTemplate(id: string, template: UpdateTemplateRequest): Observable<Template> {
    const headers = this.getTemplateHeaders();
    const updateData = { id, ...template };
    return this.http.put<Template>(API_CONFIG.EXTERNAL_APIS.TEMPLATES.UPDATE, updateData, { headers });
  }

  // Delete template
  deleteTemplate(id: string): Observable<any> {
    const headers = this.getTemplateHeaders();
    return this.http.delete(API_CONFIG.EXTERNAL_APIS.TEMPLATES.DELETE(id), { headers });
  }
} 
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private http: HttpClient) { }

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

    return this.http.get<Template[]>(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TEMPLATES.FILTER}`, { params: httpParams });
  }

  // Get all templates
  getTemplates(): Observable<Template[]> {
    return this.http.get<Template[]>(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TEMPLATES.LIST}`);
  }

  // Get template by ID
  getTemplate(id: string): Observable<Template> {
    return this.http.get<Template>(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TEMPLATES.GET(id)}`);
  }

  // Create template
  createTemplate(template: Partial<Template>): Observable<Template> {
    return this.http.post<Template>(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TEMPLATES.CREATE}`, template);
  }

  // Update template
  updateTemplate(id: string, template: Partial<Template>): Observable<Template> {
    return this.http.put<Template>(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TEMPLATES.UPDATE(id)}`, template);
  }

  // Delete template
  deleteTemplate(id: string): Observable<any> {
    return this.http.delete(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TEMPLATES.DELETE(id)}`);
  }
} 
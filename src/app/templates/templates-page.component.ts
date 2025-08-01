import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TemplateService, Template, TemplateFilterParams } from './template.service';
import { SharedModule } from '../shared/shared-module';

@Component({
  selector: 'app-templates-page',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule],
  templateUrl: './templates-page.component.html',
  styleUrls: ['./templates-page.component.css']
})
export class TemplatesPageComponent implements OnInit {
  templates: Template[] = [];
  loading: boolean = false;
  error: string = '';
  
  // Filter parameters
  filterParams: TemplateFilterParams = {
    template_types: '',
    from: '',
    to: ''
  };

  constructor(private templateService: TemplateService) { }

  ngOnInit(): void {
    this.loadTemplates();
  }

  loadTemplates(): void {
    this.loading = true;
    this.error = '';

    this.templateService.getTemplatesWithFilter(this.filterParams)
      .subscribe({
        next: (templates) => {
          this.templates = templates;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Failed to load templates. Please try again.';
          this.loading = false;
          console.error('Error loading templates:', error);
        }
      });
  }

  applyFilter(): void {
    this.loadTemplates();
  }

  clearFilter(): void {
    this.filterParams = {
      template_types: '',
      from: '',
      to: ''
    };
    this.loadTemplates();
  }

  deleteTemplate(id: string): void {
    if (confirm('Are you sure you want to delete this template?')) {
      this.templateService.deleteTemplate(id)
        .subscribe({
          next: () => {
            this.loadTemplates();
          },
          error: (error) => {
            this.error = 'Failed to delete template. Please try again.';
            console.error('Error deleting template:', error);
          }
        });
    }
  }
} 
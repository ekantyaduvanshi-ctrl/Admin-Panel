import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TemplateService, Template, CreateTemplateRequest } from '../template.service';
import { SharedModule } from '../../shared/shared-module';

@Component({
  selector: 'app-template-form',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule],
  templateUrl: './template-form.html',
  styleUrls: ['./template-form.css']
})
export class TemplateFormComponent {
  template: CreateTemplateRequest = {
    name: '',
    heading: '',
    description: '',
    type: ''
  };
  
  loading: boolean = false;
  error: string = '';
  success: string = '';

  constructor(
    private templateService: TemplateService,
    private router: Router
  ) { }

  onSubmit(event: Event): void {
    event.preventDefault();
    
    if (!this.template.name || !this.template.heading || !this.template.description) {
      this.error = 'Please fill in all required fields.';
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    this.templateService.createTemplate(this.template)
      .subscribe({
        next: (createdTemplate) => {
          this.loading = false;
          this.success = 'Template created successfully!';
          console.log('Template created:', createdTemplate);
          
          // Reset form
          this.template = {
            name: '',
            heading: '',
            description: '',
            type: ''
          };
          
          // Navigate back to templates list after a short delay
          setTimeout(() => {
            this.router.navigate(['/templates']);
          }, 2000);
        },
        error: (error) => {
          this.loading = false;
          this.error = error.error?.message || 'Failed to create template. Please try again.';
          console.error('Error creating template:', error);
        }
      });
  }

  cancel(): void {
    this.router.navigate(['/templates']);
  }
} 
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TemplateService, Template } from '../template.service';
import { SharedModule } from '../../shared/shared-module';

@Component({
  selector: 'app-template-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, SharedModule],
  templateUrl: './template-edit.html',
  styleUrls: ['./template-edit.css']
})
export class TemplateEditComponent implements OnInit {
  template: Partial<Template> = {
    id: '',
    name: '',
    type: ''
  };
  
  loading: boolean = false;
  error: string = '';
  success: string = '';
  templateId: string = '';

  constructor(
    private templateService: TemplateService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.templateId = this.route.snapshot.params['id'];
    if (this.templateId) {
      this.loadTemplate();
    }
  }

  loadTemplate(): void {
    this.loading = true;
    this.error = '';

    this.templateService.getTemplate(this.templateId)
      .subscribe({
        next: (template) => {
          this.template = template;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Failed to load template. Please try again.';
          this.loading = false;
          console.error('Error loading template:', error);
        }
      });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    
    if (!this.template.name || !this.template.type) {
      this.error = 'Please fill in all required fields.';
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    this.templateService.updateTemplate(this.templateId, this.template)
      .subscribe({
        next: (updatedTemplate) => {
          this.loading = false;
          this.success = 'Template updated successfully!';
          console.log('Template updated:', updatedTemplate);
          
          // Navigate back to templates list after a short delay
          setTimeout(() => {
            this.router.navigate(['/templates']);
          }, 2000);
        },
        error: (error) => {
          this.loading = false;
          this.error = error.error?.message || 'Failed to update template. Please try again.';
          console.error('Error updating template:', error);
        }
      });
  }

  cancel(): void {
    this.router.navigate(['/templates']);
  }
} 
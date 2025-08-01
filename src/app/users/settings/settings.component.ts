import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : {};
    this.profileForm = this.fb.group({
      name: [user.name || '', Validators.required],
      email: [user.email || '', [Validators.required, Validators.email]],
      phone: [user.phone || '', Validators.required],
      address: [user.address || ''],
      profileImage: [user.profileImage || '']
    });
  }

  onSubmit() {
    if (this.profileForm.invalid) return;
    const updatedUser = { ...JSON.parse(localStorage.getItem('user') || '{}'), ...this.profileForm.value };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    alert('Profile updated successfully!');
  }
} 
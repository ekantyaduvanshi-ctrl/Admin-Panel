export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'Super Admin' | 'Service Engineer' | 'Normal User';
  status: 'Active' | 'Inactive';
  createdDate: Date;
} 
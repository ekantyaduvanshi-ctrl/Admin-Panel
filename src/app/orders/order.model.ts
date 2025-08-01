export interface Order {
  id: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  productId: number;
  productName: string;
  assignedEngineerId: number;
  assignedEngineerName: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High';
  description: string;
  createdDate: Date;
  updatedDate: Date;
} 
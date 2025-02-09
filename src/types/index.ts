export interface User {
  id: string;
  name: string;
  email: string;
  businessName: string;
  gstin: string;
  address: string;
  businessType: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  items: InvoiceItem[];
  subTotal: number;
  cgst: number;
  sgst: number;
  igst: number;
  total: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  createdAt: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
  gstRate: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  gstin: string;
  address: string;
  phone: string;
}
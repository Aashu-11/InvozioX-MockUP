import React, { useState } from 'react';
import { Plus, Filter, Download, Send, MoreVertical, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { formatCurrency } from '../lib/utils';
import { NewInvoiceDialog } from './Invoices/NewInvoiceDialog';
import type { Invoice } from '../types';

const mockInvoices: Invoice[] = [
  {
    id: 'INV001',
    invoiceNumber: 'INV-001',
    customerId: '1',
    items: [],
    subTotal: 45000,
    cgst: 0,
    sgst: 0,
    igst: 0,
    total: 45000,
    status: 'paid',
    dueDate: '2024-03-20',
    createdAt: '2024-03-15',
  },
  {
    id: 'INV002',
    invoiceNumber: 'INV-002',
    customerId: '2',
    items: [],
    subTotal: 28500,
    cgst: 0,
    sgst: 0,
    igst: 0,
    total: 28500,
    status: 'pending',
    dueDate: '2024-03-25',
    createdAt: '2024-03-14',
  },
  {
    id: 'INV003',
    invoiceNumber: 'INV-003',
    customerId: '3',
    items: [],
    subTotal: 72000,
    cgst: 0,
    sgst: 0,
    igst: 0,
    total: 72000,
    status: 'overdue',
    dueDate: '2024-03-10',
    createdAt: '2024-03-01',
  },
  // Add more mock invoices...
];

const Invoices = () => {
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [invoices, setInvoices] = useState(mockInvoices);

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || invoice.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSelectInvoice = (invoiceId: string) => {
    setSelectedInvoices((prev) =>
      prev.includes(invoiceId)
        ? prev.filter((id) => id !== invoiceId)
        : [...prev, invoiceId]
    );
  };

  const handleSelectAll = () => {
    setSelectedInvoices(
      selectedInvoices.length === filteredInvoices.length
        ? []
        : filteredInvoices.map((invoice) => invoice.id)
    );
  };

  const handleSaveInvoice = (newInvoice: Invoice) => {
    setInvoices((prev) => [...prev, newInvoice]);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Invoices</h1>
          <p className="text-gray-400">Manage and track your invoices</p>
        </div>
        <Button size="lg" className="gap-1 px-9" onClick={() => setIsDialogOpen(true)}>
          <Plus className="w-3 h-3" />
          New Invoice
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-[#1E1E1E]">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search invoices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-10 pr-4 py-2 rounded-lg bg-[#2A2A2A] border border-[#3A3A3A] text-white placeholder-gray-400 focus:outline-none focus:border-[#00FFFF] transition-all duration-200"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 rounded-lg bg-[#2A2A2A] border border-[#3A3A3A] text-white focus:outline-none focus:border-[#00FFFF] transition-all duration-200"
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>
          <Button variant="secondary" className="gap-2">
            <Filter className="w-4 h-4" />
            More Filters
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button variant="secondary" className="gap-2">
            <Send className="w-4 h-4" />
            Bulk Send
          </Button>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="rounded-xl bg-[#1E1E1E] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#2A2A2A]">
              <th className="px-6 py-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedInvoices.length === filteredInvoices.length}
                  onChange={handleSelectAll}
                  className="rounded border-[#3A3A3A] text-[#00FFFF] focus:ring-[#00FFFF] focus:ring-offset-[#1E1E1E]"
                />
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                Invoice ID
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                Client
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                Due Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                Created
              </th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="border-b border-[#2A2A2A] hover:bg-[#2A2A2A] transition-colors duration-200"
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedInvoices.includes(invoice.id)}
                    onChange={() => handleSelectInvoice(invoice.id)}
                    className="rounded border-[#3A3A3A] text-[#00FFFF] focus:ring-[#00FFFF] focus:ring-offset-[#1E1E1E]"
                  />
                </td>
                <td className="px-6 py-4 font-medium">{invoice.invoiceNumber}</td>
                <td className="px-6 py-4">{invoice.customerId}</td>
                <td className="px-6 py-4 font-medium">
                  {formatCurrency(invoice.total)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      invoice.status === 'paid'
                        ? 'bg-[#00FFFF]/10 text-[#00FFFF]'
                        : invoice.status === 'pending'
                        ? 'bg-yellow-400/10 text-yellow-400'
                        : 'bg-[#FF00FF]/10 text-[#FF00FF]'
                    }`}
                  >
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-400">{invoice.dueDate}</td>
                <td className="px-6 py-4 text-gray-400">{invoice.createdAt}</td>
                <td className="px-6 py-4">
                  <button className="p-1 rounded-lg hover:bg-[#3A3A3A] transition-colors duration-200">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <NewInvoiceDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveInvoice}
        customers={[
          { id: '1', name: 'Tech Solutions Ltd' },
          { id: '2', name: 'Digital Dynamics' },
          { id: '3', name: 'Innovate Systems' },
        ]}
      />
    </div>
  );
};

export default Invoices;


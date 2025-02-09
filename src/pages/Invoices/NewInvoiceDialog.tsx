import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Dialog } from '../../components/ui/Dialog';
import { Button } from '../../components/ui/Button';
import { formatCurrency } from '../../lib/utils';
import type { Invoice, InvoiceItem } from '../../types';

interface NewInvoiceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (invoice: Invoice) => void;
  customers: Array<{ id: string; name: string; }>;
}

export const NewInvoiceDialog: React.FC<NewInvoiceDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  customers,
}) => {
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: '1',
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0,
      gstRate: 18,
    },
  ]);

  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        description: '',
        quantity: 1,
        rate: 0,
        amount: 0,
        gstRate: 18,
      },
    ]);
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleItemChange = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'quantity' || field === 'rate') {
            updatedItem.amount = updatedItem.quantity * updatedItem.rate;
          }
          return updatedItem;
        }
        return item;
      })
    );
  };

  const calculateTotals = () => {
    const subTotal = items.reduce((sum, item) => sum + item.amount, 0);
    const gstAmount = items.reduce(
      (sum, item) => sum + (item.amount * item.gstRate) / 100,
      0
    );
    return {
      subTotal,
      gstAmount,
      total: subTotal + gstAmount,
    };
  };

  const handleSave = () => {
    const totals = calculateTotals();
    const newInvoice: Invoice = {
      id: Math.random().toString(36).substr(2, 9),
      invoiceNumber: `INV-${Date.now()}`,
      customerId: selectedCustomer,
      items,
      subTotal: totals.subTotal,
      cgst: totals.gstAmount / 2,
      sgst: totals.gstAmount / 2,
      igst: 0,
      total: totals.total,
      status: 'pending',
      dueDate,
      createdAt: new Date().toISOString(),
    };
    onSave(newInvoice);
    onClose();
  };

  const { subTotal, gstAmount, total } = calculateTotals();

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Create New Invoice">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Customer
            </label>
            <select
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#2A2A2A] border border-[#3A3A3A] text-white focus:outline-none focus:border-[#00FFFF] transition-all duration-200"
            >
              <option value="">Select customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#2A2A2A] border border-[#3A3A3A] text-white focus:outline-none focus:border-[#00FFFF] transition-all duration-200"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Items</h3>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleAddItem}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Item
            </Button>
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-4 p-4 rounded-lg bg-[#2A2A2A] animate-in slide-in-from-top"
              >
                <div className="col-span-4">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) =>
                      handleItemChange(item.id, 'description', e.target.value)
                    }
                    placeholder="Item description"
                    className="w-full px-3 py-1.5 rounded-lg bg-[#3A3A3A] border border-[#4A4A4A] text-white focus:outline-none focus:border-[#00FFFF] transition-all duration-200"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(item.id, 'quantity', Number(e.target.value))
                    }
                    placeholder="Qty"
                    className="w-full px-3 py-1.5 rounded-lg bg-[#3A3A3A] border border-[#4A4A4A] text-white focus:outline-none focus:border-[#00FFFF] transition-all duration-200"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    value={item.rate}
                    onChange={(e) =>
                      handleItemChange(item.id, 'rate', Number(e.target.value))
                    }
                    placeholder="Rate"
                    className="w-full px-3 py-1.5 rounded-lg bg-[#3A3A3A] border border-[#4A4A4A] text-white focus:outline-none focus:border-[#00FFFF] transition-all duration-200"
                  />
                </div>
                <div className="col-span-2">
                  <select
                    value={item.gstRate}
                    onChange={(e) =>
                      handleItemChange(item.id, 'gstRate', Number(e.target.value))
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-[#3A3A3A] border border-[#4A4A4A] text-white focus:outline-none focus:border-[#00FFFF] transition-all duration-200"
                  >
                    <option value="0">0%</option>
                    <option value="5">5%</option>
                    <option value="12">12%</option>
                    <option value="18">18%</option>
                    <option value="28">28%</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <p className="text-right">{formatCurrency(item.amount)}</p>
                </div>
                <div className="col-span-1">
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-1.5 rounded-lg hover:bg-[#4A4A4A] text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-lg bg-[#2A2A2A] space-y-2">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span>{formatCurrency(subTotal)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>GST</span>
              <span>{formatCurrency(gstAmount)}</span>
            </div>
            <div className="flex justify-between text-lg font-medium pt-2 border-t border-[#3A3A3A]">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!selectedCustomer || items.length === 0}>
            Create Invoice
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
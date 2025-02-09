import React from 'react';
import { Dialog } from '../../components/ui/Dialog';
import { Button } from '../../components/ui/Button';
import { formatCurrency } from '../../lib/utils';
import type { Invoice } from '../../types';

interface InvoiceDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice;
  customerName: string;
}

export const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({
  isOpen,
  onClose,
  invoice,
  customerName,
}) => {
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Invoice Details">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400">Invoice Number</p>
            <p className="font-medium">{invoice.invoiceNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Customer</p>
            <p className="font-medium">{customerName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Created Date</p>
            <p className="font-medium">
              {new Date(invoice.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Due Date</p>
            <p className="font-medium">
              {new Date(invoice.dueDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-4">Items</h3>
          <div className="space-y-2">
            {invoice.items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-4 p-4 rounded-lg bg-[#2A2A2A]"
              >
                <div className="col-span-4">
                  <p className="font-medium">{item.description}</p>
                </div>
                <div className="col-span-2 text-gray-400">
                  {item.quantity} units
                </div>
                <div className="col-span-2 text-gray-400">
                  {formatCurrency(item.rate)}
                </div>
                <div className="col-span-2 text-gray-400">{item.gstRate}% GST</div>
                <div className="col-span-2 text-right">
                  {formatCurrency(item.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-lg bg-[#2A2A2A] space-y-2">
          <div className="flex justify-between text-gray-400">
            <span>Subtotal</span>
            <span>{formatCurrency(invoice.subTotal)}</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>CGST</span>
            <span>{formatCurrency(invoice.cgst)}</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>SGST</span>
            <span>{formatCurrency(invoice.sgst)}</span>
          </div>
          <div className="flex justify-between text-lg font-medium pt-2 border-t border-[#3A3A3A]">
            <span>Total</span>
            <span>{formatCurrency(invoice.total)}</span>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button>Download PDF</Button>
        </div>
      </div>
    </Dialog>
  );
};
export default InvoiceDetails;
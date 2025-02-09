import React, { useState } from 'react';
import { Dialog } from '../../components/ui/Dialog';
import { Button } from '../../components/ui/Button';
import type { Customer } from '../../types';

interface NewClientDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (client: Customer) => void;
}

export const NewClientDialog: React.FC<NewClientDialogProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Omit<Customer, 'id'>>({
    name: '',
    email: '',
    gstin: '',
    address: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    const newClient: Customer = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
    };
    onSave(newClient);
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Add New Client">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Business Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-[#2A2A2A] border border-[#3A3A3A] text-white focus:outline-none focus:border-[#00FFFF] transition-all duration-200"
            placeholder="Enter business name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-[#2A2A2A] border border-[#3A3A3A] text-white focus:outline-none focus:border-[#00FFFF] transition-all duration-200"
            placeholder="Enter email address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-[#2A2A2A] border border-[#3A3A3A] text-white focus:outline-none focus:border-[#00FFFF] transition-all duration-200"
            placeholder="Enter phone number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            GSTIN
          </label>
          <input
            type="text"
            name="gstin"
            value={formData.gstin}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-[#2A2A2A] border border-[#3A3A3A] text-white focus:outline-none focus:border-[#00FFFF] transition-all duration-200"
            placeholder="Enter GSTIN"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Business Address
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 rounded-lg bg-[#2A2A2A] border border-[#3A3A3A] text-white focus:outline-none focus:border-[#00FFFF] transition-all duration-200"
            placeholder="Enter business address"
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!formData.name || !formData.email || !formData.gstin}
          >
            Add Client
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Mail, Phone } from 'lucide-react';
import { Button } from '../components/ui/Button';
import type { Customer } from '../types';
import { NewClientDialog } from './Clients/NewClientDialog';

const mockClients: Customer[] = [
  {
    id: '1',
    name: 'Tech Solutions Ltd',
    email: 'contact@techsolutions.com',
    gstin: '27AABCT3518Q1Z2',
    address: '123 Tech Park, Mumbai, Maharashtra',
    phone: '+91 98765 43210',
  },
  {
    id: '2',
    name: 'Digital Dynamics',
    email: 'info@digitaldynamics.com',
    gstin: '29AABCD1234E1Z5',
    address: '456 Cyber City, Bangalore, Karnataka',
    phone: '+91 98765 43211',
  },
  {
    id: '3',
    name: 'Innovate Systems',
    email: 'hello@innovatesystems.com',
    gstin: '07AAACI1234J1Z4',
    address: '789 Business Hub, Delhi, NCR',
    phone: '+91 98765 43212',
  },
];

const Clients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [clients, setClients] = useState<Customer[]>(mockClients);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.gstin.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectClient = (clientId: string) => {
    setSelectedClients((prev) =>
      prev.includes(clientId)
        ? prev.filter((id) => id !== clientId)
        : [...prev, clientId]
    );
  };

  const handleSelectAll = () => {
    setSelectedClients(
      selectedClients.length === filteredClients.length
        ? []
        : filteredClients.map((client) => client.id)
    );
  };

  const handleAddClient = (newClient: Customer) => {
    setClients((prev) => [...prev, newClient]);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Clients</h1>
          <p className="text-gray-400">Manage your client database</p>
        </div>
        <Button size="lg" className="gap-2" onClick={() => setIsDialogOpen(true)}>
          <Plus className="w-5 h-5" />
          Add Client
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-[#1E1E1E]">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-10 pr-4 py-2 rounded-lg bg-[#2A2A2A] border border-[#3A3A3A] text-white placeholder-gray-400 focus:outline-none focus:border-[#00FFFF] transition-all duration-200"
            />
          </div>
          <Button variant="secondary" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="p-6 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A] hover:border-[#00FFFF]/50 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-white mb-1">{client.name}</h3>
                <p className="text-sm text-gray-400">GSTIN: {client.gstin}</p>
              </div>
              <button className="p-1 rounded-lg hover:bg-[#3A3A3A] transition-colors duration-200">
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="w-4 h-4" />
                <span>{client.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="w-4 h-4" />
                <span>{client.phone}</span>
              </div>
              <p className="text-sm text-gray-400">{client.address}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#2A2A2A] flex items-center justify-between">
              <Button variant="secondary" size="sm">View Details</Button>
              <Button variant="secondary" size="sm">Create Invoice</Button>
            </div>
          </div>
        ))}
      </div>

      <NewClientDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleAddClient}
      />
    </div>
  );
};

export default Clients;
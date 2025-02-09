import React from 'react';
import { Bell, Search } from 'lucide-react';

export const Header = () => {
  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-[#121212]/80 backdrop-blur-md border-b border-[#1E1E1E] px-6 flex items-center justify-between z-50">
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search invoices, clients..."
          className="w-full h-10 pl-10 pr-4 rounded-lg bg-[#1E1E1E] border border-[#2A2A2A] text-white placeholder-gray-400 focus:outline-none focus:border-[#00FFFF] transition-all duration-200"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg hover:bg-[#1E1E1E] transition-all duration-200">
          <Bell className="w-5 h-5 text-gray-400" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#FF00FF]" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00FFFF] to-[#FF00FF]" />
          <div>
            <p className="text-sm font-medium text-white">John Doe</p>
            <p className="text-xs text-gray-400">Acme Inc.</p>
          </div>
        </div>
      </div>
    </header>
  );
};
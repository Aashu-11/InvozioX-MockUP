import React from 'react';
import {
  User,
  Building,
  CreditCard,
  Bell,
  Lock,
  Palette,
  HelpCircle,
  Save,
} from 'lucide-react';
import { Button } from '../components/ui/Button';

const Settings = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold mb-1">Settings</h1>
        <p className="text-gray-400">Manage your account preferences</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Profile Settings */}
        <div className="p-6 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A]">
          <div className="flex items-center gap-2 mb-6">
            <User className="w-5 h-5 text-[#00FFFF]" />
            <h2 className="text-lg font-medium">Profile Settings</h2>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue="John Doe"
                  className="w-full px-4 py-2 rounded-lg bg-[#2A2A2A] border border-[#3A3A3A] text-white placeholder-gray-500 focus:outline-none focus:border-[#00FFFF] transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue="john@example.com"
                  className="w-full px-4 py-2 rounded-lg bg-[#2A2A2A] border border-[#3A3A3A] text-white placeholder-gray-500 focus:outline-none focus:border-[#00FFFF] transition-all duration-200"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Profile Picture
              </label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00FFFF] to-[#FF00FF]" />
                <Button variant="secondary">Change Photo</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Business Settings */}
        <div className="p-6 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A]">
          <div className="flex items-center gap-2 mb-6">
            <Building className="w-5 h-5 text-[#00FFFF]" />
            <h2 className="text-lg font-medium">Business Settings</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Business Name
              </label>
              <input
                type="text"
                defaultValue="Acme Inc."
                className="w-full px-4 py-2 rounded-lg bg-[#2A2A2A] border border-[#3A3A3A] text-white placeholder-gray-500 focus:outline-none focus:border-[#00FFFF] transition-all duration-200"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  GSTIN
                </label>
                <input
                  type="text"
                  defaultValue="27AABCT3518Q1Z2"
                  className="w-full px-4 py-2 rounded-lg bg-[#2A2A2A] border border-[#3A3A3A] text-white placeholder-gray-500 focus:outline-none focus:border-[#00FFFF] transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Business Type
                </label>
                <select
                  defaultValue="private_limited"
                  className="w-full px-4 py-2 rounded-lg bg-[#2A2A2A] border border-[#3A3A3A] text-white focus:outline-none focus:border-[#00FFFF] transition-all duration-200"
                >
                  <option value="sole_proprietorship">Sole Proprietorship</option>
                  <option value="partnership">Partnership</option>
                  <option value="llp">LLP</option>
                  <option value="private_limited">Private Limited</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Business Address
              </label>
              <textarea
                rows={3}
                defaultValue="123 Business Park, Mumbai, Maharashtra"
                className="w-full px-4 py-2 rounded-lg bg-[#2A2A2A] border border-[#3A3A3A] text-white placeholder-gray-500 focus:outline-none focus:border-[#00FFFF] transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="p-6 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A]">
          <div className="flex items-center gap-2 mb-6">
            <Palette className="w-5 h-5 text-[#00FFFF]" />
            <h2 className="text-lg font-medium">Preferences</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Theme
              </label>
              <div className="grid grid-cols-3 gap-4">
                <button className="p-4 rounded-lg bg-[#2A2A2A] border border-[#00FFFF] text-center">
                  <span className="block w-full h-20 rounded-lg bg-gradient-to-r from-[#00FFFF]/20 to-[#FF00FF]/20 mb-2" />
                  <span className="text-sm">Neon Dark</span>
                </button>
                <button className="p-4 rounded-lg bg-[#2A2A2A] border border-[#3A3A3A] text-center opacity-50">
                  <span className="block w-full h-20 rounded-lg bg-white mb-2" />
                  <span className="text-sm">Light</span>
                </button>
                <button className="p-4 rounded-lg bg-[#2A2A2A] border border-[#3A3A3A] text-center opacity-50">
                  <span className="block w-full h-20 rounded-lg bg-[#121212] mb-2" />
                  <span className="text-sm">Dark</span>
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Language
              </label>
              <select
                defaultValue="en"
                className="w-full px-4 py-2 rounded-lg bg-[#2A2A2A] border border-[#3A3A3A] text-white focus:outline-none focus:border-[#00FFFF] transition-all duration-200"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="mr">Marathi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Changes */}
        <div className="flex justify-end">
          <Button size="lg" className="gap-2">
            <Save className="w-5 h-5" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
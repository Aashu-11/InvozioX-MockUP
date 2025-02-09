import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  BarChart3, 
  Brain, 
  Settings,
  LogOut,
  Briefcase,
  DollarSign
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/Button';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: FileText, label: 'Invoices', path: '/invoices' },
  { icon: Users, label: 'Clients', path: '/clients' },
  { icon: BarChart3, label: 'Reports', path: '/reports' },
  { icon: Brain, label: 'AI Insights', path: '/insights' },
  { icon: Briefcase, label: 'Tax Advisor', path: '/tax-advisor' },
  { icon: DollarSign, label: 'Bank Sync', path: '/bank-sync' }, // Add Bank Sync with money symbol
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any logout logic here
    navigate('/');
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-[#121212] border-r border-[#1E1E1E] p-4">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00FFFF] to-[#FF00FF]" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00FFFF] to-[#FF00FF] text-transparent bg-clip-text">
          InvozioX
        </h1>
      </div>

      <nav className="space-y-2">
        {navItems.map(({ icon: Icon, label, path }) => (
          <Link
            key={path}
            to={path}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200',
              location.pathname === path
                ? 'bg-gradient-to-r from-[#00FFFF]/10 to-[#FF00FF]/10 text-[#00FFFF]'
                : 'text-gray-400 hover:text-white hover:bg-[#1E1E1E]'
            )}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <Button className="w-full" variant="secondary" icon={<LogOut className="w-5 h-5" />} onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};


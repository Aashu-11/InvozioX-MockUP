import React from 'react';
import { BarChart3, TrendingUp, Users, Wallet, ArrowUpRight, ArrowDownRight,Brain } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

const stats = [
  {
    title: 'Total Revenue',
    value: formatCurrency(1250000),
    change: '+12.5%',
    trend: 'up',
    icon: Wallet,
  },
  {
    title: 'Active Clients',
    value: '245',
    change: '+5.2%',
    trend: 'up',
    icon: Users,
  },
  {
    title: 'Pending Invoices',
    value: formatCurrency(325000),
    change: '-2.8%',
    trend: 'down',
    icon: BarChart3,
  },
  {
    title: 'Monthly Growth',
    value: '18.2%',
    change: '+3.1%',
    trend: 'up',
    icon: TrendingUp,
  },
];

const recentInvoices = [
  {
    id: '1',
    client: 'Tech Solutions Ltd',
    amount: 45000,
    status: 'paid',
    date: '2024-03-15',
  },
  {
    id: '2',
    client: 'Digital Dynamics',
    amount: 28500,
    status: 'pending',
    date: '2024-03-14',
  },
  {
    id: '3',
    client: 'Innovate Systems',
    amount: 72000,
    status: 'overdue',
    date: '2024-03-10',
  },
];

const aiInsights = [
  {
    title: 'Payment Pattern Analysis',
    description: 'Clients typically pay within 8 days of invoice generation.',
    action: 'Optimize cash flow by scheduling follow-ups on day 6.',
  },
  {
    title: 'Revenue Forecast',
    description: 'Projected 22% growth in Q2 based on current trends.',
    action: 'Consider expanding client base in tech sector.',
  },
  {
    title: 'Tax Optimization',
    description: 'Potential for 5% tax savings through better categorization.',
    action: 'Review and update expense categories.',
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="p-6 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A] hover:border-[#00FFFF]/50 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 mb-1">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-white mb-2">{stat.value}</h3>
                  <div className="flex items-center gap-1">
                    {stat.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 text-[#00FFFF]" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-[#FF00FF]" />
                    )}
                    <span
                      className={stat.trend === 'up' ? 'text-[#00FFFF]' : 'text-[#FF00FF]'}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#2A2A2A] group-hover:bg-gradient-to-r from-[#00FFFF]/20 to-[#FF00FF]/20 transition-all duration-300">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Invoices */}
        <div className="lg:col-span-2 p-6 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A]">
          <h2 className="text-xl font-bold mb-6">Recent Invoices</h2>
          <div className="space-y-4">
            {recentInvoices.map((invoice) => (
              <div
                key={invoice.id}
                className="p-4 rounded-lg bg-[#2A2A2A] hover:bg-[#3A3A3A] transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-white">{invoice.client}</h3>
                    <p className="text-sm text-gray-400">{invoice.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-white">
                      {formatCurrency(invoice.amount)}
                    </p>
                    <span
                      className={`text-sm ${
                        invoice.status === 'paid'
                          ? 'text-[#00FFFF]'
                          : invoice.status === 'pending'
                          ? 'text-yellow-400'
                          : 'text-[#FF00FF]'
                      }`}
                    >
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="p-6 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A]">
          <div className="flex items-center gap-2 mb-6">
            <Brain className="w-5 h-5 text-[#00FFFF]" />
            <h2 className="text-xl font-bold">AI Insights</h2>
          </div>
          <div className="space-y-4">
            {aiInsights.map((insight, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-gradient-to-r from-[#00FFFF]/5 to-[#FF00FF]/5 border border-[#2A2A2A] hover:border-[#00FFFF]/50 transition-all duration-300"
              >
                <h3 className="font-medium text-[#00FFFF] mb-2">{insight.title}</h3>
                <p className="text-sm text-gray-400 mb-2">{insight.description}</p>
                <p className="text-sm text-[#FF00FF]">Action: {insight.action}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
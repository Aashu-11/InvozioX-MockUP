import React, { useState } from 'react';
import { BarChart3, TrendingUp, PieChart, Download, Calendar } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { formatCurrency } from '../lib/utils';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Reports = () => {
  const [days, setDays] = useState(30);

  const revenueData = {
    total: 2450000,
    growth: 15.8,
    breakdown: [
      { month: 'Jan', amount: 180000 },
      { month: 'Feb', amount: 220000 },
      { month: 'Mar', amount: 250000 },
      { month: 'Apr', amount: 200000 },
      { month: 'May', amount: 230000 },
      { month: 'Jun', amount: 240000 },
      { month: 'Jul', amount: 260000 },
      { month: 'Aug', amount: 270000 },
      { month: 'Sep', amount: 280000 },
      { month: 'Oct', amount: 290000 },
      { month: 'Nov', amount: 300000 },
      { month: 'Dec', amount: 310000 },
    ],
  };

  const gstSummary = {
    total: 441000,
    cgst: 220500,
    sgst: 220500,
    pending: 35000,
  };

  const topClients = [
    { name: 'Tech Solutions Ltd', revenue: 450000, invoices: 12 },
    { name: 'Digital Dynamics', revenue: 380000, invoices: 8 },
    { name: 'Innovate Systems', revenue: 320000, invoices: 10 },
  ];

  const chartData = {
    labels: revenueData.breakdown.map((data) => data.month),
    datasets: [
      {
        label: 'Revenue',
        data: revenueData.breakdown.map((data) => data.amount),
        backgroundColor: 'rgba(0, 255, 255, 0.2)',
        borderColor: 'rgba(0, 255, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Revenue Overview',
      },
    },
  };

  interface RevenueBreakdown {
    month: string;
    amount: number;
  }

  interface RevenueData {
    total: number;
    growth: number;
    breakdown: RevenueBreakdown[];
  }

  interface GstSummary {
    total: number;
    cgst: number;
    sgst: number;
    pending: number;
  }

  interface Client {
    name: string;
    revenue: number;
    invoices: number;
  }

  const handleDaysChange = (newDays: number) => {
    setDays(newDays);
    // Update the chart data based on the new number of days
    // This is just a placeholder logic, you should replace it with actual data fetching logic
    const updatedBreakdown = revenueData.breakdown.slice(0, newDays / 30);
    chartData.labels = updatedBreakdown.map((data) => data.month);
    chartData.datasets[0].data = updatedBreakdown.map((data) => data.amount);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Reports & Analytics</h1>
          <p className="text-gray-400">Track your business performance</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="secondary" className="gap-2" onClick={() => handleDaysChange(30)}>
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </Button>
          <Button variant="secondary" className="gap-2" onClick={() => handleDaysChange(90)}>
            <Calendar className="w-4 h-4" />
            Last 90 Days
          </Button>
          <Button variant="secondary" className="gap-2">
            <Download className="w-4 h-4" />
            Export Reports
          </Button>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-6 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-medium mb-1">Revenue Overview</h2>
              <p className="text-sm text-gray-400">Monthly revenue breakdown</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">
                {formatCurrency(revenueData.total)}
              </span>
              <span className="text-sm text-[#00FFFF]">+{revenueData.growth}%</span>
            </div>
          </div>
          <Bar data={chartData} options={chartOptions} />
        </div>

        {/* GST Summary */}
        <div className="p-6 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A]">
          <h2 className="text-lg font-medium mb-6">GST Summary</h2>
          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-[#2A2A2A]">
              <p className="text-sm text-gray-400 mb-1">Total GST Collected</p>
              <p className="text-2xl font-bold">{formatCurrency(gstSummary.total)}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-[#2A2A2A]">
                <p className="text-sm text-gray-400 mb-1">CGST</p>
                <p className="text-lg font-medium">{formatCurrency(gstSummary.cgst)}</p>
              </div>
              <div className="p-4 rounded-lg bg-[#2A2A2A]">
                <p className="text-sm text-gray-400 mb-1">SGST</p>
                <p className="text-lg font-medium">{formatCurrency(gstSummary.sgst)}</p>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-r from-[#FF00FF]/10 to-[#FF00FF]/20 border border-[#FF00FF]/30">
              <p className="text-sm text-gray-400 mb-1">Pending GST</p>
              <p className="text-lg font-medium text-[#FF00FF]">
                {formatCurrency(gstSummary.pending)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Clients */}
      <div className="p-6 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A]">
        <h2 className="text-lg font-medium mb-6">Top Performing Clients</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topClients.map((client, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-[#2A2A2A] hover:bg-[#3A3A3A] transition-all duration-200"
            >
              <h3 className="font-medium mb-2">{client.name}</h3>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>Revenue</span>
                <span className="font-medium text-white">
                  {formatCurrency(client.revenue)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-400 mt-1">
                <span>Invoices</span>
                <span className="font-medium text-white">{client.invoices}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
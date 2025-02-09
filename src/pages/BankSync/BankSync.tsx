import React, { useState } from 'react';
import { DollarSign, Link2, ArrowRightLeft, Check, RefreshCw } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { formatCurrency } from '../../lib/utils';

const BankSync = () => {
  const [isConnecting, setIsConnecting] = useState(false);

  const bankAccounts = [
    {
      id: '1',
      bank: 'HDFC Bank',
      accountNumber: 'XXXX1234',
      balance: 250000,
      status: 'connected',
      lastSync: '2 minutes ago',
      logo: 'https://companieslogo.com/img/orig/HDB-bb6241fe.png?t=1720244492',
    },
    {
      id: '2',
      bank: 'ICICI Bank',
      accountNumber: 'XXXX5678',
      balance: 180000,
      status: 'connected',
      lastSync: '5 minutes ago',
      logo: 'https://companieslogo.com/img/orig/IBN-af38b5c0.png?t=1720244492',
    },
  ];

  const pendingReconciliations = [
    {
      id: '1',
      date: '2024-03-15',
      amount: 45000,
      description: 'Payment from Tech Solutions Ltd',
      matchConfidence: 95,
      suggestedInvoice: 'INV-2024-001',
    },
    {
      id: '2',
      date: '2024-03-14',
      amount: 28500,
      description: 'UPI/Digital Dynamics/MARCH',
      matchConfidence: 85,
      suggestedInvoice: 'INV-2024-002',
    },
  ];

  const reconciliationStats = {
    totalTransactions: 156,
    autoMatched: 142,
    pending: 14,
    accuracy: 98.5,
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Bank Sync & Reconciliation</h1>
          <p className="text-gray-400">AI-powered bank sync and payment matching</p>
        </div>
        <Button
          size="lg"
          className="gap-2"
          onClick={() => setIsConnecting(true)}
        >
          <Link2 className="w-5 h-5" />
          Connect New Account
        </Button>
      </div>

      {/* Connected Banks Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bankAccounts.map((account) => (
          <div
            key={account.id}
            className="p-6 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A] hover:border-[#00FFFF]/50 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {account.logo && (
                  <img src={account.logo} alt={`${account.bank} logo`} className="w-8 h-8" />
                )}
                <div>
                  <h3 className="font-medium">{account.bank}</h3>
                  <p className="text-sm text-gray-400">AC: {account.accountNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#00FFFF] animate-pulse" />
                <span className="text-sm text-[#00FFFF]">Connected</span>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-1">Current Balance</p>
              <h4 className="text-2xl font-bold">{formatCurrency(account.balance)}</h4>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Last synced {account.lastSync}</span>
              <Button variant="secondary" size="sm" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Sync Now
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Reconciliation Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-xl bg-gradient-to-r from-[#00FFFF]/10 to-[#FF00FF]/10 border border-[#2A2A2A]">
          <h3 className="text-sm text-gray-400 mb-2">Total Transactions</h3>
          <p className="text-2xl font-bold">{reconciliationStats.totalTransactions}</p>
        </div>
        <div className="p-6 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A]">
          <h3 className="text-sm text-gray-400 mb-2">Auto-Matched</h3>
          <p className="text-2xl font-bold text-[#00FFFF]">{reconciliationStats.autoMatched}</p>
        </div>
        <div className="p-6 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A]">
          <h3 className="text-sm text-gray-400 mb-2">Pending Matches</h3>
          <p className="text-2xl font-bold text-[#FF00FF]">{reconciliationStats.pending}</p>
        </div>
        <div className="p-6 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A]">
          <h3 className="text-sm text-gray-400 mb-2">AI Accuracy</h3>
          <p className="text-2xl font-bold">{reconciliationStats.accuracy}%</p>
        </div>
      </div>

      {/* Pending Reconciliations */}
      <div className="p-6 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A]">
        <h2 className="text-lg font-medium mb-6">Pending Reconciliations</h2>
        <div className="space-y-4">
          {pendingReconciliations.map((transaction) => (
            <div
              key={transaction.id}
              className="p-4 rounded-lg bg-[#2A2A2A] border border-[#3A3A3A] hover:border-[#00FFFF]/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-gray-400">{transaction.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(transaction.amount)}</p>
                  <div className="flex items-center gap-1 text-sm">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        transaction.matchConfidence > 90
                          ? 'bg-[#00FFFF]'
                          : 'bg-[#FF00FF]'
                      }`}
                    />
                    <span
                      className={
                        transaction.matchConfidence > 90
                          ? 'text-[#00FFFF]'
                          : 'text-[#FF00FF]'
                      }
                    >
                      {transaction.matchConfidence}% Match
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ArrowRightLeft className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">
                    Suggested: {transaction.suggestedInvoice}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="sm">
                    Review
                  </Button>
                  <Button size="sm" className="gap-2">
                    <Check className="w-4 h-4" />
                    Confirm Match
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bank Connection Modal */}
      {isConnecting && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="p-8 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A] max-w-lg w-full">
            <div className="text-center">
              <DollarSign className="w-16 h-16 text-[#00FFFF] mx-auto mb-6" />
              <h2 className="text-xl font-bold mb-4">Connect Your Bank Account</h2>
              <p className="text-gray-400 mb-6">
                Select your bank to establish a secure connection for automatic transaction sync
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  className="p-4 rounded-lg bg-[#2A2A2A] hover:bg-[#3A3A3A] border border-[#3A3A3A] hover:border-[#00FFFF] transition-all duration-200 flex items-center gap-2"
                >
                  <img src="https://companieslogo.com/img/orig/HDB-bb6241fe.png?t=1720244492" alt="HDFC Bank" className="w-6 h-6" />
                  <span>HDFC Bank</span>
                </button>
                <button
                  className="p-4 rounded-lg bg-[#2A2A2A] hover:bg-[#3A3A3A] border border-[#3A3A3A] hover:border-[#00FFFF] transition-all duration-200 flex items-center gap-2"
                >
                  <img src="https://companieslogo.com/img/orig/IBN-af38b5c0.png?t=1720244492" alt="ICICI Bank" className="w-6 h-6" />
                  <span>ICICI Bank</span>
                </button>
                <button
                  className="p-4 rounded-lg bg-[#2A2A2A] hover:bg-[#3A3A3A] border border-[#3A3A3A] hover:border-[#00FFFF] transition-all duration-200 flex items-center gap-2"
                >
                  <img src="https://companieslogo.com/img/orig/SBICARD.NS-41ef46ca.png?t=1720244493" alt="SBI" className="w-6 h-6" />
                  <span>SBI</span>
                </button>
                <button
                  className="p-4 rounded-lg bg-[#2A2A2A] hover:bg-[#3A3A3A] border border-[#3A3A3A] hover:border-[#00FFFF] transition-all duration-200 flex items-center gap-2"
                >
                  <img src="https://companieslogo.com/img/orig/AXISBANK.BO-8f59e95b.png?t=1720244490" alt="Axis Bank" className="w-6 h-6" />
                  <span>Axis Bank</span>
                </button>
              </div>
              <div className="flex justify-end gap-4">
                <Button
                  variant="secondary"
                  onClick={() => setIsConnecting(false)}
                >
                  Cancel
                </Button>
                <Button className="gap-2">
                  <Link2 className="w-4 h-4" />
                  Connect Securely
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankSync;
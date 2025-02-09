import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { AuthProvider, useAuth } from './context/AuthContext';

// Lazy load pages
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const InvoiceDetails = React.lazy(() => import('./pages/Invoices/InvoiceDetails'));
const Clients = React.lazy(() => import('./pages/Clients'));
const Reports = React.lazy(() => import('./pages/Reports'));
const Insights = React.lazy(() => import('./pages/Insights'));
const Settings = React.lazy(() => import('./pages/Settings'));
const Welcome = React.lazy(() => import('./pages/Welcome/Welcome'));
const Register = React.lazy(() => import('./pages/Register/Register'));
const TaxAdvisor = React.lazy(() => import('./pages/TaxAdvisor/TaxAdvisor'));
const BankSync = React.lazy(() => import('./pages/BankSync/BankSync'));
const Invoices = React.lazy(() => import('./pages/Invoices'));

function App() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-[#121212] text-white">
        <Sidebar />
        <Header />
        <main className="pl-64 pt-16 min-h-screen">
          <div className="container mx-auto p-6">
            <React.Suspense
              fallback={
                <div className="flex items-center justify-center min-h-[calc(100vh-6rem)]">
                  <div className="w-8 h-8 rounded-full border-2 border-[#00FFFF] border-t-transparent animate-spin" />
                </div>
              }
            >
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route
                  path="/invoiceDetails"
                  element={
                    <InvoiceDetails
                      isOpen={true}
                      onClose={() => {}}
                      invoice={{
                        id: '1',
                        invoiceNumber: 'INV-001',
                        customerId: '1',
                        items: [
                          {
                            id: '1',
                            description: 'Item 1',
                            quantity: 1,
                            rate: 100,
                            gstRate: 18,
                            amount: 118,
                          },
                        ],
                        subTotal: 100,
                        cgst: 9,
                        sgst: 9,
                        igst: 0,
                        total: 118,
                        createdAt: '2023-01-01',
                        dueDate: '2023-01-10',
                        status: 'pending',
                      }}
                      customerName="John Doe"
                    />
                  }
                />
                <Route path="/clients" element={<Clients />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/tax-advisor" element={<TaxAdvisor />} />
                <Route path="/bank-sync" element={<BankSync />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </React.Suspense>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default function RootApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
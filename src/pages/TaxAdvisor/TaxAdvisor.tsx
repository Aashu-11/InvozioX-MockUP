import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, TrendingUp, FileCheck, Brain } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { formatCurrency } from '../../lib/utils';

const TaxAdvisor = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisCompleted, setAnalysisCompleted] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAnalyzing) {
      timer = setTimeout(() => {
        setIsAnalyzing(false);
        setAnalysisCompleted(true);
        setTimeout(() => setAnalysisCompleted(false), 3000); // Show completion message for 3 seconds
      }, 5000); // Simulate analysis time of 5 seconds
    }
    return () => clearTimeout(timer);
  }, [isAnalyzing]);

  const gstErrors = [
    {
      severity: 'high',
      description: 'Incorrect GST rate (28%) applied on electronics invoice #INV-2024-001',
      suggestion: 'Change to 18% as per HSN code 8517',
      potentialImpact: '₹5,000 tax overpayment',
    },
    {
      severity: 'medium',
      description: 'Missing input tax credit from supplier invoice #SUP-2024-003',
      suggestion: 'Claim ITC worth ₹12,500 in next filing',
      potentialImpact: '₹12,500 tax saving',
    },
  ];

  const taxSavings = {
    monthly: 45000,
    yearly: 540000,
    opportunities: [
      {
        category: 'Input Tax Credit',
        amount: 25000,
        description: 'Unclaimed ITC from recent purchases',
      },
      {
        category: 'Rate Optimization',
        amount: 15000,
        description: 'Potential savings from correct HSN codes',
      },
      {
        category: 'Compliance Rewards',
        amount: 5000,
        description: 'Early filing benefits and refunds',
      },
    ],
  };

  const complianceScore = 92;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">AI Tax Advisor</h1>
          <p className="text-gray-400">Your intelligent tax optimization co-pilot</p>
        </div>
        <Button
          size="lg"
          icon={<Brain className="w-5 h-5" />}
          onClick={() => setIsAnalyzing(true)}
        >
          Analyze Tax Position
        </Button>
      </div>

      {/* Tax Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-gradient-to-r from-[#00FFFF]/10 to-[#FF00FF]/10 border border-[#2A2A2A]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-[#00FFFF]/20">
              <Shield className="w-6 h-6 text-[#00FFFF]" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Compliance Score</p>
              <h3 className="text-2xl font-bold">{complianceScore}%</h3>
            </div>
          </div>
          <div className="w-full h-2 rounded-full bg-[#2A2A2A] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00FFFF] to-[#FF00FF] transition-all duration-1000"
              style={{ width: `${complianceScore}%` }}
            />
          </div>
        </div>

        <div className="p-6 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-[#FF00FF]/20">
              <TrendingUp className="w-6 h-6 text-[#FF00FF]" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Monthly Tax Savings</p>
              <h3 className="text-2xl font-bold">{formatCurrency(taxSavings.monthly)}</h3>
            </div>
          </div>
          <p className="text-sm text-gray-400">
            Projected Yearly: {formatCurrency(taxSavings.yearly)}
          </p>
        </div>

        <div className="p-6 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-[#00FFFF]/20">
              <FileCheck className="w-6 h-6 text-[#00FFFF]" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Next Filing Due</p>
              <h3 className="text-lg font-medium">GSTR-1 (March 2024)</h3>
            </div>
          </div>
          <Button variant="secondary" size="sm" className="w-full">
            Start Auto-Filing
          </Button>
        </div>
      </div>

      {/* GST Error Detection */}
      <div className="p-6 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A]">
        <h2 className="text-lg font-medium mb-6">AI-Detected GST Issues</h2>
        <div className="space-y-4">
          {gstErrors.map((error, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-[#2A2A2A] border border-[#3A3A3A] hover:border-[#FF00FF]/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-[#FF00FF]/20">
                  <AlertTriangle className="w-5 h-5 text-[#FF00FF]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{error.description}</h3>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        error.severity === 'high'
                          ? 'bg-[#FF00FF]/10 text-[#FF00FF]'
                          : 'bg-[#00FFFF]/10 text-[#00FFFF]'
                      }`}
                    >
                      {error.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{error.suggestion}</p>
                  <p className="text-sm text-[#FF00FF]">Impact: {error.potentialImpact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tax Saving Opportunities */}
      <div className="p-6 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A]">
        <h2 className="text-lg font-medium mb-6">Tax Saving Radar</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {taxSavings.opportunities.map((opportunity, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-gradient-to-r from-[#00FFFF]/5 to-[#FF00FF]/5 border border-[#2A2A2A] hover:border-[#00FFFF]/50 transition-all duration-300"
            >
              <h3 className="font-medium text-[#00FFFF] mb-2">
                {opportunity.category}
              </h3>
              <p className="text-2xl font-bold mb-2">
                {formatCurrency(opportunity.amount)}
              </p>
              <p className="text-sm text-gray-400">{opportunity.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Analysis */}
      {isAnalyzing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="p-8 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A] max-w-lg w-full">
            <div className="text-center">
              <Brain className="w-16 h-16 text-[#00FFFF] mx-auto mb-6 animate-pulse" />
              <h2 className="text-xl font-bold mb-4">AI Tax Analysis in Progress</h2>
              <p className="text-gray-400 mb-6">
                Our AI is analyzing your transactions and tax positions...
              </p>
              <div className="w-full h-2 rounded-full bg-[#2A2A2A] overflow-hidden mb-4">
                <div className="h-full bg-gradient-to-r from-[#00FFFF] to-[#FF00FF] animate-pulse" />
              </div>
              <Button
                variant="secondary"
                onClick={() => setIsAnalyzing(false)}
              >
                Cancel Analysis
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Analysis Completed Message */}
      {analysisCompleted && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="p-8 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A] max-w-lg w-full">
            <div className="text-center">
              <Brain className="w-16 h-16 text-[#00FFFF] mx-auto mb-6" />
              <h2 className="text-xl font-bold mb-4">Analysis Completed Successfully</h2>
              <p className="text-gray-400 mb-6">
                Your tax analysis has been completed successfully.
              </p>
              <Button
                variant="secondary"
                onClick={() => setAnalysisCompleted(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaxAdvisor;
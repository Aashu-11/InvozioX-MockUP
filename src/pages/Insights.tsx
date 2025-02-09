import React from 'react';
import { Brain, TrendingUp, AlertTriangle, Lightbulb, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

const insights = [
  {
    type: 'revenue',
    title: 'Revenue Growth Potential',
    description: 'Based on current trends, increasing focus on Tech sector clients could boost revenue by 25%',
    action: 'View detailed analysis',
    severity: 'high',
  },
  {
    type: 'payment',
    title: 'Payment Pattern Analysis',
    description: 'Clients typically pay 3 days faster when invoices are sent before 10 AM',
    action: 'Optimize invoice timing',
    severity: 'medium',
  },
  {
    type: 'tax',
    title: 'Tax Optimization',
    description: 'Potential tax savings of ₹25,000 through better expense categorization',
    action: 'View recommendations',
    severity: 'high',
  },
];

const recommendations = [
  {
    title: 'Automate Follow-ups',
    description: 'Enable automated reminders for invoices approaching due dates',
    impact: 'Reduce late payments by 40%',
  },
  {
    title: 'Optimize Pricing',
    description: 'Current market analysis suggests room for 10% price adjustment',
    impact: 'Potential revenue increase of 15%',
  },
  {
    title: 'Client Segmentation',
    description: 'Group clients by industry for targeted service offerings',
    impact: 'Improve client retention by 25%',
  },
];

const Insights = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">AI Insights</h1>
          <p className="text-gray-400">AI-powered business intelligence and recommendations</p>
        </div>
        <Button size="lg" className="gap-2">
          <Brain className="w-5 h-5" />
          Generate New Insights
        </Button>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="p-6 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A] hover:border-[#00FFFF]/50 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-r from-[#00FFFF]/10 to-[#FF00FF]/10">
                {insight.type === 'revenue' ? (
                  <TrendingUp className="w-6 h-6 text-[#00FFFF]" />
                ) : insight.type === 'payment' ? (
                  <AlertTriangle className="w-6 h-6 text-[#FF00FF]" />
                ) : (
                  <Lightbulb className="w-6 h-6 text-[#00FFFF]" />
                )}
              </div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  insight.severity === 'high'
                    ? 'bg-[#FF00FF]/10 text-[#FF00FF]'
                    : 'bg-[#00FFFF]/10 text-[#00FFFF]'
                }`}
              >
                {insight.severity.toUpperCase()}
              </span>
            </div>
            <h3 className="text-lg font-medium mb-2">{insight.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{insight.description}</p>
            <button className="text-sm text-[#00FFFF] hover:text-[#FF00FF] transition-colors duration-200 flex items-center gap-1">
              {insight.action}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* AI Recommendations */}
      <div className="p-6 rounded-xl bg-[#1E1E1E] border border-[#2A2A2A]">
        <div className="flex items-center gap-2 mb-6">
          <Brain className="w-6 h-6 text-[#00FFFF]" />
          <h2 className="text-lg font-medium">Smart Recommendations</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-gradient-to-r from-[#00FFFF]/5 to-[#FF00FF]/5 border border-[#2A2A2A] hover:border-[#00FFFF]/50 transition-all duration-300"
            >
              <h3 className="font-medium text-[#00FFFF] mb-2">{rec.title}</h3>
              <p className="text-sm text-gray-400 mb-3">{rec.description}</p>
              <div className="flex items-center gap-2 text-sm text-[#FF00FF]">
                <TrendingUp className="w-4 h-4" />
                <span>{rec.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Analysis */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-[#00FFFF]/10 to-[#FF00FF]/10 border border-[#2A2A2A]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-medium mb-1">Real-time Business Analysis</h2>
            <p className="text-sm text-gray-400">
              AI is continuously analyzing your business data
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00FFFF] animate-pulse" />
            <span className="text-sm text-[#00FFFF]">Live</span>
          </div>
        </div>
        <div className="h-48 flex items-center justify-center">
          <div className="text-center">
            <Brain className="w-12 h-12 text-[#00FFFF] mx-auto mb-4 animate-pulse" />
            <p className="text-gray-400">
              Processing latest transactions and market data...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
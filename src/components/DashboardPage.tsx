import React, { useState } from 'react';
import Sidebar, { Portfolio } from '../elements/Sidebar';

// Icons
const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

// Types
interface Holding {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  change24h: number;
}

// Mock data
const mockPortfolios: Portfolio[] = [
  {
    id: '1',
    name: 'My Stocks',
    type: 'STOCKS',
    totalValue: 125430.50,
    totalGainLoss: 12543.25,
    totalGainLossPercent: 11.14,
    holdings: [
      {
        id: '1',
        symbol: 'AAPL',
        name: 'Apple Inc.',
        quantity: 50,
        purchasePrice: 150.00,
        currentPrice: 175.30,
        change24h: 2.1
      },
      {
        id: '2',
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        quantity: 25,
        purchasePrice: 2800.00,
        currentPrice: 2950.75,
        change24h: -0.8
      },
      {
        id: '3',
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        quantity: 75,
        purchasePrice: 310.00,
        currentPrice: 335.60,
        change24h: 1.5
      },
      {
        id: '4',
        symbol: 'TSLA',
        name: 'Tesla Inc.',
        quantity: 30,
        purchasePrice: 220.00,
        currentPrice: 195.40,
        change24h: -3.2
      }
    ]
  },
  {
    id: '2',
    name: 'My Crypto',
    type: 'CRYPTO',
    totalValue: 45230.80,
    totalGainLoss: -5420.15,
    totalGainLossPercent: -10.69,
    holdings: [
      {
        id: '5',
        symbol: 'BTC',
        name: 'Bitcoin',
        quantity: 1.2,
        purchasePrice: 45000.00,
        currentPrice: 43250.50,
        change24h: -2.3
      },
      {
        id: '6',
        symbol: 'ETH',
        name: 'Ethereum',
        quantity: 15,
        purchasePrice: 3200.00,
        currentPrice: 2890.75,
        change24h: -1.8
      },
      {
        id: '7',
        symbol: 'SOL',
        name: 'Solana',
        quantity: 100,
        purchasePrice: 95.00,
        currentPrice: 88.30,
        change24h: -4.1
      },
      {
        id: '8',
        symbol: 'ADA',
        name: 'Cardano',
        quantity: 5000,
        purchasePrice: 0.85,
        currentPrice: 0.72,
        change24h: -2.9
      }
    ]
  }
];

// Simple Pie Chart Component
const PieChart: React.FC<{ holdings: Holding[] }> = ({ holdings }) => {
  const totalValue = holdings.reduce((sum, holding) => sum + (holding.quantity * holding.currentPrice), 0);
  
  let cumulativePercentage = 0;
  const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];
  
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <svg width="200" height="200" className="transform -rotate-90">
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="4"
          />
          {holdings.map((holding, index) => {
            const percentage = (holding.quantity * holding.currentPrice) / totalValue * 100;
            const strokeDasharray = `${percentage * 5.03} ${502 - percentage * 5.03}`;
            const strokeDashoffset = -cumulativePercentage * 5.03;
            cumulativePercentage += percentage;
            
            return (
              <circle
                key={holding.id}
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke={colors[index % colors.length]}
                strokeWidth="8"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              ${totalValue.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Total Value</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard: React.FC = () => {
  const [activePortfolio, setActivePortfolio] = useState<Portfolio>(mockPortfolios[0]);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPercent = (percent: number) => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          portfolios={mockPortfolios}
          activePortfolio={activePortfolio}
          onPortfolioChange={setActivePortfolio}
        //   expanded={sidebarExpanded}
        //   onToggle={() => setSidebarExpanded(!sidebarExpanded)}
        />

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarExpanded(!sidebarExpanded)}
            className="lg:hidden mb-4 p-2 rounded-lg bg-white shadow-sm border hover:bg-gray-50"
          >
            <MenuIcon />
          </button>
          
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">{activePortfolio.name}</h2>
            <p className="text-gray-600">{activePortfolio.type} Portfolio</p>
          </div>

          {/* Portfolio Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Total Value</h3>
              <p className="text-3xl font-bold text-gray-900">
                {formatCurrency(activePortfolio.totalValue)}
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Total Gain/Loss</h3>
              <p className={`text-3xl font-bold ${
                activePortfolio.totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {formatCurrency(activePortfolio.totalGainLoss)}
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Return</h3>
              <p className={`text-3xl font-bold ${
                activePortfolio.totalGainLossPercent >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {formatPercent(activePortfolio.totalGainLossPercent)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Portfolio Distribution Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Portfolio Distribution</h3>
              <div className="flex flex-col lg:flex-row items-center">
                <PieChart holdings={activePortfolio.holdings} />
                <div className="ml-6 space-y-3 mt-6 lg:mt-0">
                  {activePortfolio.holdings.map((holding, index) => {
                    const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];
                    const totalValue = activePortfolio.holdings.reduce((sum, h) => sum + (h.quantity * h.currentPrice), 0);
                    const percentage = ((holding.quantity * holding.currentPrice) / totalValue * 100);
                    
                    return (
                      <div key={holding.id} className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full mr-3"
                          style={{ backgroundColor: colors[index % colors.length] }}
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium">{holding.symbol}</div>
                          <div className="text-xs text-gray-500">{percentage.toFixed(1)}%</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Holdings Table */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Holdings</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Symbol</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Qty</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Price</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">24h %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activePortfolio.holdings.map((holding) => {
                      const totalValue = holding.quantity * holding.currentPrice;
                      const gainLoss = totalValue - (holding.quantity * holding.purchasePrice);
                      const gainLossPercent = (gainLoss / (holding.quantity * holding.purchasePrice)) * 100;
                      
                      return (
                        <tr key={holding.id} className="border-b border-gray-100">
                          <td className="py-3 px-2">
                            <div>
                              <div className="font-medium text-gray-900">{holding.symbol}</div>
                              <div className="text-sm text-gray-500 truncate">{holding.name}</div>
                            </div>
                          </td>
                          <td className="py-3 px-2 text-sm text-gray-900">
                            {holding.quantity}
                          </td>
                          <td className="py-3 px-2">
                            <div className="text-sm text-gray-900">{formatCurrency(holding.currentPrice)}</div>
                            <div className={`text-xs ${gainLossPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {formatPercent(gainLossPercent)}
                            </div>
                          </td>
                          <td className="py-3 px-2">
                            <span className={`text-sm font-medium ${
                              holding.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {formatPercent(holding.change24h)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Detailed Holdings Cards */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Detailed Holdings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activePortfolio.holdings.map((holding) => {
                const totalValue = holding.quantity * holding.currentPrice;
                const gainLoss = totalValue - (holding.quantity * holding.purchasePrice);
                const gainLossPercent = (gainLoss / (holding.quantity * holding.purchasePrice)) * 100;
                
                return (
                  <div key={holding.id} className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{holding.symbol}</h4>
                        <p className="text-sm text-gray-500">{holding.name}</p>
                      </div>
                      <div className={`text-sm font-medium px-2 py-1 rounded ${
                        holding.change24h >= 0 
                          ? 'text-green-700 bg-green-100' 
                          : 'text-red-700 bg-red-100'
                      }`}>
                        {formatPercent(holding.change24h)}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Quantity:</span>
                        <span className="text-sm font-medium">{holding.quantity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Current Price:</span>
                        <span className="text-sm font-medium">{formatCurrency(holding.currentPrice)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Total Value:</span>
                        <span className="text-sm font-bold">{formatCurrency(totalValue)}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-sm text-gray-500">Gain/Loss:</span>
                        <div className="text-right">
                          <div className={`text-sm font-medium ${
                            gainLoss >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {formatCurrency(gainLoss)}
                          </div>
                          <div className={`text-xs ${
                            gainLossPercent >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {formatPercent(gainLossPercent)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
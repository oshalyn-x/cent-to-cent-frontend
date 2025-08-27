import React, { useState } from 'react';
import { useAuth } from '../providers/AuthContext';
import { useNavigate } from 'react-router-dom';
import {ChevronDownIcon, SettingsIcon, EventsIcon, LogoutIcon, UserIcon} from '../assets/Icons';

// Types
export interface Portfolio {
  id: string;
  name: string;
  type: 'STOCKS' | 'CRYPTO' | 'CUSTOM';
  totalValue: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  holdings: any[];
}

export interface SidebarProps {
  portfolios: Portfolio[];
  activePortfolio: Portfolio;
  onPortfolioChange: (portfolio: Portfolio) => void;
}

// Mock events
const mockEvents = [
  { id: '1', title: 'Apple Earnings Report', date: '2025-01-30', type: 'earnings' },
  { id: '2', title: 'Fed Meeting', date: '2025-02-01', type: 'economic' },
  { id: '3', title: 'Tesla Stock Split', date: '2025-02-05', type: 'corporate' },
];

const Sidebar: React.FC<SidebarProps> = ({
  portfolios,
  activePortfolio,
  onPortfolioChange,
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    navigate('/login');
  };

  // Get initials from name
  const getInitials = (name: string) => {
    return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase();
  };


  return (
    <div className='w-64 h-full bg-white shadow-lg h-screen transition-all duration-300 ease-in-out relative overflow-hidden'>
      {/* Sidebar Toggle */}

      <div className="p-6">
        {/* Logo/Title */}
        <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Portfolio Tracker</h1>
        </div>

        {/* Profile Section */}
        <div className="mb-8 relative">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className='w-full flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors space-x-3'
          >
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
              {getInitials(user.name)}
            </div>
              <>
                <div className="flex-1 text-left min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{user.name}</div>
                </div>
                <div className={`transform transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`}>
                  <ChevronDownIcon />
                </div>
              </>
          </button>
          
          {/* Profile Dropdown */}
          {profileDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-40">
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <UserIcon />
                <span>Profile</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogoutIcon />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>


        {/* Navigation */}
        <nav className="space-y-6">
          {/* Portfolios Section */}
          <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Portfolios
              </h3>
            <div className="space-y-2">
              {portfolios.map((portfolio) => (
                <button
                  key={portfolio.id}
                  onClick={() => onPortfolioChange(portfolio)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    activePortfolio.id === portfolio.id
                      ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500'
                      : 'text-gray-600 hover:bg-gray-100'
                  } 'flex justify-center'`}
                  title={portfolio.name}
                >
                    <div className="min-w-0">
                      <div className="font-medium truncate">{portfolio.name}</div>
                      <div className="text-sm opacity-75">{portfolio.type}</div>
                      <div className="text-sm font-medium">
                        {formatCurrency(portfolio.totalValue)}
                      </div>
                    </div>
                </button>
              ))}
            </div>
          </div>

          {/* Settings Section */}
          <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Tools
              </h3>
            <div className="space-y-2">
              <button
                onClick={() => alert('Settings clicked!')}
                className='w-full flex items-center p-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors space-x-3'
                title='Settings'
              >
                <SettingsIcon />
                <span>Settings</span>
              </button>
              
              <button
                onClick={() => alert('Events clicked!')}
                className='w-full flex items-center p-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors relative space-x-3'
                title='Events'
              >
                <EventsIcon/>
                <span>Events</span>
                {/* Event notification badge */}
                {/* <div className='w-4 h-4 bg-red-500 rounded-full -top-1'>5</div> */}
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full -top-1">20</div>
              </button>
            </div>
          </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Upcoming Events
              </h3>
              <div className="space-y-2">
                {mockEvents.slice(0, 2).map((event) => (
                  <div key={event.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {event.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className={`text-xs mt-1 px-2 py-1 rounded-full inline-block ${
                      event.type === 'earnings' ? 'bg-green-100 text-green-700' :
                      event.type === 'economic' ? 'bg-blue-100 text-blue-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {event.type}
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
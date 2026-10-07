import React from 'react';
import { Search, Bell, HelpCircle, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header = () => {
  const { searchQuery, setSearchQuery } = useApp();

  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <header className="top-header no-print">
      <div className="header-search">
        <Search size={18} className="text-slate-400" />
        <input
          type="text"
          placeholder="Search clients, quotations, invoices..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="header-right">
        <div className="header-date">
          <Calendar size={15} />
          <span>{formattedDate}</span>
        </div>

        <button className="icon-button" title="Notifications">
          <Bell size={18} />
        </button>

        <button className="icon-button" title="Help">
          <HelpCircle size={18} />
        </button>

        <div className="user-avatar" title="Administrator">
          A
        </div>
      </div>
    </header>
  );
};

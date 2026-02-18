import React, { useState } from 'react';
import { Home, Wallet, Settings, LogOut ,  CreditCard, 
  Landmark, } from 'lucide-react';

import { useNavigate ,useLocation} from "react-router-dom";
const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activeItem, setActiveItem] = useState('dashboard');
  const navigate = useNavigate();
  const location = useLocation();

 const menuItems = [
  {  icon: Home, label: 'Dashboard',path: "/student-dashboard"  },
  { icon: Wallet, label: 'My Wallet', path: "/wallet" },
  {  icon: CreditCard, label: 'EMI', path: "/emi" },
  {  icon: Landmark, label: 'Loan', path: "/loan-request" },
  {  icon: Settings, label: 'Settings', path: "/settings" },
];

  const MenuItem = ({ item, isActive, onClick }) => {
    const Icon = item.icon;
    
    return (
      <button
        onClick={() => {
          onClick(item.id)
          navigate(item.path);
        }}
        className={`w-full flex items-center p-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
          isActive
            ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-400/30 shadow-lg shadow-blue-500/20'
            : 'text-white/70 hover:text-white hover:bg-white/10'
        }`}
      >
        <Icon
          className={`w-5 h-5 flex-shrink-0 ${
            isActive ? 'text-blue-400' : 'text-white/70 group-hover:text-white'
          } transition-colors duration-300`}
        />
        {!isCollapsed && (
          <span className="ml-3 font-medium text-sm">{item.label}</span>
        )}
      </button>
    );
  };

  return (
    <div
      className="fixed top-0 left-0 h-screen z-50"
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <div
        className={`h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 relative overflow-hidden 
        transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-24' : 'w-72'
        }`}
      >
        {/* Header */}
        {!isCollapsed && (
          <div className="p-4 border-b border-white/10 mb-2">
            <h1 className="text-xl font-bold text-white">PayLink</h1>
            <p className="text-white/60 text-sm">Person to Person</p>
          </div>
        )}

        {/* Menu */}
        <div className="px-2 py-4 space-y-2">
          {menuItems.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              // isActive={activeItem === item.id}
               isActive={location.pathname === item.path}
              onClick={setActiveItem}
            />
          ))}
        </div>

        {/* Logout */}
        <div className="absolute bottom-6 left-0 w-full px-4">
          <button className="w-full flex items-center p-3 rounded-xl transition-all duration-300 group text-red-400 hover:text-red-300 hover:bg-red-500/10">
            <LogOut className="w-6 h-6 flex-shrink-0" />
            {!isCollapsed && (
              <span className="ml-3 font-medium text-sm">Logout</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

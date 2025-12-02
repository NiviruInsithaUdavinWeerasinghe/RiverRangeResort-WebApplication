import React from "react";
import { 
  LayoutDashboard, CalendarCheck, Home, Users, Wallet, BarChart, Star, Menu, ChevronLeft, 
  User, Settings 
} from 'lucide-react';
import { useNavigate } from "react-router-dom"; 

export default function Sidebar({ isCollapsed, onToggle, currentPage, setCurrentPage }) {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={22} /> },
    { name: "Bookings", path: "/bookings", icon: <CalendarCheck size={22} /> },
    { name: "Villas", path: "/villas", icon: <Home size={22} /> },
    { name: "Guests", path: "/guests", icon: <Users size={22} /> },
    { name: "Payments", path: "/payments", icon: <Wallet size={22} /> },
    { name: "Reports", path: "/reports", icon: <BarChart size={22} /> },
    { name: "Exclusive Pass", path: "/exclusive-pass", icon: <Star size={22} /> },
  ];

  // New items for the bottom of the sidebar
  const bottomMenuItems = [
    { name: "Account", path: "/account", icon: <User size={22} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={22} /> },
  ];

  const sidebarClass = `fixed top-0 left-0 h-screen z-40 bg-slate-900/90 backdrop-blur-md border-r border-slate-700/50 shadow-2xl transition-all duration-350 ease-in-out flex flex-col items-center py-4`;
  const widthClass = isCollapsed ? 'w-20' : 'w-60';

  const collapseBtnClass = `w-10 h-10 mb-2 flex items-center justify-center rounded-full bg-slate-800/70 text-amber-400 cursor-pointer border border-amber-400/50 hover:bg-amber-400/20 hover:scale-105 transition duration-300`;

  const menuItemBaseClass = 'flex items-center w-[90%] p-3 rounded-xl transition-all duration-200 cursor-pointer';
  const menuItemExpandedClass = 'justify-start gap-4';
  const menuItemCollapsedClass = 'justify-center';

  // Function to render a single menu item
  const renderMenuItem = (item) => {
    const isActive = currentPage === item.path;
    const activeClass = 'bg-amber-400/20 text-white shadow-lg shadow-amber-900/30 font-semibold';
    const inactiveClass = 'text-slate-300 hover:bg-slate-700/50 hover:text-white';

    return (
      <button
        key={item.name}
        onClick={() => {
          // Note: Paths like /account and /settings are not routed in App.jsx,
          // but the state change still works for active styling.
          navigate(item.path);
          setCurrentPage(item.path);
        }}
        className={`${menuItemBaseClass} ${isCollapsed ? menuItemCollapsedClass : menuItemExpandedClass} ${isActive ? activeClass : inactiveClass}`}
      >
        <span className={`flex-shrink-0 ${isActive ? 'text-amber-400' : 'text-slate-400'}`}>
          {item.icon}
        </span>
        {!isCollapsed && <span className="text-sm truncate">{item.name}</span>}
      </button>
    );
  };

  return (
    <div className={`${sidebarClass} ${widthClass}`}>
      {/* TOP: Collapse Button */}
      <div 
        className={collapseBtnClass} 
        onClick={onToggle}
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
      </div>

      {/* Separator line */}
      <div className="w-[80%] border-t border-slate-700 my-4"></div>

      {/* MIDDLE: Main Menu items */}
      <nav className="flex flex-col w-full px-2 space-y-2">
        {menuItems.map(renderMenuItem)}
      </nav>

      {/* SPACER: Takes up remaining space to push the next elements to the bottom */}
      <div className="flex-grow"></div>

      {/* BOTTOM: Separator and Account/Settings Menu */}
      <div className="w-[80%] border-t border-slate-700 mt-4 mb-2"></div>
      
      <nav className="flex flex-col w-full px-2 space-y-2 mb-4">
        {bottomMenuItems.map(renderMenuItem)}
      </nav>
    </div>
  );
}
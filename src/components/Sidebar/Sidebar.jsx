import React from "react";
import {
  LayoutDashboard, CalendarCheck, Home, Users, Wallet, BarChart, Star, Menu, ChevronLeft,
  User, Settings
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ isCollapsed, onToggle, currentPage, setCurrentPage, isDarkMode }) {
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

  const bottomMenuItems = [
    { name: "Account", path: "/account", icon: <User size={22} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={22} /> },
  ];

  // Dynamic Styles based on isDarkMode prop
  const bgClass = isDarkMode 
    ? "bg-slate-900/90 border-slate-700/50 shadow-2xl" 
    : "bg-white border-slate-200 shadow-lg";

  const sidebarClass = `fixed top-0 left-0 h-screen z-40 ${bgClass}
                        backdrop-blur-md border-r transition-all duration-350
                        flex flex-col items-center py-4`;

  const widthClass = isCollapsed ? "w-20" : "w-60";

  const collapseBtnColors = isDarkMode
    ? "bg-slate-800/70 text-amber-400 border-amber-400/50 hover:bg-amber-400/20"
    : "bg-slate-200 text-amber-600 border-slate-300 hover:bg-amber-100";

  const collapseBtnClass = `w-10 h-10 mb-2 flex items-center justify-center rounded-full cursor-pointer transition duration-300
                            border-2 hover:scale-105 ${collapseBtnColors}`; // BORDER WIDTH INCREASED TO 'border-2'

  const menuItemBaseClass = "flex items-center w-[90%] p-3 rounded-xl transition-all duration-200 cursor-pointer";
  const menuItemExpandedClass = "justify-start gap-4";
  const menuItemCollapsedClass = "justify-center";

  const renderMenuItem = (item) => {
    const isActive = currentPage === item.path;
    
    // Explicitly defining active/inactive states based on Dark Mode
    const activeClass = isDarkMode
      ? "bg-amber-400/20 text-white shadow-amber-900/30"
      : "bg-amber-200/70 text-gray-900 shadow-md shadow-amber-900/10 font-semibold";

    const inactiveClass = isDarkMode
      ? "text-slate-300 hover:bg-slate-700/50 hover:text-white"
      : "text-gray-600 hover:bg-slate-200/50 hover:text-gray-900";

    const activeIconClass = isDarkMode ? "text-amber-400" : "text-amber-600";
    const inactiveIconClass = isDarkMode ? "text-slate-400" : "text-gray-500";

    return (
      <button
        key={item.name}
        onClick={() => {
          navigate(item.path);
          setCurrentPage(item.path);
        }}
        className={`${menuItemBaseClass} ${isCollapsed ? menuItemCollapsedClass : menuItemExpandedClass} ${isActive ? activeClass : inactiveClass}`}
      >
        <span className={`flex-shrink-0 ${isActive ? activeIconClass : inactiveIconClass}`}>
          {item.icon}
        </span>
        {!isCollapsed && <span className="text-sm truncate">{item.name}</span>}
      </button>
    );
  };

  const dividerClass = isDarkMode ? "border-slate-700" : "border-slate-300";

  return (
    <div className={`${sidebarClass} ${widthClass}`}>
      <div className={collapseBtnClass} onClick={onToggle} title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}>
        {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
      </div>

      <div className={`w-[80%] border-t ${dividerClass} my-4`}></div>

      <nav className="flex flex-col w-full px-2 space-y-2">
        {menuItems.map(renderMenuItem)}
      </nav>

      <div className="flex-grow"></div>

      <div className={`w-[80%] border-t ${dividerClass} mt-4 mb-2`}></div>
      <nav className="flex flex-col w-full px-2 space-y-2 mb-4">
        {bottomMenuItems.map(renderMenuItem)}
      </nav>
    </div>
  );
}
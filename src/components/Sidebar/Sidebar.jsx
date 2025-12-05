import React, { useEffect, useState } from "react";
import {
  LayoutDashboard, CalendarCheck, Home, Users, Wallet, BarChart, Star, Menu, ChevronLeft,
  User, Settings
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ isCollapsed, onToggle, currentPage, setCurrentPage, isDarkMode }) {
  const navigate = useNavigate();

  // NEW STATE: keeps icons left until animation finishes
  const [isFullyCollapsed, setIsFullyCollapsed] = useState(isCollapsed);

  useEffect(() => {
    if (isCollapsed) {
      const timer = setTimeout(() => setIsFullyCollapsed(true), 500); // animation duration
      return () => clearTimeout(timer);
    } else {
      setIsFullyCollapsed(false);
    }
  }, [isCollapsed]);

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={22} /> },
    { name: "Bookings", path: "/bookings", icon: <CalendarCheck size={22} /> },
    { name: "Villas", path: "/villas", icon: <Home size={22} /> },
    { name: "Customers", path: "/customers", icon: <Users size={22} /> },
    { name: "Payments", path: "/payments", icon: <Wallet size={22} /> },
    { name: "Reports", path: "/reports", icon: <BarChart size={22} /> },
    { name: "Exclusive Pass", path: "/exclusive-pass", icon: <Star size={22} /> },
  ];

  const bottomMenuItems = [
    { name: "Account", path: "/account", icon: <User size={22} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={22} /> },
  ];

  const bgClass = isDarkMode
    ? "bg-slate-900/90 border-slate-700/50 shadow-2xl transition-all duration-[500ms]"
    : "bg-white border-slate-200 shadow-lg transition-all duration-[500ms]";

  const sidebarClass = `fixed top-0 left-0 h-screen z-40 ${bgClass}
                        backdrop-blur-md border-r transition-all duration-[500ms]
                        flex flex-col items-center py-4`;

  const widthClass = isCollapsed ? "w-20" : "w-60";

  const collapseBtnColors = isDarkMode
    ? "bg-slate-800/70 text-amber-400 border-amber-400/50 hover:bg-amber-400/20 transition-all duration-[500ms]"
    : "bg-slate-200 text-amber-600 border-slate-300 hover:bg-amber-100 transition-all duration-[500ms]";

  const collapseBtnClass = `w-10 h-10 mb-2 flex items-center justify-center rounded-full cursor-pointer transition-all duration-[500ms]
                            border-2 hover:scale-105 ${collapseBtnColors}`;

  const menuItemBaseClass = "flex items-center w-[90%] p-3 rounded-xl transition-all duration-[500ms] cursor-pointer";

  const renderMenuItem = (item) => {
    const isActive = currentPage === item.path;

    const activeClass = isDarkMode
      ? "bg-amber-400/20 text-white shadow-amber-900/30 transition-all duration-[500ms]"
      : "bg-amber-200/70 text-gray-900 shadow-md shadow-amber-900/10 font-semibold transition-all duration-[500ms]";

    const inactiveClass = isDarkMode
      ? "text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all duration-[500ms]"
      : "text-gray-600 hover:bg-slate-200/50 hover:text-gray-900 transition-all duration-[500ms]";

    const iconClass = isActive
      ? isDarkMode ? "text-amber-400 transition-all duration-[500ms]" : "text-amber-600 transition-all duration-[500ms]"
      : isDarkMode ? "text-slate-400 transition-all duration-[500ms]" : "text-gray-500 transition-all duration-[500ms]";

    return (
      <button
        key={item.name}
        onClick={() => {
          navigate(item.path);
          setCurrentPage(item.path);
        }}
        className={`${menuItemBaseClass} ${isActive ? activeClass : inactiveClass}`}
        style={{
          justifyContent: isFullyCollapsed ? "center" : "flex-start",
          gap: isFullyCollapsed ? 0 : "1rem",
        }}
      >
        <span className={iconClass}>{item.icon}</span>

        <span
          className="overflow-hidden whitespace-nowrap transition-all duration-[500ms]"
          style={{
            maxWidth: isCollapsed ? 0 : 150,
            opacity: isCollapsed ? 0 : 1,
            transform: isCollapsed ? "scale(0.8)" : "scale(1)",
          }}
        >
          {item.name}
        </span>
      </button>
    );
  };

  const dividerClass = isDarkMode
    ? "border-slate-700 transition-all duration-[500ms]"
    : "border-slate-300 transition-all duration-[500ms]";

  return (
    <div className={`${sidebarClass} ${widthClass}`}>
      <div
        className={collapseBtnClass}
        onClick={onToggle}
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
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

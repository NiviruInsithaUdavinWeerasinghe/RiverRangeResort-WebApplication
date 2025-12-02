import React from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header({ isCollapsed, isDarkMode, handleThemeToggle }) {
  const leftPosition = isCollapsed ? "80px" : "240px";
  const headerWidth = isCollapsed ? "calc(100% - 80px)" : "calc(100% - 240px)";

  // Dynamic Header Styles
  const bgClass = isDarkMode
    ? "bg-slate-900/90 border-slate-700/50 shadow-xl"
    : "bg-white/95 border-slate-200 shadow-md";

  const headerBaseClass = `fixed top-0 z-30 h-[70px] flex items-center justify-between px-6
                           backdrop-blur-md border-b transition-all duration-350 ${bgClass}`;

  const titleClass = `text-xl font-semibold tracking-wider ${isDarkMode ? "text-slate-50" : "text-gray-800"}`;
  const accentClass = `font-bold ${isDarkMode ? "text-amber-400" : "text-amber-600"}`;

  const loginBtnStyles = isDarkMode
    ? "text-white border-amber-400 hover:bg-amber-400/15 hover:border-slate-50"
    : "text-gray-700 border-amber-500 hover:bg-amber-100/70 hover:border-amber-700";

  const loginBtnClass = `px-4 py-1 text-sm font-medium rounded-lg cursor-pointer transition duration-300 border ${loginBtnStyles}`;

  const themeToggleStyles = isDarkMode
    ? "text-amber-400 hover:bg-amber-400/10 hover:text-white"
    : "text-amber-600 hover:bg-amber-100/50";

  const themeToggleClass = `p-2 mr-4 rounded-full cursor-pointer transition duration-300 flex items-center justify-center ${themeToggleStyles}`;

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: isDarkMode ? 360 : -360 },
    visible: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0, scale: 0.5, rotate: isDarkMode ? -360 : 360 },
  };

  const AnimatedIcon = motion((props) => (isDarkMode ? <Moon {...props} /> : <Sun {...props} />));

  return (
    <header
      className={headerBaseClass}
      style={{
        left: leftPosition,
        width: headerWidth,
        transition: "all 0.35s cubic-bezier(0.4,0,0.2,1), width 0.35s cubic-bezier(0.4,0,0.2,1)", 
      }}
    >
      <h1 className={titleClass}>
        River Range Resort! <span className={accentClass}>Admin</span>
      </h1>

      <div className="flex items-center">
        <button
  className={themeToggleClass + " z-50"} // Ensure button is on top
  onClick={handleThemeToggle}
  aria-label="Toggle theme"
  title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
>

          <AnimatePresence mode="wait" initial={false}>
            <AnimatedIcon
              key={isDarkMode ? "moon" : "sun"}
              size={20}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={iconVariants}
              transition={{ duration: 0.4 }}
            />
          </AnimatePresence>
        </button>

        <button className={loginBtnClass}>LOGIN</button>
      </div>
    </header>
  );
}
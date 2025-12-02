import React, { useState } from "react";
import { Sun, Moon } from 'lucide-react';
// Import motion and AnimatePresence for icon animation
import { motion, AnimatePresence } from 'framer-motion';

export default function Header({ isCollapsed }) {
  // State to track if dark mode is active (false = light mode, true = dark mode)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Determine left position and width based on sidebar state (240px wide or 80px collapsed)
  const leftPosition = isCollapsed ? '80px' : '240px';
  const headerWidth = isCollapsed ? 'calc(100% - 80px)' : 'calc(100% - 240px)';

  // Tailwind classes for styling (dark slate/blue with amber accent)
  const headerBaseClass = `fixed top-0 z-30 h-[70px] flex items-center justify-between px-6 
                          bg-slate-900/90 backdrop-blur-md border-b border-slate-700/50 shadow-xl`;

  const titleClass = 'text-xl font-semibold text-slate-50 tracking-wider text-shadow-md';
  const accentClass = 'text-amber-400 font-bold';

  const loginBtnClass = `px-4 py-1 text-sm font-medium text-white rounded-lg cursor-pointer transition duration-300
                         border border-amber-400 hover:bg-amber-400/15 hover:border-slate-50`;

  // Class for the icon button, giving it some margin on the right.
  // Removed 'relative overflow-hidden'
  const themeToggleClass = `p-2 mr-4 text-amber-400 rounded-full cursor-pointer transition duration-300 
                            hover:bg-amber-400/10 hover:text-white flex items-center justify-center`; // Added flex centering

  const handleThemeToggle = () => {
    // Toggle the state for demonstration purposes
    setIsDarkMode(prev => !prev);
    // In a full application, you would apply the 'dark' class to the <html> tag here.
    console.log(`Theme toggled to: ${!isDarkMode ? 'Dark' : 'Light'}`);
  };
  
  // Framer Motion variants for icon animation
  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: isDarkMode ? 360 : -360 }, // Rotate based on current mode for smoother transition
    visible: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0, scale: 0.5, rotate: isDarkMode ? -360 : 360 },
  };
  
  // Motion component wrapper for the icon
  const AnimatedIcon = motion((props) => isDarkMode ? <Moon {...props} /> : <Sun {...props} />);

  return (
    <header
      className={headerBaseClass}
      style={{
        left: leftPosition,
        width: headerWidth,
        transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      <h1 className={titleClass}>
        River Range Resort <span className={accentClass}>Admin</span>
      </h1>

      <div className="flex items-center">
        {/* Theme Toggle Button (positioned left of LOGIN button) */}
        <button
          className={themeToggleClass}
          onClick={handleThemeToggle}
          aria-label="Toggle theme"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {/* Use AnimatePresence to manage the exit and entry animation of the icons */}
          <AnimatePresence mode="wait" initial={false}>
            <AnimatedIcon
              key={isDarkMode ? "moon" : "sun"} // Key is crucial for AnimatePresence to track changes
              size={20}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={iconVariants}
              transition={{ duration: 0.4 }} // Animation duration
              // REMOVED: className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
            />
          </AnimatePresence>
          {/* REMOVED: Spacer div */}
        </button>

        <button className={loginBtnClass}>
          LOGIN
        </button>
      </div>
    </header>
  );
}
// App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
// 1. Import motion and AnimatePresence for smooth transitions
import { motion, AnimatePresence } from "framer-motion";

// Layout components
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Header from "./components/Header/Header.jsx";

// Pages
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Bookings from "./pages/Bookings/Bookings.jsx";
import Villas from "./pages/Villas/Villas.jsx";
import Customers from "./pages/Customers/Customers.jsx";
import Payments from "./pages/Payments/Payments.jsx";
import Reports from "./pages/Reports/Reports.jsx";
import ExclusivePassManagement from "./pages/ExclusivePass/ExclusivePassManagement.jsx";
import Account from "./pages/Account/Account.jsx";
import Settings from "./pages/Settings/Settings.jsx";

// Import LoginModal
import LoginModal from "./components/Modals/LoginModal.jsx"; // Adjust path if needed

const usePageTracking = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(location.pathname);

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  return { currentPage, setCurrentPage };
};

// Define transition variants
const pageVariants = {
  initial: { opacity: 0, x: 20 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -20 },
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.35, // Adjusted for a quick, smooth feel
};

function AppContent() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Add modal state
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const handleLoginOpen = () => setIsLoginOpen(true);
  const handleLoginClose = () => setIsLoginOpen(false);

  const { currentPage, setCurrentPage } = usePageTracking();
  const location = useLocation(); // Get location object for AnimatePresence

  const handleToggleSidebar = () => setIsCollapsed((prev) => !prev);
  const handleThemeToggle = () => setIsDarkMode((prev) => !prev);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDarkMode]);

  return (
    <div
      className={`flex min-h-screen transition-colors duration-500
        ${
        isDarkMode ? "bg-slate-900 text-slate-300" : "bg-white text-gray-800"
      }`}
    >
      <Sidebar
        isCollapsed={isCollapsed}
        onToggle={handleToggleSidebar}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isDarkMode={isDarkMode}
      />

      <div
        style={{
          marginLeft: isCollapsed ? "80px" : "240px",
          width: "100%",
          transition: "margin-left 0.50s cubic-bezier(0.4,0,0.2,1)",
        }}
        // 2. Added min-h-screen to ensure this container is also full height, pushing content down
        className="min-h-screen"
      >
        <Header
          isCollapsed={isCollapsed}
          isDarkMode={isDarkMode}
          handleThemeToggle={handleThemeToggle}
          handleLoginOpen={handleLoginOpen} // Pass login click
        />

        {/* * UPDATE: Render Login Modal UNCONDITIONALLY.
         * The modal component uses AnimatePresence to handle mounting/unmounting based on 'isOpen' prop.
         */}
        <LoginModal
          isOpen={isLoginOpen}
          onClose={handleLoginClose}
          isDarkMode={isDarkMode}
        />

        {/* 3. Increased container height by changing min-h-screen to h-full (not needed since parent has min-h-screen).
         * Instead, I'm ensuring the parent div is full height with min-h-screen and
         * changing the 'main' element to use 'min-h-[calc(100vh-90px)]' to explicitly fill the screen height minus the header height (90px).
         */}
        <main style={{ padding: "20px", paddingTop: "90px" }}>
          {/* 4. Implement AnimatePresence for transitions */}
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <motion.div
                    key="/"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Dashboard isDarkMode={isDarkMode} />
                  </motion.div>
                }
              />
              <Route
                path="/bookings"
                element={
                  <motion.div
                    key="/bookings"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Bookings isDarkMode={isDarkMode} />
                  </motion.div>
                }
              />
              <Route
                path="/villas"
                element={
                  <motion.div
                    key="/villas"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Villas isDarkMode={isDarkMode} />
                  </motion.div>
                }
              />
              <Route
                path="/customers"
                element={
                  <motion.div
                    key="/customers"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Customers isDarkMode={isDarkMode} />
                  </motion.div>
                }
              />
              <Route
                path="/payments"
                element={
                  <motion.div
                    key="/payments"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Payments isDarkMode={isDarkMode} />
                  </motion.div>
                }
              />
              <Route
                path="/reports"
                element={
                  <motion.div
                    key="/reports"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Reports isDarkMode={isDarkMode} />
                  </motion.div>
                }
              />
              <Route
                path="/exclusive-pass"
                element={
                  <motion.div
                    key="/exclusive-pass"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <ExclusivePassManagement isDarkMode={isDarkMode} />
                  </motion.div>
                }
              />
              <Route
                path="/account"
                element={
                  <motion.div
                    key="/account"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Account isDarkMode={isDarkMode} />
                  </motion.div>
                }
              />
              <Route
                path="/settings"
                element={
                  <motion.div
                    key="/settings"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Settings isDarkMode={isDarkMode} />
                  </motion.div>
                }
              />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

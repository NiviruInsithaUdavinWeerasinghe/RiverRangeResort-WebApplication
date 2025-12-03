// AppContent.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Layout components
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Header from "./components/Header/Header.jsx";

// Pages
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Bookings from "./pages/Bookings/Bookings.jsx";
import Villas from "./pages/Villas/Villas.jsx";
import Guests from "./pages/Guests/Guests.jsx";
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

function AppContent() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Add modal state
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const handleLoginOpen = () => setIsLoginOpen(true);
  const handleLoginClose = () => setIsLoginOpen(false);

  const { currentPage, setCurrentPage } = usePageTracking();

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
          transition: "margin-left 0.95s ease",
        }}
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

        <main style={{ padding: "20px", paddingTop: "90px" }}>
          <Routes>
            <Route path="/" element={<Dashboard isDarkMode={isDarkMode} />} />
            <Route
              path="/bookings"
              element={<Bookings isDarkMode={isDarkMode} />}
            />
            <Route
              path="/villas"
              element={<Villas isDarkMode={isDarkMode} />}
            />
            <Route
              path="/guests"
              element={<Guests isDarkMode={isDarkMode} />}
            />
            <Route
              path="/payments"
              element={<Payments isDarkMode={isDarkMode} />}
            />
            <Route
              path="/reports"
              element={<Reports isDarkMode={isDarkMode} />}
            />
            <Route
              path="/exclusive-pass"
              element={<ExclusivePassManagement isDarkMode={isDarkMode} />}
            />
            <Route
              path="/account"
              element={<Account isDarkMode={isDarkMode} />}
            />
            <Route
              path="/settings"
              element={<Settings isDarkMode={isDarkMode} />}
            />
          </Routes>
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

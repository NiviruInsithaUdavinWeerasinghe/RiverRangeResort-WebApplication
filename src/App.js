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

// Pages — You will create these later
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Bookings from "./pages/Bookings/Bookings.jsx";
import Villas from "./pages/Villas/Villas.jsx";
import Guests from "./pages/Guests/Guests.jsx";
import Payments from "./pages/Payments/Payments.jsx";
import Reports from "./pages/Reports/Reports.jsx";
import ExclusivePassManagement from "./pages/ExclusivePass/ExclusivePassManagement.jsx";
import Account from "./pages/Account/Account.jsx";
import Settings from "./pages/Settings/Settings.jsx";

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

  const { currentPage, setCurrentPage } = usePageTracking();

  // Sidebar toggle
  const handleToggleSidebar = () => setIsCollapsed((prev) => !prev);

  // Theme toggle
  const handleThemeToggle = () => setIsDarkMode((prev) => !prev);

  // Apply dark mode to HTML tag
  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDarkMode]);

  return (
    <div
      className={`flex min-h-screen transition-colors duration-500 
      ${isDarkMode ? "bg-slate-900 text-slate-300" : "bg-white text-gray-800"}`}
    >
      <Sidebar
        isCollapsed={isCollapsed}
        onToggle={handleToggleSidebar}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage} // <-- add this
        isDarkMode={isDarkMode}
      />

      <div
        style={{
          marginLeft: isCollapsed ? "80px" : "240px",
          width: "100%",
          transition: "margin-left 0.35s ease",
        }}
      >
        <Header
          isCollapsed={isCollapsed}
          isDarkMode={isDarkMode}
          handleThemeToggle={handleThemeToggle}
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

            {/* Exclusive Pass */}
            <Route
              path="/exclusive-pass"
              element={<ExclusivePassManagement isDarkMode={isDarkMode} />}
            />

            {/* Bottom Menu Pages */}
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

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Pages
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Bookings from "./pages/Bookings/Bookings.jsx";
import Villas from "./pages/Villas/Villas.jsx";
import Guests from "./pages/Guests/Guests.jsx";
import Payments from "./pages/Payments/Payments.jsx";
import Reports from "./pages/Reports/Reports.jsx";
import ExclusivePassManagement from "./pages/ExclusivePass/ExclusivePassManagement.jsx";

// Layout Components
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Header from "./components/Header/Header.jsx";

/* Custom hook to manage current page state, keeping it in sync with the URL. 
  This is needed to pass 'currentPage' and 'setCurrentPage' correctly to the Sidebar.
*/
const usePageTracking = (initialPage) => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    // Update currentPage whenever the URL changes
    setCurrentPage(location.pathname);
  }, [location]);

  return { currentPage, setCurrentPage };
};

function AppContent() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Use a sensible default path, like the dashboard route
  const { currentPage, setCurrentPage } = usePageTracking("/");

  const handleToggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  // Determine the left margin for the main content based on sidebar state
  const contentMarginLeft = isCollapsed ? "80px" : "240px";

  return (
    <div style={{ display: "flex", backgroundColor: "#0f172a" }}>
      {/* Sidebar is fixed, so the margin on the content div handles the layout */}
      <Sidebar
        isCollapsed={isCollapsed}
        onToggle={handleToggleSidebar}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <div
        style={{
          marginLeft: contentMarginLeft,
          width: "100%",
          minHeight: "100vh",
          transition: "margin-left 0.35s cubic-bezier(0.4,0,0.2,1)", // Match Header transition
        }}
      >
        {/* Header needs isCollapsed to calculate its position/width */}
        <Header isCollapsed={isCollapsed} />

        {/* Padding-top to account for the fixed Header's height (70px) */}
        <div style={{ padding: "20px", paddingTop: "90px" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/villas" element={<Villas />} />
            <Route path="/guests" element={<Guests />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/reports" element={<Reports />} />
            <Route
              path="/exclusive-pass"
              element={<ExclusivePassManagement />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  /* The <AppContent /> component is wrapped inside <Router> to allow 
    useLocation hook to work within the custom hook usePageTracking.
  */
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

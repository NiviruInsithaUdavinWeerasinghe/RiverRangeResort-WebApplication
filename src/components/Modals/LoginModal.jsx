// LoginModal.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, UserPlus, X } from 'lucide-react';

/**
 * A professional, glassmorphism-themed Login and Sign Up modal component.
 *
 * @param {object} props - Component props.
 * @param {boolean} props.isOpen - Controls the visibility of the modal.
 * @param {function} props.onClose - Function to call when the modal is closed.
 * @param {boolean} props.isDarkMode - Controls the dark mode theme.
 */
export default function LoginModal({ isOpen, onClose, isDarkMode }) {
  const [activeTab, setActiveTab] = useState("login");

  // --- Theme Classes for Glassmorphism and Modern Look ---

  // Glassy Modal Background: Adjusted for darker look in light mode (bg-white/75)
  // and slightly higher opacity in dark mode for better definition.
  const modalBgClasses = isDarkMode
    ? "bg-slate-800/70 text-slate-50 border border-slate-700/60 backdrop-blur-md shadow-2xl shadow-slate-900/60"
    // Increased opacity from /50 to /75 for a more substantial/darker look in light mode
    : "bg-white/75 text-gray-800 border border-gray-300 backdrop-blur-md shadow-2xl shadow-gray-400/80";

  // Overlay: Retained transparency
  const overlayBg = isDarkMode ? "bg-black/70" : "bg-black/60";

  // Input Styling: Subtly transparent input fields
  const inputBg = isDarkMode
    ? "bg-slate-700/70 text-slate-50 border border-slate-600/50 focus:border-amber-400"
    : "bg-white/80 text-gray-800 border border-gray-300/70 focus:border-amber-600";

  // Button Primary Theme (Amber Focus)
  const btnPrimary = isDarkMode
    ? "bg-amber-400 text-slate-900 hover:bg-amber-500 focus:ring-amber-300"
    : "bg-amber-600 text-white hover:bg-amber-700 focus:ring-amber-400";

  // Input Wrapper Component for modern labeled fields
  const LabeledInput = ({ id, label, type, placeholder, isRequired = false }) => (
    <div className="relative">
      <label
        htmlFor={id}
        className={`block text-sm font-medium transition-colors duration-200
          ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required={isRequired}
        // Added focus ring animation and modern border styling
        className={`mt-1 w-full px-4 py-2 rounded-lg transition-all duration-300
          ${inputBg} focus:outline-none focus:ring-2 focus:ring-amber-400/80`}
      />
    </div>
  );

  return (
    <AnimatePresence>
      {/* * FIX: AnimatePresence only renders children if 'isOpen' is true. 
        * When 'isOpen' becomes false, AnimatePresence waits for the 'exit' animation to complete before unmounting.
        * This is the key to fixing the instant closing.
        */}
      {isOpen && (
        <motion.div
          className={`fixed inset-0 flex items-center justify-center ${overlayBg} z-50 p-4`}
          // Overlay fade animation
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }} // Fast overlay transition
          onClick={onClose}
        >
          {/* Outer modal container */}
          <motion.div
            // Updated classes for glassy look and rounded corners
            className={`w-[420px] max-w-full rounded-2xl p-8 ${modalBgClasses} relative`}
            // Modal slide and scale animation (The "smooth open and close" movement)
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }} // This is the smooth closing animation
            transition={{ type: "spring", stiffness: 250, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            layout // Enable smooth layout/height transition when content changes
          >
            
            {/* FIX: CSS to override browser autofill background for dark mode. */}
            {isDarkMode && (
                <style dangerouslySetInnerHTML={{__html: `
                    input:-webkit-autofill,
                    input:-webkit-autofill:hover,
                    input:-webkit-autofill:focus,
                    input:-webkit-autofill:active {
                        /* Force background to dark mode color using box-shadow trick */
                        -webkit-box-shadow: 0 0 0 1000px rgb(51 65 85 / 0.7) inset !important; 
                        -webkit-text-fill-color: #f8fafc !important; /* Force text color to slate-50 */
                        transition: background-color 5000s ease-in-out 0s; /* Prevent transition fade */
                    }
                `}} />
            )}

            {/* Close Button - More subtle and rounded */}
            <button
              className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-200
                ${isDarkMode ? 'text-slate-300 hover:bg-slate-700/50' : 'text-gray-600 hover:bg-white/80'}
                hover:text-red-500`}
              onClick={onClose}
              aria-label="Close Modal"
            >
              <X size={20} />
            </button>

            {/* Tabs - Now uses a moving underline indicator */}
            <div className="relative flex justify-center mb-6 border-b border-current/20">
              {/* Login Button - Adjusted to w-1/2 and removed border-b-4 */}
              <button
                className={`flex items-center justify-center w-1/2 gap-2 py-3 font-semibold transition-colors duration-300 relative z-10
                  ${activeTab === "login"
                    ? `${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`
                    : `text-current/60 hover:text-current/80`}
                `}
                onClick={() => setActiveTab("login")}
              >
                <LogIn size={20} /> Login
              </button>
              {/* Sign Up Button - Adjusted to w-1/2 and removed border-b-4 */}
              <button
                className={`flex items-center justify-center w-1/2 gap-2 py-3 font-semibold transition-colors duration-300 relative z-10
                  ${activeTab === "signup"
                    ? `${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`
                    : `text-current/60 hover:text-current/80`}
                `}
                onClick={() => setActiveTab("signup")}
              >
                <UserPlus size={20} /> Sign Up
              </button>

              {/* Moving Underline Indicator */}
              <motion.div
                className={`absolute bottom-0 left-0 h-[4px] w-1/2 ${isDarkMode ? 'bg-amber-400' : 'bg-amber-600'} rounded-full`}
                initial={false} 
                animate={{ 
                    x: activeTab === 'login' ? '0%' : '100%',
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </div>

            {/* Form Container (Enables smooth height transition for the modal body) */}
            <motion.div layout>
              {/* Form - Uses motion for cross-fade/slide animation when switching tabs */}
              <motion.form
                key={activeTab}
                // Increased distance for more noticeable slide
                initial={{ opacity: 0, x: activeTab === 'login' ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: activeTab === 'login' ? 50 : -50 }}
                // Increased duration for a slower, smoother visible slide
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex flex-col gap-5"
                onSubmit={(e) => e.preventDefault()} // Prevent default submission for demo
              >

                {activeTab === "signup" && (
                  <LabeledInput
                    id="fullName"
                    label="Full Name"
                    type="text"
                    placeholder="John Doe"
                    isRequired
                  />
                )}

                <LabeledInput
                  id="email"
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  isRequired
                />

                <LabeledInput
                  id="password"
                  label="Password"
                  type="password"
                  // Password hint only shown for Sign Up, as requested
                  placeholder={activeTab === "signup" ? "Minimum 8 characters" : "Enter your password"}
                  isRequired
                />

                {activeTab === "signup" && (
                  <LabeledInput
                    id="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    placeholder="Re-enter password"
                    isRequired
                  />
                )}

                <button
                  type="submit"
                  className={`w-full py-3 rounded-xl mt-3 text-lg font-bold uppercase tracking-wider
                    ${btnPrimary} transition-all duration-300 transform hover:scale-[1.01] focus:ring-4`}
                >
                  {/* Changed "Secure Login" to "Login" */}
                  {activeTab === "login" ? "Login" : "Create Account"}
                </button>

                {activeTab === "login" && (
                  <p className={`text-center text-sm mt-2 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                      <a href="#" className={`font-medium ${isDarkMode ? 'text-amber-300 hover:text-amber-200' : 'text-amber-600 hover:text-amber-500'}`}>
                          Forgot Password?
                      </a>
                  </p>
                )}
              </motion.form>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
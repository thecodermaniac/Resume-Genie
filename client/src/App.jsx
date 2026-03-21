import { useEffect } from "react";
import { Toaster, ToastBar, toast } from 'react-hot-toast';
import { X } from 'lucide-react';
import Navbar from "./components/layout/Navbar";
import Homepage from "./pages/Homepage";
import Footer from "./components/layout/Footer";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import ResumeQnAPage from "./pages/ResumeQnAPage";
import AnalysisPage from "./pages/AnalysisPage";
import BuilderPage from "./pages/BuilderPage";
import LowerNavBar from "./components/layout/LowerNavBar";

function App() {
  const location = useLocation();
  useEffect(() => {
    // Optional: Add a small delay to ensure the scroll happens after route change
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            border: '1px solid #10b981',
            padding: '16px',
            color: '#064e3b',
            background: '#ecfdf5',
            borderRadius: '0.75rem',
            boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.1)',
          },
          iconTheme: {
            primary: '#10b981',
            secondary: '#fff',
          },
        }}
      >
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== 'loading' && (
                  <button
                    onClick={() => toast.dismiss(t.id)}
                    className="ml-2 flex-shrink-0 text-emerald-600 hover:text-emerald-800 outline-none p-1 rounded-full hover:bg-emerald-100 transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/resume-qna" element={<ResumeQnAPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/builder" element={<BuilderPage />} />
      </Routes>
      <LowerNavBar />
      <Footer />
    </div>
  );
}

export default App;

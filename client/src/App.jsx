import { useEffect } from "react";
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

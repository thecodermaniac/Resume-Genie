import Navbar from "./components/layout/Navbar";
import Homepage from "./pages/Homepage";
import Footer from "./components/layout/Footer";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import ResumeQnAPage from "./pages/ResumeQnAPage";
import AnalysisPage from "./pages/AnalysisPage";
import BuilderPage from "./pages/BuilderPage";


function App() {
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
      
      <Footer />
    </div>
  );
}

export default App;

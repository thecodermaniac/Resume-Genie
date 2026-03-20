import React from "react";
import { useLocation, Link } from "react-router-dom";

const LowerNavBar = () => {
  const location = useLocation();
  return (
    <div className="font-sans">
      {/* Dev Switcher for Demo */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 md:left-4 md:translate-x-0 w-[calc(100%-2rem)] max-w-sm justify-center md:w-auto md:max-w-none md:justify-start z-50 bg-gray-900 p-2 rounded-full shadow-lg flex gap-2">
        <Link
          to="/resume-qna"
          className={`px-3 py-1 text-xs rounded-full ${location.pathname === "/resume-qna" ? "bg-emerald-400 text-black" : "text-white"} hover:bg-emerald-500 transition-colors`}
        >
          Resume Q&A
        </Link>
        <Link
          to="/analysis"
          className={`px-3 py-1 text-xs rounded-full ${location.pathname === "/analysis" ? "bg-emerald-400 text-black" : "text-white"} hover:bg-emerald-500 transition-colors`}
        >
          Analysis
        </Link>
        <Link
          to="/builder"
          className={`px-3 py-1 text-xs rounded-full ${location.pathname === "/builder" ? "bg-emerald-400 text-black" : "text-white"} hover:bg-emerald-500 transition-colors`}
        >
          Builder
        </Link>
      </div>
    </div>
  );
};

export default LowerNavBar;

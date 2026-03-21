import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LowerNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e, path) => {
    e.preventDefault();
    if (location.pathname === path) return;

    const hasProgress = () => {
      if (location.pathname === "/builder") {
        const inputs = document.querySelectorAll("input:not([type='file']):not([type='hidden']), textarea");
        return Array.from(inputs).some(input => input.value && input.value.trim() !== "");
      }
      if (location.pathname === "/analysis") {
        const textarea = document.querySelector("textarea");
        return (textarea && textarea.value.trim() !== "") || !textarea;
      }
      if (location.pathname === "/resume-qna") {
        return !!document.querySelector(".react-pdf__Document");
      }
      return false;
    };

    if (["/builder", "/analysis", "/resume-qna"].includes(location.pathname)) {
      if (hasProgress()) {
        const confirmLeave = window.confirm("Warning: Navigating away will lead to loss of your current progress. Do you wish to proceed?");
        if (!confirmLeave) return;
      }
    }
    navigate(path);
  };

  return (
    <div className="font-sans">
      {/* Dev Switcher for Demo */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 md:left-4 md:translate-x-0 w-[calc(100%-2rem)] max-w-sm justify-center md:w-auto md:max-w-none md:justify-start z-50 bg-gray-900 p-2 rounded-full shadow-lg flex gap-2">
        <a
          href="/resume-qna"
          onClick={(e) => handleNavClick(e, "/resume-qna")}
          className={`px-3 py-1 text-xs rounded-full cursor-pointer ${location.pathname === "/resume-qna" ? "bg-emerald-400 text-black" : "text-white"} hover:bg-emerald-500 transition-colors`}
        >
          Resume Q&A
        </a>
        <a
          href="/analysis"
          onClick={(e) => handleNavClick(e, "/analysis")}
          className={`px-3 py-1 text-xs rounded-full cursor-pointer ${location.pathname === "/analysis" ? "bg-emerald-400 text-black" : "text-white"} hover:bg-emerald-500 transition-colors`}
        >
          Analysis
        </a>
        <a
          href="/builder"
          onClick={(e) => handleNavClick(e, "/builder")}
          className={`px-3 py-1 text-xs rounded-full cursor-pointer ${location.pathname === "/builder" ? "bg-emerald-400 text-black" : "text-white"} hover:bg-emerald-500 transition-colors`}
        >
          Builder
        </a>
      </div>
    </div>
  );
};

export default LowerNavBar;

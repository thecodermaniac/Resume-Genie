import Button from "../ui/Button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e, path, hash) => {
    e.preventDefault();

    // Check if user has actually made progress on stateful pages
    const hasProgress = () => {
      if (location.pathname === "/builder") {
        const inputs = document.querySelectorAll("input:not([type='file']):not([type='hidden']), textarea");
        return Array.from(inputs).some(input => input.value && input.value.trim() !== "");
      }
      if (location.pathname === "/analysis") {
        const textarea = document.querySelector("textarea");
        return (textarea && textarea.value.trim() !== "") || !textarea; // If textarea is removed, application is analyzing or finished
      }
      if (location.pathname === "/resume-qna") {
        return !!document.querySelector(".react-pdf__Document"); // If PDF is loaded, progress is made
      }
      return false;
    };

    if (["/builder", "/analysis", "/resume-qna"].includes(location.pathname) && location.pathname !== path) {
      if (hasProgress()) {
        const confirmLeave = window.confirm("Warning: Navigating away will lead to loss of your current progress. Do you wish to proceed?");
        if (!confirmLeave) return;
      }
    }

    setIsMobileMenuOpen(false);

    if (location.pathname !== path) {
      navigate(path);
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash.replace("#", ""));
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      if (hash) {
        const element = document.getElementById(hash.replace("#", ""));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="flex justify-between items-center py-4 px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 cursor-pointer" onClick={(e) => handleNavClick(e, "/", null)}>
          <div className="w-8 h-8 bg-emerald-300 rounded-lg flex items-center justify-center text-emerald-900 font-bold shadow-sm">CP</div>
          <span className="font-bold text-gray-800 text-xl tracking-tight">CareerPath AI</span>
        </div>
        <div className="hidden md:flex gap-8 text-gray-500 font-medium">
          <a href="/" onClick={(e) => handleNavClick(e, "/", null)} className="hover:text-emerald-600 transition-colors cursor-pointer">Home</a>
          <a href="/#features" onClick={(e) => handleNavClick(e, "/", "#features")} className="hover:text-emerald-600 transition-colors cursor-pointer">Features</a>
          <a href="/#pricing" onClick={(e) => handleNavClick(e, "/", "#pricing")} className="hover:text-emerald-600 transition-colors cursor-pointer">Pricing</a>
        </div>
        <div className="hidden md:flex gap-4">
          <Button variant="secondary" onClick={() => toast("Login functionality coming soon!", { icon: "🚀" })}>
            Log in
          </Button>
          <Button variant="primary" onClick={() => toast("Sign up functionality coming soon!", { icon: "🚀" })}>
            Sign up
          </Button>
        </div>
        
        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-800">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-8 flex flex-col gap-4 shadow-lg absolute w-full left-0 top-full">
          <a href="/" onClick={(e) => handleNavClick(e, "/", null)} className="text-gray-600 hover:text-emerald-600 font-medium py-2">Home</a>
          <a href="/#features" onClick={(e) => handleNavClick(e, "/", "#features")} className="text-gray-600 hover:text-emerald-600 font-medium py-2">Features</a>
          <a href="/#pricing" onClick={(e) => handleNavClick(e, "/", "#pricing")} className="text-gray-600 hover:text-emerald-600 font-medium py-2">Pricing</a>
          <div className="flex flex-col gap-3 mt-4">
            <Button variant="secondary" onClick={() => { setIsMobileMenuOpen(false); toast("Login functionality coming soon!", { icon: "🚀" }); }} className="w-full">
              Log in
            </Button>
            <Button variant="primary" onClick={() => { setIsMobileMenuOpen(false); toast("Sign up functionality coming soon!", { icon: "🚀" }); }} className="w-full">
              Sign up
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
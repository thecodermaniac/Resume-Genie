import Button from "../ui/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="flex justify-between items-center py-4 px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
          <div className="w-8 h-8 bg-emerald-300 rounded-lg flex items-center justify-center text-emerald-900 font-bold shadow-sm">CP</div>
          <span className="font-bold text-gray-800 text-xl tracking-tight">CareerPath AI</span>
        </div>
        <div className="hidden md:flex gap-8 text-gray-500 font-medium">
          <Link to="/" className="hover:text-emerald-600 transition-colors">Home</Link>
          <Link to="/#features" className="hover:text-emerald-600 transition-colors">Features</Link>
          <Link to="/#pricing" className="hover:text-emerald-600 transition-colors">Pricing</Link>
        </div>
        <div className="hidden md:flex gap-4">
          <Button variant="secondary" onClick={() => alert("Login functionality coming soon!")}>
            Log in
          </Button>
          <Button variant="primary" onClick={() => alert("Sign up functionality coming soon!")}>
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
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-600 hover:text-emerald-600 font-medium py-2">Home</Link>
          <Link to="/#features" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-600 hover:text-emerald-600 font-medium py-2">Features</Link>
          <Link to="/#pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-600 hover:text-emerald-600 font-medium py-2">Pricing</Link>
          <div className="flex flex-col gap-3 mt-4">
            <Button variant="secondary" onClick={() => { setIsMobileMenuOpen(false); alert("Login functionality coming soon!"); }} className="w-full">
              Log in
            </Button>
            <Button variant="primary" onClick={() => { setIsMobileMenuOpen(false); alert("Sign up functionality coming soon!"); }} className="w-full">
              Sign up
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
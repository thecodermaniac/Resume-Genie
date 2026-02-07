import Button from "../ui/Button";

const Navbar = () => (
  <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
    <div className="flex justify-between items-center py-4 px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
        <div className="w-8 h-8 bg-emerald-300 rounded-lg flex items-center justify-center text-emerald-900 font-bold shadow-sm">CP</div>
        <span className="font-bold text-gray-800 text-xl tracking-tight">CareerPath AI</span>
      </div>
      <div className="hidden md:flex gap-8 text-gray-500 font-medium">
        <a href="#home" className="hover:text-emerald-600 transition-colors">Home</a>
        <a href="#features" className="hover:text-emerald-600 transition-colors">Features</a>
        <a href="#pricing" className="hover:text-emerald-600 transition-colors">Pricing</a>
      </div>
      <div className="flex gap-4">
        <Button variant="secondary" onClick={() => alert("Login functionality coming soon!")}>
          Log in
        </Button>
        <Button variant="primary" onClick={() => alert("Sign up functionality coming soon!")}>
          Sign up
        </Button>
      </div>
    </div>
  </nav>
);

export default Navbar;
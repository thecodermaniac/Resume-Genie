import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = "", 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-2.5 md:px-8 md:py-3.5 font-bold rounded-full transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-gradient-to-br from-lime-200 via-emerald-300 to-teal-400 text-emerald-950 shadow-lg shadow-emerald-200/50 hover:shadow-xl hover:-translate-y-1",
    secondary: "bg-white border border-gray-200 text-gray-700 hover:border-gray-400 hover:bg-gray-50",
    outline: "bg-transparent border-2 border-emerald-100 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300",
    ghost: "bg-transparent text-gray-500 hover:text-emerald-600 hover:bg-emerald-50/50 px-4",
    dark: "bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-gray-900/20"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
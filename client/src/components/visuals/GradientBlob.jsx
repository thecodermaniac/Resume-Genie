import React from 'react';

const GradientBlob = ({ 
  color = "emerald", // emerald, blue, indigo, purple
  position = "center", // custom classes or presets
  size = "lg", // sm, md, lg
  className = ""
}) => {
  // Map colors to tailwind classes
  const colors = {
    emerald: "from-emerald-300/30 via-teal-200/30",
    blue: "from-blue-300/30 via-indigo-200/30",
    purple: "from-purple-300/30 via-pink-200/30",
    orange: "from-orange-300/30 via-amber-200/30",
  };

  const sizes = {
    sm: "w-[300px] h-[300px] blur-[60px]",
    md: "w-[500px] h-[500px] blur-[80px]",
    lg: "w-[800px] h-[600px] blur-[100px]",
  };

  return (
    <div 
      className={`absolute rounded-full bg-gradient-to-b to-transparent -z-10 pointer-events-none ${colors[color]} ${sizes[size]} ${className} ${position}`} 
    />
  );
};

export default GradientBlob;
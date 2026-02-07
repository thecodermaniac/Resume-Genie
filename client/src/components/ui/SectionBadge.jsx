import React from 'react';

const SectionBadge = ({ icon, children, className = "" }) => (
  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wide ${className}`}>
    {icon && <span className="text-emerald-600">{icon}</span>}
    {children}
  </div>
);

export default SectionBadge;
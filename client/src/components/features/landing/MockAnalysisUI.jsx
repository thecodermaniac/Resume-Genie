import { ArrowRight } from "lucide-react";

const MockAnalysisUI = () => (
  <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 p-6 max-w-sm mx-auto">
    <div className="flex justify-between items-center mb-6">
      <h3 className="font-bold text-gray-800">Score</h3>
      <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">Needs Work</span>
    </div>
    <div className="flex gap-4 mb-6 items-center">
      <div className="relative w-20 h-20 flex-shrink-0">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="40" cy="40" r="36" stroke="#f3f4f6" strokeWidth="8" fill="transparent" />
          <circle cx="40" cy="40" r="36" stroke="#fbbf24" strokeWidth="8" fill="transparent" strokeDasharray="226" strokeDashoffset="60" strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-extrabold text-gray-900">72</span>
        </div>
      </div>
      <div className="space-y-2 flex-1 w-full">
        <div className="flex justify-between text-[10px] uppercase font-bold text-gray-400"><span>Impact</span><span className="text-emerald-500">High</span></div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden"><div className="h-full w-[85%] bg-emerald-400 rounded-full"></div></div>
        <div className="flex justify-between text-[10px] uppercase font-bold text-gray-400"><span>Brevity</span><span className="text-amber-500">Med</span></div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden"><div className="h-full w-[60%] bg-amber-400 rounded-full"></div></div>
      </div>
    </div>
    <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs">
      <div className="flex items-center gap-2 mb-1"><span className="text-red-500 font-bold line-through">Responsible for</span> <ArrowRight size={10} /> <span className="text-emerald-600 font-bold">Spearheaded</span></div>
      <p className="text-gray-500">Use strong action verbs to increase impact.</p>
    </div>
  </div>
);

export default MockAnalysisUI;
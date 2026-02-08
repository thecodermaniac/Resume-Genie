import { AlertCircle, CheckCircle } from "lucide-react";
const AnalysisPage = () => {
  return (
       <div className="h-screen max-w-6xl mx-auto mt-6">
         <h2 className="text-3xl font-bold text-gray-900 mb-8">Analysis Dashboard</h2>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {/* Score Card */}
           <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
             <div className="relative w-40 h-40 mb-6">
               {/* CSS Only Circular Progress Mock */}
               <svg className="w-full h-full transform -rotate-90">
                 <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-100" />
                 <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="440" strokeDashoffset="110" className="text-emerald-400" />
               </svg>
               <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                 <span className="text-4xl font-bold text-gray-900">75</span>
                 <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Score</span>
               </div>
             </div>
             <h3 className="text-lg font-bold text-gray-800">Good Start!</h3>
             <p className="text-gray-400 text-sm mt-2">You are in the top 40% of applicants.</p>
           </div>

           {/* Feedback List */}
           <div className="md:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
             <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-xl text-gray-800">Actionable Insights</h3>
               <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-medium">4 Issues Found</span>
             </div>

             <div className="space-y-4">
               {/* Insight Item: Warning */}
               <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-4 items-start">
                 <AlertCircle className="text-amber-500 shrink-0 mt-1" size={20} />
                 <div className="flex-1">
                   <h4 className="font-bold text-amber-900 text-sm">Summary is too long</h4>
                   <p className="text-amber-800/70 text-sm mt-1">Recruiters spend 6 seconds on average. Shorten your summary to 3 lines.</p>
                 </div>
                 <button className="text-xs font-bold bg-white px-3 py-2 rounded-lg text-amber-600 shadow-sm hover:shadow">Fix it</button>
               </div>

               {/* Insight Item: Success */}
               <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex gap-4 items-start">
                 <CheckCircle className="text-emerald-500 shrink-0 mt-1" size={20} />
                 <div className="flex-1">
                   <h4 className="font-bold text-emerald-900 text-sm">Strong Action Verbs</h4>
                   <p className="text-emerald-800/70 text-sm mt-1">Great job using words like "Orchestrated" and "Developed".</p>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
  );
};

export default AnalysisPage;
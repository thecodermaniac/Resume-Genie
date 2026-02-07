import React from 'react';
import { MessageSquare, Send } from "lucide-react";

const ResumeQnAPage = () => {
  return (
      <div className="flex-1 flex gap-6 px-6 pb-6 max-w-7xl mx-auto w-full overflow-hidden">
        
        {/* Left Pane: PDF Viewer Mock */}
        <div className="w-5/12 bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
          <div className="h-12 border-b border-gray-100 flex items-center px-4 justify-between bg-gray-50/50">
             <span className="text-xs font-semibold text-gray-400">RESUME.PDF</span>
             <div className="flex gap-2">
               <div className="w-3 h-3 rounded-full bg-red-400"></div>
               <div className="w-3 h-3 rounded-full bg-amber-400"></div>
               <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
             </div>
          </div>
          <div className="flex-1 p-8 overflow-y-auto bg-gray-100/50">
            <div className="bg-white shadow-md min-h-[800px] w-full p-8 mx-auto max-w-[90%]">
              {/* Fake Resume Content */}
              <div className="w-24 h-24 bg-gray-200 rounded-full mb-6"></div>
              <div className="h-6 w-1/2 bg-gray-800 mb-2 rounded"></div>
              <div className="h-4 w-1/3 bg-gray-400 mb-8 rounded"></div>
              <div className="space-y-3">
                <div className="h-2 w-full bg-gray-200 rounded"></div>
                <div className="h-2 w-full bg-gray-200 rounded"></div>
                <div className="h-2 w-5/6 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Pane: Chat Interface */}
        <div className="w-7/12 bg-white rounded-3xl shadow-sm border border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">Resume Q&A</h2>
            <p className="text-sm text-gray-400">Ask me anything about your document.</p>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {/* AI Message */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <MessageSquare size={16} className="text-emerald-600" />
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl rounded-tl-none max-w-md text-gray-700 text-sm leading-relaxed">
                I've analyzed your resume. Your experience in React is strong, but you're missing specific metrics in your "Senior Dev" role. Would you like suggestions?
              </div>
            </div>

            {/* User Message */}
            <div className="flex gap-4 flex-row-reverse">
              <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0 text-white text-xs">You</div>
              <div className="bg-emerald-50 p-4 rounded-2xl rounded-tr-none max-w-md text-emerald-900 text-sm leading-relaxed">
                Yes, please give me 3 bullet points quantifying my impact.
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 m-4 mt-0 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-3">
            <input 
              type="text" 
              placeholder="Type a message..." 
              className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-400"
            />
            <button className="p-2 bg-white rounded-full shadow-sm hover:shadow text-emerald-500">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
  );
};

export default ResumeQnAPage;
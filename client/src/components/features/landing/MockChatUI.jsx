import { Cpu } from "lucide-react";

const MockChatUI = () => (
  <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 p-6 overflow-hidden max-w-sm mx-auto">
    <div className="border-b pb-4 mb-6 flex items-center gap-3">
      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center"><Cpu size={20} className="text-emerald-600" /></div>
      <div><p className="font-bold text-gray-800 text-sm">CareerPath Bot</p><p className="text-[10px] text-emerald-500 font-bold">● Online</p></div>
    </div>
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="w-6 h-6 bg-emerald-100 rounded-full flex-shrink-0"></div>
        <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none text-xs text-gray-700 shadow-sm">
          I see a gap in 2022. Should we frame that as freelance work?
        </div>
      </div>
      <div className="flex gap-3 flex-row-reverse">
        <div className="w-6 h-6 bg-gray-800 rounded-full flex-shrink-0"></div>
        <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-2xl rounded-tr-none text-xs text-emerald-900 shadow-sm">
          Yes, I was building my portfolio then.
        </div>
      </div>
      <div className="flex gap-3">
        <div className="w-6 h-6 bg-emerald-100 rounded-full flex-shrink-0"></div>
        <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none text-xs text-gray-500 flex gap-1 items-center shadow-sm">
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
        </div>
      </div>
    </div>
  </div>
);

export default MockChatUI;
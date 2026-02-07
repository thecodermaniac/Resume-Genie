const MockBuilderUI = () => (
  <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 p-6 max-w-sm mx-auto relative">
    <div className="mb-4 border-b pb-3 flex justify-between items-center">
      <h3 className="font-bold text-gray-800 text-sm">Smart Builder</h3>
      <div className="flex gap-1">
        <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
        <div className="w-2 h-2 rounded-full bg-gray-200"></div>
      </div>
    </div>
    <div className="space-y-4">
      <div>
        <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Skills (Auto-Suggest)</label>
        <div className="p-2 bg-white border border-emerald-300 ring-2 ring-emerald-50 rounded-lg flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-md">ReactJS</span>
          <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-md">Node.js</span>
          <span className="text-[10px] text-gray-400 p-1">Type...</span>
        </div>
        <div className="mt-1 ml-1 p-2 bg-white shadow-lg rounded-lg border border-gray-100 w-32 absolute z-10">
          <div className="text-[10px] font-bold text-gray-700 py-1 hover:bg-gray-50 cursor-pointer">Typescript</div>
          <div className="text-[10px] font-bold text-gray-700 py-1 hover:bg-gray-50 cursor-pointer">Tailwind</div>
        </div>
      </div>
      <div>
        <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Template</label>
        <div className="flex gap-2">
          <div className="w-12 h-16 bg-gray-100 border-2 border-emerald-400 rounded"></div>
          <div className="w-12 h-16 bg-white border border-gray-200 rounded"></div>
          <div className="w-12 h-16 bg-white border border-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  </div>
);

export default MockBuilderUI;
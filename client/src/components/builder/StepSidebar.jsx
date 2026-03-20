export default function StepSidebar({ steps, currentStep }) {
  return (
    <div className="w-full md:w-1/4 flex md:flex-col overflow-x-auto md:overflow-visible gap-2 md:gap-0 md:space-y-3 pb-2 md:pb-0 scrollbar-hide">
      {steps.map((item, idx) => (
        <div
          key={idx}
          className={`flex-shrink-0 flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-xl transition-colors ${
            idx === currentStep
              ? "bg-emerald-50 text-emerald-900 font-semibold"
              : "text-gray-500"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              idx === currentStep
                ? "bg-emerald-500"
                : "bg-gray-300"
            }`}
          />
          <span className="text-sm md:text-base">{item}</span>
        </div>
      ))}
    </div>
  );
}
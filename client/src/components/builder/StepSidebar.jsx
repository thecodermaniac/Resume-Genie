export default function StepSidebar({ steps, currentStep }) {
  return (
    <div className="w-1/4 space-y-3">
      {steps.map((item, idx) => (
        <div
          key={idx}
          className={`flex items-center gap-3 p-3 rounded-xl ${
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
          {item}
        </div>
      ))}
    </div>
  );
}
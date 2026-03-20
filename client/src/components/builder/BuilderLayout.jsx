import Button from "../ui/Button";
import StepSidebar from "./StepSidebar";

export default function BuilderLayout({
  steps,
  currentStep,
  nextStep,
  prevStep,
  children,
}) {
  return (
    <div className="min-h-screen bg-white">

      {/* HEADER */}
      <div className="border-b border-gray-100 py-4">
        <div className="max-w-5xl mx-auto px-4 md:px-6 flex justify-between items-center gap-2">
          <span className="font-bold text-gray-800">
            Resume Builder
          </span>

          <div className="flex gap-1 md:gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-6 md:w-12 rounded-full ${
                  index <= currentStep
                    ? "bg-emerald-400"
                    : "bg-gray-100"
                }`}
              />
            ))}
          </div>

          <span className="text-xs md:text-sm text-gray-400 whitespace-nowrap">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12 flex flex-col md:flex-row gap-8 md:gap-12">

        <StepSidebar steps={steps} currentStep={currentStep} />

        <div className="flex-1 space-y-8">
          {children}

          <div className="flex justify-between pt-8">
            {currentStep > 0 && (
              <button
                onClick={prevStep}
                className="px-6 py-3 text-gray-500"
              >
                Back
              </button>
            )}

            {currentStep < steps.length - 1 && (
              <Button onClick={nextStep}>Next</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
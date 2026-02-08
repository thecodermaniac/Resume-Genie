import Button from "../components/ui/Button";

const BuilderPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Stepper Header */}
      <div className="border-b border-gray-100 py-4">
        <div className="max-w-4xl mx-auto px-6 flex justify-between items-center">
          <span className="font-bold text-gray-800">Resume Builder</span>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`h-2 w-12 rounded-full ${step <= 2 ? "bg-emerald-400" : "bg-gray-100"}`}
              ></div>
            ))}
          </div>
          <span className="text-sm text-gray-400">Step 2 of 4</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 flex gap-12">
        {/* Sidebar Nav */}
        <div className="w-1/4 space-y-2">
          {["Basics", "Work History", "Education", "Skills", "Finalize"].map(
            (item, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer ${idx === 1 ? "bg-emerald-50 text-emerald-900 font-semibold" : "text-gray-500 hover:bg-gray-50"}`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${idx === 1 ? "bg-emerald-500" : "bg-gray-300"}`}
                ></div>
                {item}
              </div>
            ),
          )}
        </div>

        {/* Form Content */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Work History
          </h2>
          <p className="text-gray-500 mb-8">
            Where have you worked? Start with your most recent role.
          </p>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Job Title
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-emerald-200 outline-none"
                  placeholder="e.g. Software Engineer"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Employer
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-emerald-200 outline-none"
                  placeholder="e.g. Google"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Start Date
                </label>
                <input
                  type="month"
                  className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-emerald-200 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  End Date
                </label>
                <input
                  type="month"
                  className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-emerald-200 outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">
                Description
              </label>
              <textarea
                className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-emerald-200 outline-none min-h-[150px]"
                placeholder="Briefly describe your responsibilities..."
              ></textarea>
              <div className="flex gap-2 mt-2">
                <button className="text-xs font-semibold bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full">
                  + Add "Led a team"
                </button>
                <button className="text-xs font-semibold bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full">
                  + Add "Increased revenue"
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-end gap-4">
            <button className="px-6 py-3 text-gray-500 font-semibold hover:bg-gray-50 rounded-xl">
              Back
            </button>
            <Button className="px-10">Next: Education</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuilderPage;
import { useState } from "react";
import Button from "../components/ui/Button";

const WorkHistoryStep = ({ formData, setFormData, nextStep, prevStep }) => {
  const [jobs, setJobs] = useState(
    formData.workHistory?.length
      ? formData.workHistory
      : [
          {
            role: "",
            company: "",
            startDate: "",
            endDate: "",
            currentlyWorking: false,
            summary: "",
          },
        ]
  );

  const updateJob = (index, field, value) => {
    const updated = [...jobs];
    updated[index][field] = value;

    if (field === "currentlyWorking" && value === true) {
      updated[index].endDate = "";
    }

    setJobs(updated);
    setFormData({
      ...formData,
      workHistory: updated,
    });
  };

  const addJob = () => {
    const newJob = {
      role: "",
      company: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      summary: "",
    };

    const updated = [...jobs, newJob];
    setJobs(updated);
    setFormData({ ...formData, workHistory: updated });
  };

  const removeJob = (index) => {
    const updated = jobs.filter((_, i) => i !== index);
    setJobs(updated);
    setFormData({ ...formData, workHistory: updated });
  };

  return (
    <div className="flex-1">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Work History
      </h2>
      <p className="text-gray-500 mb-10">
        Add your professional experience starting with the most recent.
      </p>

      <div className="space-y-10">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-800">
                Experience {index + 1}
              </h3>

              {jobs.length > 1 && (
                <button
                  onClick={() => removeJob(index)}
                  className="text-sm text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              )}
            </div>

            {/* Role & Company */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Job Title
                </label>
                <input
                  type="text"
                  value={job.role}
                  onChange={(e) =>
                    updateJob(index, "role", e.target.value)
                  }
                  placeholder="e.g. Backend Developer"
                  className="w-full p-4 bg-gray-50 rounded-xl focus:ring-2 focus:ring-emerald-200 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Employer
                </label>
                <input
                  type="text"
                  value={job.company}
                  onChange={(e) =>
                    updateJob(index, "company", e.target.value)
                  }
                  placeholder="e.g. TCS"
                  className="w-full p-4 bg-gray-50 rounded-xl focus:ring-2 focus:ring-emerald-200 outline-none"
                />
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Start Date
                </label>
                <input
                  type="month"
                  value={job.startDate}
                  onChange={(e) =>
                    updateJob(index, "startDate", e.target.value)
                  }
                  className="w-full p-4 bg-gray-50 rounded-xl focus:ring-2 focus:ring-emerald-200 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  End Date
                </label>
                <input
                  type="month"
                  disabled={job.currentlyWorking}
                  value={job.endDate}
                  onChange={(e) =>
                    updateJob(index, "endDate", e.target.value)
                  }
                  className="w-full p-4 bg-gray-50 rounded-xl focus:ring-2 focus:ring-emerald-200 outline-none disabled:bg-gray-100"
                />

                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    checked={job.currentlyWorking}
                    onChange={(e) =>
                      updateJob(index, "currentlyWorking", e.target.checked)
                    }
                  />
                  <span className="text-sm text-gray-500">
                    I currently work here
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">
                Description
              </label>
              <textarea
                value={job.summary}
                onChange={(e) =>
                  updateJob(index, "summary", e.target.value)
                }
                placeholder="Describe your responsibilities and impact..."
                className="w-full p-4 bg-gray-50 rounded-xl focus:ring-2 focus:ring-emerald-200 outline-none min-h-[140px]"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <div className="mt-8">
        <button
          onClick={addJob}
          className="px-5 py-2 text-sm font-semibold bg-emerald-50 text-emerald-600 rounded-full hover:bg-emerald-100"
        >
          + Add Another Experience
        </button>
      </div>

      {/* Navigation */}
      <div className="mt-12 flex justify-end gap-4">
        <button
          onClick={prevStep}
          className="px-6 py-3 text-gray-500 font-semibold hover:bg-gray-50 rounded-xl"
        >
          Back
        </button>

        <Button
          className="px-10"
          onClick={nextStep}
        >
          Next: Education
        </Button>
      </div>
    </div>
  );
};

export default WorkHistoryStep;
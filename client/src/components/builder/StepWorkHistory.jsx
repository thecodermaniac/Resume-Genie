import { useState } from "react";

export default function StepWorkHistory({ formData, setFormData }) {
  const [currentJob, setCurrentJob] = useState({
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    currentlyWorking: false,
    summary: "",
  });

  const addJob = () => {
    if (!currentJob.company || !currentJob.role) return;

    setFormData((prev) => ({
      ...prev,
      workHistory: [...prev.workHistory, currentJob],
    }));

    setCurrentJob({
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      summary: "",
    });
  };

  const removeJob = (index) => {
    setFormData((prev) => ({
      ...prev,
      workHistory: prev.workHistory.filter((_, i) => i !== index),
    }));
  };

  return (
    <>
      <h2 className="text-2xl font-bold">Work History</h2>

      <input
        placeholder="Role"
        className="input"
        value={currentJob.role}
        onChange={(e) => setCurrentJob({ ...currentJob, role: e.target.value })}
      />

      <input
        placeholder="Company"
        className="input"
        value={currentJob.company}
        onChange={(e) =>
          setCurrentJob({ ...currentJob, company: e.target.value })
        }
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="month"
          className="input"
          placeholder="Start Date"
          value={currentJob.startDate}
          onChange={(e) =>
            setCurrentJob({
              ...currentJob,
              startDate: e.target.value,
            })
          }
        />

        {!currentJob.currentlyWorking && (
          <input
            type="month"
            className="input"
            placeholder="End Date"
            value={currentJob.endDate}
            onChange={(e) =>
              setCurrentJob({
                ...currentJob,
                endDate: e.target.value,
              })
            }
          />
        )}
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={currentJob.currentlyWorking}
          onChange={(e) =>
            setCurrentJob({
              ...currentJob,
              currentlyWorking: e.target.checked,
            })
          }
        />
        Currently Working Here
      </label>

      <textarea
        placeholder="Describe responsibilities..."
        className="input min-h-[120px]"
        value={currentJob.summary}
        onChange={(e) =>
          setCurrentJob({
            ...currentJob,
            summary: e.target.value,
          })
        }
      />

      <button
        onClick={addJob}
        className="bg-emerald-500 text-white px-4 py-2 rounded-xl"
      >
        Add Job
      </button>

      <div className="space-y-4">
        {formData.workHistory.map((job, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-xl">
            <div className="font-semibold">
              {job.role} @ {job.company}
            </div>

            <button
              onClick={() => removeJob(index)}
              className="text-xs text-red-500 mt-2"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

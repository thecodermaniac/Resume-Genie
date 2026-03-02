import { useState } from "react";
import Button from "../components/ui/Button";
import ResumeRenderer from "../components/resume/ResumeRenderer";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const steps = ["Basics", "Work History", "Skills", "Finalize"];

const BuilderPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [generatedResume, setGeneratedResume] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState("modern");

  const [formData, setFormData] = useState({
    fullName: "",
    currentPosition: "",
    experienceYears: "",
    techStack: "",
    workHistory: [],
    skills: [],
  });

  const THEMES = [
    { id: "modern", label: "Modern" },
    { id: "minimal", label: "Minimal" },
  ];
  const [currentJob, setCurrentJob] = useState({
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    currentlyWorking: false,
    summary: "",
  });

  const [skillInput, setSkillInput] = useState("");

  /* -------------------- BASIC HANDLERS -------------------- */

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));

  const prevStep = () =>
    setCurrentStep((prev) => Math.max(prev - 1, 0));

  /* -------------------- WORK HISTORY -------------------- */

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

  /* -------------------- SKILLS -------------------- */

  const addSkill = () => {
    if (!skillInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, skillInput.trim()],
    }));
    setSkillInput("");
  };

  const removeSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  /* -------------------- SUBMIT -------------------- */

  const handleSubmit = async () => {
    const formattedWorkHistory = formData.workHistory.map((job) => ({
      company: job.company,
      role: job.role,
      duration: `${job.startDate} - ${job.currentlyWorking ? "Present" : job.endDate
        }`,
      summary: job.summary,
    }));

    const payload = {
      fullName: formData.fullName,
      currentPosition: formData.currentPosition,
      experienceYears: formData.experienceYears,
      techStack: formData.skills.join(", "),
      workHistory: formattedWorkHistory,
    };

    try {
      const res = await fetch("http://localhost:3001/resume/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setGeneratedResume(data);
      nextStep();
    } catch (err) {
      console.error(err);
    }
  };

  const previewRef = useRef();

  const handleDownload = useReactToPrint({
    contentRef: previewRef,
    documentTitle: "Resume",
  });

  /* ========================================================= */

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <div className="border-b border-gray-100 py-4">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <span className="font-bold text-gray-800">Resume Builder</span>

          <div className="flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-12 rounded-full ${index <= currentStep
                  ? "bg-emerald-400"
                  : "bg-gray-100"
                  }`}
              />
            ))}
          </div>

          <span className="text-sm text-gray-400">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 flex gap-12">
        {/* SIDEBAR */}
        <div className="w-1/4 space-y-3">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3 p-3 rounded-xl ${idx === currentStep
                ? "bg-emerald-50 text-emerald-900 font-semibold"
                : "text-gray-500"
                }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${idx === currentStep
                  ? "bg-emerald-500"
                  : "bg-gray-300"
                  }`}
              />
              {item}
            </div>
          ))}
        </div>

        {/* CONTENT */}
        <div className="flex-1 space-y-8">

          {/* ================= BASICS ================= */}
          {currentStep === 0 && (
            <>
              <h2 className="text-2xl font-bold">Basic Info</h2>

              <input
                placeholder="Full Name"
                className="input"
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
              <input
                placeholder="Current Position"
                className="input"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    currentPosition: e.target.value,
                  })
                }
              />
              <input
                type="number"
                placeholder="Years of Experience"
                className="input"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    experienceYears: e.target.value,
                  })
                }
              />
            </>
          )}

          {/* ================= WORK HISTORY ================= */}
          {currentStep === 1 && (
            <>
              <h2 className="text-2xl font-bold">Work History</h2>

              <input
                placeholder="Role"
                className="input"
                value={currentJob.role}
                onChange={(e) =>
                  setCurrentJob({ ...currentJob, role: e.target.value })
                }
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

              {/* LIST JOBS */}
              <div className="space-y-4">
                {formData.workHistory.map((job, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-4 rounded-xl"
                  >
                    <div className="font-semibold">
                      {job.role} @ {job.company}
                    </div>
                    <div className="text-sm text-gray-500">
                      {job.startDate} -{" "}
                      {job.currentlyWorking
                        ? "Present"
                        : job.endDate}
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
          )}

          {/* ================= SKILLS ================= */}
          {currentStep === 2 && (
            <>
              <h2 className="text-2xl font-bold">Skills</h2>

              <div className="flex gap-3">
                <input
                  placeholder="Add skill"
                  className="input"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                />
                <button
                  onClick={addSkill}
                  className="bg-emerald-500 text-white px-4 rounded-xl"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-sm cursor-pointer"
                    onClick={() => removeSkill(index)}
                  >
                    {skill} ✕
                  </span>
                ))}
              </div>
            </>
          )}

          {/* ================= FINALIZE ================= */}
          {currentStep === 3 && (
            <>
              <h2 className="text-2xl font-bold">Generate Resume</h2>

              {!generatedResume && (
                <Button onClick={handleSubmit}>Generate Resume</Button>
              )}

              {generatedResume && (
                <div className="space-y-6">

                  {/* THEME SELECTOR */}
                  <div className="flex gap-3 flex-wrap">
                    {THEMES.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => setSelectedTheme(theme.id)}
                        className={`px-4 py-2 rounded-xl border text-sm ${selectedTheme === theme.id
                          ? "bg-emerald-500 text-white border-emerald-500"
                          : "bg-white border-gray-200"
                          }`}
                      >
                        {theme.label}
                      </button>
                    ))}
                  </div>

                  {/* PREVIEW */}
                  <div className="resume-wrapper">
                    <div ref={previewRef} className="resume-a4">
                      <ResumeRenderer
                        data={generatedResume}
                        theme={selectedTheme}
                      />
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-3">
                    <Button onClick={handleDownload}>
                      Download PDF
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* FOOTER BUTTONS */}
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
};

export default BuilderPage;
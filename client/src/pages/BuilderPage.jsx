import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import toast from "react-hot-toast";

import BuilderLayout from "../components/builder/BuilderLayout";
import StepBasics from "../components/builder/StepBasics";
import StepWorkHistory from "../components/builder/StepWorkHistory";
import StepProjects from "../components/builder/StepProjects";
import StepEducation from "../components/builder/StepEducation";
import StepSkills from "../components/builder/StepSkills";
import StepFinalize from "../components/builder/StepFinalize";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

export default function BuilderPage() {
  const [resumeType, setResumeType] = useState("junior");
  const [currentStep, setCurrentStep] = useState(0);
  const [generatedResume, setGeneratedResume] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState("modern");
  const [isGenerating, setIsGenerating] = useState(false);

  const previewRef = useRef();

  const handleDownload = useReactToPrint({
    contentRef: previewRef,
    documentTitle: "Resume",
  });

  const steps =
    resumeType === "junior"
      ? [
          "Basics",
          "Education",
          "Projects",
          "Work History",
          "Skills",
          "Finalize",
        ]
      : ["Basics", "Work History", "Education", "Skills", "Finalize"];

  const [formData, setFormData] = useState({
    fullName: "",
    currentPosition: "",
    experienceYears: "",
    workHistory: [],
    skills: [],
    projects: [],
    education: [],
  });

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));

  const isStepValid = () => {
    const stepName = steps[currentStep];
    if (stepName === "Basics") {
      return (
        formData.fullName.trim() !== "" &&
        formData.currentPosition.trim() !== "" &&
        formData.experienceYears !== ""
      );
    } else if (stepName === "Work History") {
      return formData.workHistory.length > 0;
    } else if (stepName === "Projects") {
      return formData.projects.length > 0;
    } else if (stepName === "Education") {
      return formData.education.length > 0;
    } else if (stepName === "Skills") {
      return formData.skills.length > 0;
    }
    return true;
  };

  const handleNextStep = () => {
    if (isStepValid()) {
      nextStep();
    } else {
      toast(`Ensure all required fields/add at least one entry for ${steps[currentStep]} to proceed.`, { icon: "⚠️" });
    }
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    if (!isStepValid()) {
      toast("Ensure all required steps are completed before generating.", { icon: "⚠️" });
      return;
    }
    setIsGenerating(true);
    try {
      const payload = {
        resumeType,
        fullName: formData.fullName,
        currentPosition: formData.currentPosition,
        experienceYears: formData.experienceYears,
        skills: formData.skills,
        workHistory: formData.workHistory,
        ...(resumeType === "junior" && { projects: formData.projects }),
        education: formData.education,
      };

      const res = await fetch(`${API_URL}/resume/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`API returned status: ${res.status}`);
      }

      const data = await res.json();
      setGeneratedResume(data);
    } catch (err) {
      console.error(err);
      toast("Failed to generate resume. Please check your connection.", { icon: "⚠️" });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <BuilderLayout
      steps={steps}
      currentStep={currentStep}
      nextStep={handleNextStep}
      prevStep={prevStep}
    >
      {/* Resume Type Selector */}
      {currentStep === 0 && (
        <div className="mb-6">
          <div className="flex gap-3">
            <button
              onClick={() => setResumeType("junior")}
              className={`px-4 py-2 rounded ${
                resumeType === "junior" ? "bg-emerald-500 text-white" : "border"
              }`}
            >
              Junior Professional
            </button>

            <button
              onClick={() => setResumeType("experienced")}
              className={`px-4 py-2 rounded ${
                resumeType === "experienced"
                  ? "bg-emerald-500 text-white"
                  : "border"
              }`}
            >
              Experienced Professional
            </button>
          </div>
        </div>
      )}

      {steps[currentStep] === "Basics" && (
        <StepBasics formData={formData} setFormData={setFormData} />
      )}

      {steps[currentStep] === "Work History" && (
        <StepWorkHistory formData={formData} setFormData={setFormData} />
      )}

      {steps[currentStep] === "Projects" && (
        <StepProjects formData={formData} setFormData={setFormData} />
      )}

      {steps[currentStep] === "Education" && (
        <StepEducation formData={formData} setFormData={setFormData} />
      )}

      {steps[currentStep] === "Skills" && (
        <StepSkills formData={formData} setFormData={setFormData} />
      )}

      {steps[currentStep] === "Finalize" && (
        <StepFinalize
          generatedResume={generatedResume}
          handleSubmit={handleSubmit}
          selectedTheme={selectedTheme}
          setSelectedTheme={setSelectedTheme}
          previewRef={previewRef}
          handleDownload={handleDownload}
          isGenerating={isGenerating}
        />
      )}
    </BuilderLayout>
  );
}

import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";

import BuilderLayout from "../components/builder/BuilderLayout";
import StepBasics from "../components/builder/StepBasics";
import StepWorkHistory from "../components/builder/StepWorkHistory";
import StepProjects from "../components/builder/StepProjects";
import StepEducation from "../components/builder/StepEducation";
import StepSkills from "../components/builder/StepSkills";
import StepFinalize from "../components/builder/StepFinalize";

export default function BuilderPage() {
  const [resumeType, setResumeType] = useState("junior");
  const [currentStep, setCurrentStep] = useState(0);
  const [generatedResume, setGeneratedResume] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState("modern");

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

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    const payload = {
      resumeType,
      fullName: formData.fullName,
      currentPosition: formData.currentPosition,
      experienceYears: formData.experienceYears,
      skills: formData.skills,
      workHistory: formData.workHistory,
      projects: formData.projects,
      education: formData.education,
    };

    const res = await fetch("http://localhost:3001/resume/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setGeneratedResume(data);
    nextStep();
  };

  return (
    <BuilderLayout
      steps={steps}
      currentStep={currentStep}
      nextStep={nextStep}
      prevStep={prevStep}
    >
      {/* Resume Type Selector */}
      {currentStep === 0 && (
        <div className="mb-6">
          <div className="flex gap-3">
            <button
              onClick={() => setResumeType("junior")}
              className={`px-4 py-2 rounded ${resumeType === "junior" ? "bg-emerald-500 text-white" : "border"}`}
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
        />
      )}
    </BuilderLayout>
  );
}

import { useState } from "react";

export default function StepEducation({ formData, setFormData }) {
  const [edu, setEdu] = useState({
    degree: "",
    institution: "",
    startDate: "",
    endDate: "",
  });

  const addEducation = () => {
    if (!edu.degree) return;

    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, edu],
    }));

    setEdu({ degree: "", institution: "", startDate: "", endDate: "" });
  };

  const removeEdu = (index) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  return (
    <>
      <h2 className="text-2xl font-bold">Education</h2>

      <input
        placeholder="Degree"
        className="input"
        value={edu.degree}
        onChange={(e) => setEdu({ ...edu, degree: e.target.value })}
      />

      <input
        placeholder="Institution"
        className="input"
        value={edu.institution}
        onChange={(e) => setEdu({ ...edu, institution: e.target.value })}
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="month"
          placeholder="Start Date"
          className="input"
          value={edu.startDate}
          onChange={(e) => setEdu({ ...edu, startDate: e.target.value })}
        />

        <input
          type="month"
          placeholder="End Date"
          className="input"
          value={edu.endDate}
          onChange={(e) => setEdu({ ...edu, endDate: e.target.value })}
        />
      </div>

      <button
        onClick={addEducation}
        className="bg-emerald-500 text-white px-4 py-2 rounded-xl"
      >
        Add Education
      </button>

      <div className="space-y-4">
        {formData.education.map((edu, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-xl">
            <div className="font-semibold">
              {edu.degree} @ {edu.institution}
            </div>

            <button
              onClick={() => removeEdu(index)}
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

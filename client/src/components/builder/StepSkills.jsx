import { useState } from "react";

export default function StepSkills({ formData, setFormData }) {
  const [skillInput, setSkillInput] = useState("");

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

  return (
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
  );
}
import { useState } from "react";

export default function StepProjects({ formData, setFormData }) {
  // each project holds its own tech array and an input for adding new tech
  const [project, setProject] = useState({
    name: "",
    tech: [],
    techInput: "",
    description: "",
  });

  const addProject = () => {
    if (!project.name) return;

    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, {
        name: project.name,
        tech: project.tech.join(", "),
        description: project.description,
      }],
    }));

    // reset the local project state
    setProject({ name: "", tech: [], techInput: "", description: "" });
  };

  const addTech = () => {
    const value = project.techInput.trim();
    if (!value) return;

    setProject((prev) => ({
      ...prev,
      tech: [...prev.tech, value],
      techInput: "",
    }));
  };

  const removeTech = (index) => {
    setProject((prev) => ({
      ...prev,
      tech: prev.tech.filter((_, i) => i !== index),
    }));
  };

  const removeProject = (index) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  return (
    <>
      <h2 className="text-2xl font-bold">Projects</h2>

      <input
        placeholder="Project Name"
        className="input"
        value={project.name}
        onChange={(e) =>
          setProject({ ...project, name: e.target.value })
        }
      />

      <div className="flex gap-2 items-center">
        <input
          placeholder="Add tech"
          className="input flex-1"
          value={project.techInput}
          onChange={(e) =>
            setProject({ ...project, techInput: e.target.value })
          }
          onKeyDown={(e) => e.key === 'Enter' && addTech()}
        />
        <button
          onClick={addTech}
          className="bg-emerald-500 text-white px-4 py-2 rounded-xl"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {project.tech.map((t, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-sm cursor-pointer"
            onClick={() => removeTech(i)}
          >
            {t} ✕
          </span>
        ))}
      </div>

      <textarea
        placeholder="Description"
        className="input min-h-[120px]"
        value={project.description}
        onChange={(e) =>
          setProject({ ...project, description: e.target.value })
        }
      />

      <button
        onClick={addProject}
        className="bg-emerald-500 text-white px-4 py-2 rounded-xl"
      >
        Add Project
      </button>

      <div className="space-y-4">
        {formData.projects.map((project, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-xl">
            <div className="font-semibold">{project.name}</div>
            {project.tech && project.tech.length > 0 && (
              <div className="text-sm text-gray-600 mt-1">
                Tech: {project.tech}
              </div>
            )}
            {project.description && (
              <div className="mt-2 text-sm">{project.description}</div>
            )}

            <button
              onClick={() => removeProject(index)}
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
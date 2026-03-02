export default function ModernResume({ data }) {
  if (!data) return null;

  const { profile, objective, skills, experience } = data;

  return (
    <div className="bg-white text-[14px] leading-[1.45] text-gray-900 max-w-[800px] mx-auto p-10 font-sans">

      {/* ================= HEADER ================= */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold">
          {profile.name}
        </h1>

        <div className="text-sm text-gray-600 mt-1">
          {profile.role} • {profile.experienceYears} years experience
        </div>
      </div>

      {/* ================= OBJECTIVE (if exists) ================= */}
      {objective && (
        <Section title="Objective">
          <p>{objective}</p>
        </Section>
      )}

      {/* ================= EXPERIENCE ================= */}
      <Section title="Experience">
        {experience.map((job, index) => (
          <div key={index} className="mb-5">

            {/* Role + Duration */}
            <div className="flex justify-between">
              <div className="font-semibold">
                {job.role}
              </div>
              <div className="text-sm text-gray-700">
                {job.duration}
              </div>
            </div>

            {/* Company */}
            <div className="italic text-gray-600 text-sm">
              {job.company}
            </div>

            {/* Responsibilities */}
            <ul className="list-disc ml-5 mt-2 space-y-1">
              {job.responsibilities.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      {/* ================= SKILLS ================= */}
      <Section title="Technical Skills">
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 border border-gray-300 rounded text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </Section>

    </div>
  );
}

/* ================= SECTION COMPONENT ================= */

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <div className="text-blue-700 uppercase tracking-wide font-semibold text-sm">
        {title}
      </div>
      <div className="border-b border-gray-300 mb-3 mt-1"></div>
      {children}
    </div>
  );
}
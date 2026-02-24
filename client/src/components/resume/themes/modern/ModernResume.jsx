export default function ModernResume({ data }) {
  if (!data) return null;

  const { profile, objective, skills, experience } = data;

  return (
    <div className="bg-white shadow p-10 max-w-[800px] mx-auto">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{profile.name}</h1>
        <p className="text-gray-500">
          {profile.role} • {profile.experienceYears} years
        </p>
      </div>

      {/* Objective */}
      <Section title="Objective">
        <p>{objective}</p>
      </Section>

      {/* Skills */}
      <Section title="Skills">
        <div className="flex flex-wrap gap-2">
          {skills.map((s, i) => (
            <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
              {s}
            </span>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section title="Experience">
        {experience.map((job, i) => (
          <div key={i} className="mb-4">
            <h3 className="font-semibold">{job.company}</h3>
            <ul className="list-disc ml-5">
              {job.responsibilities.map((r, idx) => (
                <li key={idx}>{r}</li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <h2 className="font-semibold mb-2">{title}</h2>
      {children}
    </div>
  );
}
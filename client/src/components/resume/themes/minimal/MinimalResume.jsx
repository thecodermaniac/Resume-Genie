export default function MinimalResume({ data }) {
  if (!data) return null;

  const { profile, summary, skills, experience, projects, education } = data;

  return (
    <div className="bg-white text-[13.5px] leading-[1.35] text-gray-900 max-w-[800px] mx-auto px-10 py-8 font-serif resume-a4-minimal">
      {/* ================= NAME ================= */}
      <div className="text-center mb-3">
        <h1 className="text-2xl tracking-widest font-semibold uppercase">
          {profile.name}
        </h1>
      </div>

      {/* ================= SUMMARY ================= */}
      {summary && (
        <Section title="Summary">
          <p className="text-[13px]">{summary}</p>
        </Section>
      )}

      {/* ================= EXPERIENCE ================= */}
      <Section title="Experience">
        {experience.map((job, index) => (
          <div key={index} className="mb-3">
            {/* Role + Duration */}
            <div className="flex justify-between">
              <span className="font-semibold">{job.role}</span>
              <span className="italic">{job.duration}</span>
            </div>

            {/* Company */}
            <div className="flex justify-between text-[12.5px]">
              <span className="uppercase tracking-wide">{job.company}</span>
            </div>

            {/* Bullets */}
            <ul className="list-disc ml-5 mt-1 space-y-[2px]">
              {job.responsibilities.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      {/* ================= SKILLS ================= */}
      <Section title="Skills">
        <div className="mt-1">
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-[13px]">
            {skills.map((skill, index) => (
              <span key={index}>{skill}</span>
            ))}
          </div>
        </div>
      </Section>

      {/* ================= PROJECT ================= */}
      {projects && projects.length > 0 && (
        <Section title="Projects">
          {projects.map((feature, index) => (
            <div key={index} className="mb-3">
              {/* tech + name */}
              <div className="flex justify-between">
                <span className="font-semibold">{feature.name}</span>
                <span className="italic">{feature.techStack}</span>
              </div>

              {/* Bullets */}
              <ul className="list-disc ml-5 mt-1 space-y-[2px]">
                {feature.features.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </Section>
      )}

      {/* ================= EDUCATION ================= */}
      <Section title="Education">
        {education.map((edu, index) => (
          <div key={index} className="mb-3 flex justify-between">
            <div className="flex flex-col">
              <span className="font-semibold">{edu.degree}</span>
              <span className="italic">{edu.institution}</span>
            </div>
            <span className="italic">{edu.duration}</span>
          </div>
        ))}
      </Section>
    </div>
  );
}

/* ================= SECTION COMPONENT ================= */

function Section({ title, children }) {
  return (
    <div className="mb-4">
      <div className="uppercase font-semibold tracking-wide text-[13px] border-b border-gray-400 pb-[2px] mb-2">
        {title}
      </div>
      {children}
    </div>
  );
}

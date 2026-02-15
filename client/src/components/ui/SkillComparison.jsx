const SkillComparison = ({ matched, missing }) => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 ">
      <h3 className="font-bold text-lg text-gray-800 mb-4">
        Skill Gap Analysis
      </h3>

      <div className="space-y-4">
        <div>
          <p className="text-xs uppercase text-gray-400 mb-2">Matched Skills</p>
          <div className="flex flex-wrap gap-2">
            {matched.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs rounded-lg bg-emerald-100 text-emerald-700"
              >
                ✓ {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase text-gray-400 mb-2">Missing Skills</p>
          <div className="flex flex-wrap gap-2">
            {missing.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs rounded-lg bg-amber-100 text-amber-700"
              >
                ⚠ {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillComparison;
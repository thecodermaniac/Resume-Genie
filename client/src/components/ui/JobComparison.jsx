const JobComparison = ({ analysis }) => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
      <h3 className="font-bold text-lg text-gray-800 mb-4">
        Resume vs Job Description
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Resume Strengths */}
        <div>
          <h4 className="font-semibold text-emerald-600 mb-2">What You Have</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            {analysis.roleFit.map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </div>

        {/* Gaps */}
        <div>
          <h4 className="font-semibold text-amber-600 mb-2">
            Where You Fall Short
          </h4>
          <ul className="space-y-2 text-sm text-gray-600">
            {analysis.jobSpecificScore.criticalGaps.map((gap, i) => (
              <li key={i}>• {gap}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};


export default JobComparison;
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";


const ScoreRadar = ({ ats, match, jobSpecific, summary }) => {
  const data = [
    { metric: "ATS", value: ats },
    { metric: "Match", value: match },
    { metric: "Job Specific", value: jobSpecific },
  ];

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="font-bold text-lg text-gray-800 mb-4">
          Overall Performance Radar
        </h3>
        <p className="text-sm text-gray-500 mt-3 leading-relaxed">{summary}</p>
      </div>

      <div className="h-64">
        <ResponsiveContainer>
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="metric" />
            <PolarRadiusAxis domain={[0, 100]} />
            <Radar
              name="Score"
              dataKey="value"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.4}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ScoreRadar;
import { useState, useRef, useEffect } from "react";
import { AlertCircle, CheckCircle, Upload, RotateCcw } from "lucide-react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer
} from "recharts";

const AnalysisPage = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [animatedScore, setAnimatedScore] = useState(0);
  const fileInputRef = useRef(null);

  /* Animated Score Transition */
  useEffect(() => {
    if (!analysis?.atsScore?.score) return;

    let start = 0;
    const end = analysis.atsScore.score;
    const duration = 800;
    const stepTime = 10;
    const increment = end / (duration / stepTime);

    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(interval);
      }
      setAnimatedScore(Math.floor(start));
    }, stepTime);

    return () => clearInterval(interval);
  }, [analysis]);

  const handleUpload = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);
    formData.append(
      "jobDescription",
      jobDescription || "__NO_JOB_DESCRIPTION_PROVIDED__"
    );

    setLoading(true);
    setAnalysis(null);

    try {
      const response = await fetch(
        "http://localhost:3001/resume/analyse",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleReset = () => {
    setAnalysis(null);
    setJobDescription("");
    setAnimatedScore(0);
  };

  const score = animatedScore;
  const strokeOffset = 440 - (440 * score) / 100;

  const radarData = analysis
    ? [
        {
          metric: "ATS",
          value: analysis.atsScore.score
        },
        {
          metric: "Job Match",
          value: analysis.jobMatch.matchScore
        },
        {
          metric: "Job Specific",
          value: analysis.jobSpecificScore.score
        }
      ]
    : [];

  return (
    <div className="min-h-screen max-w-6xl mx-auto mt-6 px-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Analysis Dashboard
      </h2>

      {/* Upload Section */}
      {!analysis && !loading && (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">

          <textarea
            placeholder="Optional: Paste Job Description..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full h-32 p-4 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-400"
          />

          <button
            onClick={() => fileInputRef.current.click()}
            className="flex items-center gap-3 px-6 py-3 bg-emerald-500 text-white rounded-xl shadow hover:bg-emerald-600 transition"
          >
            <Upload size={20} />
            Upload Resume for Analysis
          </button>

          <input
            type="file"
            accept="application/pdf"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => handleUpload(e.target.files[0])}
          />
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-6">
          <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
          <p className="text-gray-500 text-sm">
            Analyzing your resume...
          </p>
        </div>
      )}

      {/* Results */}
      {analysis && !loading && (
        <div className="space-y-8">

          {/* Reset */}
          <div className="flex justify-end">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 text-sm bg-gray-100 px-4 py-2 rounded-xl hover:bg-gray-200"
            >
              <RotateCcw size={16} />
              Reset
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* LEFT */}
            <div className="space-y-6">

              {/* Animated ATS Score */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center">
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="80" cy="80" r="70"
                      strokeWidth="12"
                      fill="transparent"
                      className="text-gray-100"
                    />
                    <circle cx="80" cy="80" r="70"
                      strokeWidth="12"
                      fill="transparent"
                      strokeDasharray="440"
                      strokeDashoffset={strokeOffset}
                      className="text-emerald-400 transition-all duration-300"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-gray-900">
                      {score}
                    </span>
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                      ATS Score
                    </span>
                  </div>
                </div>
              </div>

              {/* Radar Chart */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" />
                    <Radar
                      dataKey="value"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.4}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

            </div>

            {/* RIGHT */}
            <div className="md:col-span-2 space-y-6">

              {/* Side-by-Side Comparison */}
              {jobDescription && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-3xl shadow-sm border">
                    <h4 className="font-bold mb-3">Job Description</h4>
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">
                      {jobDescription}
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-3xl shadow-sm border">
                    <h4 className="font-bold mb-3">Matched Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.jobMatch.matchedSkills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs bg-emerald-100 text-emerald-700 rounded-lg"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Improvements */}
              <SectionList
                title="Improvements"
                items={analysis.improvements}
              />

              {/* Strengths */}
              <SectionList
                title="Strengths"
                items={analysis.strengths}
                success
              />

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SectionList = ({ title, items, success }) => {
  if (!items?.length) return null;

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
      <h3 className="font-bold text-lg text-gray-800 mb-4">{title}</h3>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex gap-3 items-start">
            {success ? (
              <CheckCircle size={18} className="text-emerald-500 mt-1" />
            ) : (
              <AlertCircle size={18} className="text-amber-500 mt-1" />
            )}
            <p className="text-sm text-gray-600">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalysisPage;
import { useState, useRef } from "react";
import { Upload, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";

import SkillComparison from "../components/ui/SkillComparison";
import JobComparison from "../components/ui/JobComparison";
import AnimatedMetric from "../components/ui/AnimatedMetric";
import ScoreRadar from "../components/ui/ScoreRadar";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

const AnalysisPage = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const fileInputRef = useRef(null);

  const handleUpload = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);
    formData.append(
      "jobDescription",
      jobDescription || "__NO_JOB_DESCRIPTION_PROVIDED__",
    );

    setLoading(true);
    setAnalysis(null);

    try {
      const response = await fetch(`${API_URL}/resume/analyse`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API returned status: ${response.status}`);
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      console.error(err);
      toast("Failed to analyze resume. Please try again.", { icon: "⚠️" });
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleReset = () => {
    setAnalysis(null);
    setJobDescription("");
  };

  return (
    <div className="min-h-screen max-w-6xl mx-auto mt-6 px-4">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="text-3xl font-bold text-gray-900">
          Analysis Dashboard
        </h2>
        {analysis && !loading && (
          <div className="flex justify-end">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 text-sm bg-gray-100 px-4 py-2 rounded-xl hover:bg-gray-200"
            >
              <RotateCcw size={16} />
              Reset
            </button>
          </div>
        )}
      </div>

      {/* Upload Section */}
      {!analysis && !loading && (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
          <textarea
            placeholder="Job Description of the role you're applying for (required)"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full h-32 p-4 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-400"
          />

          <button
            onClick={() => fileInputRef.current.click()}
            disabled={!jobDescription}
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
          <p className="text-gray-500 text-sm">Analyzing your resume...</p>
        </div>
      )}

      {/* Results */}
      {analysis && !loading && (
        <div className="space-y-8">
          {/* KPI Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatedMetric
              title="ATS Score"
              value={analysis.atsScore.score}
              subtitle={analysis.atsScore.reasoning}
            />

            <AnimatedMetric
              title="Job Match"
              value={analysis.jobMatch.matchScore}
              subtitle="Alignment with job description"
            />

            <AnimatedMetric
              title="Job Specific"
              value={analysis.jobSpecificScore.score}
              subtitle={analysis.jobSpecificScore.reasoning}
            />
          </div>

          {/* Radar Chart */}
          <ScoreRadar
            ats={analysis.atsScore.score}
            match={analysis.jobMatch.matchScore}
            jobSpecific={analysis.jobSpecificScore.score}
            summary={analysis.summary}
          />

          {/* Skill Comparison */}
          <SkillComparison
            matched={analysis.jobMatch.matchedSkills}
            missing={analysis.jobMatch.missingSkills}
          />

          {/* Resume vs Job */}
          <JobComparison analysis={analysis} />

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6">
              Resume Enhancement Insights
            </h3>

            <div className="space-y-6">
              {/* Rewrite Suggestions */}
              <div>
                <h4 className="font-semibold mb-2 text-emerald-600">
                  Rewrite Suggestions
                </h4>
                {analysis.resumeRewriteSuggestions.map((item, i) => (
                  <div key={i} className="text-sm text-gray-600 mb-2">
                    <span className="font-semibold text-gray-800 bg-amber-100">
                      {item.section}:
                    </span>{" "}
                    {item.suggestion}
                  </div>
                ))}
              </div>

              {/* PDF Annotations */}
              <div>
                <h4 className="font-semibold mb-2 text-emerald-600">
                  PDF Section Feedback
                </h4>
                {analysis.pdfAnnotations.map((item, i) => (
                  <div key={i} className="text-sm text-gray-600 mb-2">
                    <span className="font-semibold text-gray-800 bg-amber-100">
                      {item.section}:
                    </span>{" "}
                    {item.comment}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AnalysisPage;

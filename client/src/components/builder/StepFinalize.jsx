import Button from "../ui/Button";
import ResumeRenderer from "../resume/ResumeRenderer";

const THEMES = [
  { id: "modern", label: "Modern" },
  { id: "minimal", label: "Minimal" },
];

export default function StepFinalize({
  generatedResume,
  handleSubmit,
  selectedTheme,
  setSelectedTheme,
  previewRef,
  handleDownload,
}) {
  return (
    <>
      <h2 className="text-2xl font-bold">Generate Resume</h2>

      {!generatedResume && (
        <Button onClick={handleSubmit}>
          Generate Resume
        </Button>
      )}

      {generatedResume && (
        <div className="space-y-6">

          <div className="flex gap-3">
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className={`px-4 py-2 rounded-xl border ${
                  selectedTheme === theme.id
                    ? "bg-emerald-500 text-white"
                    : "bg-white"
                }`}
              >
                {theme.label}
              </button>
            ))}
          </div>

          <div className="resume-wrapper">
            <div ref={previewRef} >
              <ResumeRenderer
                data={generatedResume}
                theme={selectedTheme}
              />
            </div>
          </div>

          <Button onClick={handleDownload}>
            Download PDF
          </Button>
        </div>
      )}
    </>
  );
}
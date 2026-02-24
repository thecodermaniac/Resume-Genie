import ModernResume from "./themes/modern/ModernResume";
import MinimalResume from "./themes/minimal/MinimalResume";

const THEMES = {
  modern: ModernResume,
  minimal: MinimalResume,
};

export default function ResumeRenderer({ data, theme = "modern" }) {
  const Component = THEMES[theme] || ModernResume;
  return <Component data={data} />;
}
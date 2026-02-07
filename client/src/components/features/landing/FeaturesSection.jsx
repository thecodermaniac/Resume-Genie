import { CheckCircle2, FileText, MessageSquare, PenTool } from "lucide-react";
import SectionBadge from "../../ui/SectionBadge";
import MockChatUI from "./MockChatUI";
import MockAnalysisUI from "./MockAnalysisUI";
import MockBuilderUI from "./MockBuilderUI";


const FeaturesSection = () => {
  const features = [
    {
      badge: "The Interviewer",
      title: "Talk to your Resume.",
      desc: "Don't just read your resume; interact with it. Our AI acts as a Hiring Manager, grilling you on your experience so you're ready for the real thing.",
      icon: <MessageSquare size={18} />,
      points: ["Mock Interviews", "Gap Analysis", "Instant Memory Recall"],
      mock: <MockChatUI />,
      layout: "normal" // Text left, Image right
    },
    {
      badge: "The Critic",
      title: "Pass the Robots.",
      desc: "We analyze your resume against thousands of job descriptions to ensure it passes Applicant Tracking Systems (ATS) and impresses humans.",
      icon: <FileText size={18} />,
      points: ["ATS Score Simulator", "Impact Auditor", "Brevity Checker"],
      mock: <MockAnalysisUI />,
      layout: "reverse" // Image left, Text right
    },
    {
      badge: "The Architect",
      title: "Build in Minutes.",
      desc: "Stop fighting with margins. Our step-by-step wizard helps you build a perfectly formatted, professional resume with smart auto-complete.",
      icon: <PenTool size={18} />,
      points: ["Smart Auto-Complete", "1-Click Reformatting", "Live Preview"],
      mock: <MockBuilderUI />,
      layout: "normal"
    }
  ];

  return (
    <section id="features" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background Blob for section */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px] -z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">Powerful Features</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Everything you need to go from "Open to Work" to "Hired".</p>
        </div>

        <div className="space-y-32">
          {features.map((feature, idx) => (
            <div key={idx} className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${feature.layout === 'reverse' ? 'md:flex-row-reverse' : ''}`}>
              {/* Text Side */}
              <div className="flex-1">
                <SectionBadge icon={feature.icon} text={feature.badge} />
                <h3 className="text-3xl font-bold text-gray-900 mb-6">{feature.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">{feature.desc}</p>
                <ul className="space-y-3">
                  {feature.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <span className="text-gray-700 font-medium">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Visual Side */}
              <div className="flex-1 w-full">
                <div className="relative">
                  {/* Glow behind mock */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-tr from-emerald-200/40 to-teal-200/40 rounded-full blur-[60px] -z-10"></div>
                  {feature.mock}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
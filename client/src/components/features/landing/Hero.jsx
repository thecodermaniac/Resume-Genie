import { CheckCircle2, FileText, MessageSquare, PenTool } from "lucide-react";
import GradientBlob from "../../visuals/GradientBlob";
import Button from "../../ui/Button";

const Hero = () => {
  return (
    <main className="relative max-w-4xl mx-auto text-center pt-20 pb-12 px-4 ">
      {/* 1. Top Center Glow (Behind Hero Text) - Made slightly stronger */}
      <GradientBlob
        color="emerald"
        size="lg"
        position="top-0 left-1/2"
      />
      <GradientBlob
        color="blue"
        size="lg"
        position="top-0 right-1/2"
      />
      {/* <div className="absolute z-0 top-0 left-1/2  w-full h-full bg-gradient-to-b from-emerald-300/30 via-teal-200/30 to-transparent rounded-full blur-[120px]" /> */}
      {/* <div className="absolute z-0 top-0 right-1/2  w-full h-full bg-gradient-to-b from-indigo-300/30 via-blue-200/30 to-transparent rounded-full blur-[120px]" /> */}
      <h1 className="relative z-10 text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
        Simplifying Your <br />
        <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600 animate-gradient">
          Job Search.
        </span>
      </h1>
      <p className="relative z-10 text-gray-500 text-lg mb-12 max-w-xl mx-auto">
        Your friendly AI career coach. Build, analyze, and chat with your resume
        to land your dream job faster.
      </p>

      {/* Feature Cards Triptych */}
      {/* Feature Cards Triptych */}
      <div className=" z-10 grid md:grid-cols-3 gap-6 mb-16 text-left">
        {[
          {
            title: "Resume Q&A",
            desc: "Ask our AI specific questions about your resume gaps and strengths.",
            icon: <MessageSquare className="w-6 h-6 text-emerald-600" />,
            accent:
              "group-hover:border-emerald-200 group-hover:shadow-emerald-100",
          },
          {
            title: "Career Analysis",
            desc: "Get expert scoring and detailed actionable feedback instantly.",
            icon: <FileText className="w-6 h-6 text-blue-500" />,
            accent: "group-hover:border-blue-200 group-hover:shadow-blue-100",
          },
          {
            title: "Resume Builder",
            desc: "Create a perfectly formatted resume from scratch with our wizard.",
            icon: <PenTool className="w-6 h-6 text-orange-500" />,
            accent:
              "group-hover:border-orange-200 group-hover:shadow-orange-100",
          },
        ].map((feature, idx) => (
          <div
            key={idx}
            className={`
                    group relative p-8 bg-white/60 backdrop-blur-lg 
                    border border-white/50 
                    rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] 
                    hover:-translate-y-1 transition-all duration-300
                    hover:bg-white
                    hover:shadow-xl
                    ${feature.accent} border-2 border-transparent
                `}
          >
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-gray-50 group-hover:scale-110 transition-transform duration-300">
              {feature.icon}
            </div>

            <h3 className="font-bold text-gray-900 text-xl mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {feature.desc}
            </p>

            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gray-50 to-transparent rounded-tr-3xl -z-10 group-hover:from-gray-100 transition-colors"></div>
          </div>
        ))}
      </div>

      {/* <button className="px-10 py-4 bg-emerald-400 hover:bg-emerald-500 text-emerald-950 font-bold text-lg rounded-full transition-all shadow-lg shadow-emerald-200 hover:shadow-emerald-300 hover:scale-105 active:scale-95">
            Start Now
        </button> */}

      <div className="flex flex-col md:flex-row justify-center gap-4 mb-20">
        <Button className="px-10 py-4 text-lg">
          Start Building Free
        </Button>
        <Button variant="secondary" className="px-10 py-4 text-lg">
          See It In Action
        </Button>
      </div>
    </main>
  );
};

export default Hero;

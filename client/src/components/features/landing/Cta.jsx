import Button from "../../ui/Button";
import { ArrowRight } from "lucide-react";

const Cta = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto bg-gray-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/40 via-gray-900 to-gray-900 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-teal-900/30 to-transparent rounded-full blur-[100px] -z-10"></div>

        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 leading-tight">
          Stop guessing. <br />
          Start getting hired.
        </h2>
        <p className="text-gray-300 text-xl mb-10 max-w-xl mx-auto">
          Join thousands of professionals using AI to accelerate their career
          path today.
        </p>
        <div className="flex justify-center">
          <Button className="px-12 py-5 text-lg">
            Build My Resume for Free <ArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Cta;

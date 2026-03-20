import { Check, X } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Basic",
      price: "0",
      cta: "Get Started",
      features: ["1 Resume Build", "Basic Q&A", "Limited Analysis"],
      missing: ["ATS Simulator", "Expert Formatting"]
    },
    {
      name: "Pro",
      price: "19",
      cta: "Upgrade to Pro",
      popular: true,
      features: ["Unlimited Builds", "Unlimited Q&A", "Full Expert Analysis", "ATS Simulator", "Priority Support"]
    },
    {
      name: "Team",
      price: "49",
      cta: "Contact Sales",
      features: ["All Pro Features", "Team Dashboard", "Shared Templates", "Admin Controls", "Account Manager"]
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-5xl font-extrabold text-gray-900 mb-4">Choose your plan</h2>
          <p className="text-gray-500">Invest in your career for less than the cost of a lunch.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <div key={idx} className={`relative p-8 rounded-3xl border flex flex-col h-full transition-all duration-300 ${plan.popular
                ? 'bg-white border-emerald-400 shadow-2xl shadow-emerald-100 scale-105 z-10'
                : 'bg-gray-50 border-gray-100 hover:shadow-lg'
              }`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-400 text-white text-xs font-bold rounded-full shadow-sm">
                  Most Popular
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-extrabold text-gray-900">${plan.price}</span>
                  <span className="text-gray-400 text-sm">/mo</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                    <Check size={16} className={`flex-shrink-0 ${plan.popular ? 'text-emerald-500' : 'text-gray-400'}`} />
                    {f}
                  </li>
                ))}
                {plan.missing && plan.missing.map((m, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-300 decoration-gray-300">
                    <X size={16} className="flex-shrink-0" />
                    <span className="line-through">{m}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-full font-bold text-sm transition-all ${plan.popular
                  ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-lg hover:shadow-emerald-200 hover:scale-105'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                }`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
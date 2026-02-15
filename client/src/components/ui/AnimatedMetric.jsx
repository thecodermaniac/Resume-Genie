import { useCountUp } from "../../utility/useCountUp";

const AnimatedMetric = ({ title, value, subtitle }) => {
  const animatedValue = useCountUp(value);

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center">
      <h4 className="text-sm uppercase tracking-wider text-gray-400 font-semibold">
        {title}
      </h4>
      <p className="text-4xl font-bold mt-3 text-emerald-600">
        {animatedValue}
      </p>
      <p className="text-xs text-gray-500 mt-3 leading-relaxed">{subtitle}</p>
    </div>
  );
};

export default AnimatedMetric;
import { TrendingUp } from "lucide-react";

const NewCreditScoreCard = ({ creditScore }) => (
  <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-white font-semibold text-lg">Credit Score</h3>
      <div className="p-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl border border-emerald-400/30">
        <TrendingUp className="w-5 h-5 text-emerald-400" />
      </div>
    </div>

    <div className="relative flex justify-start items-center">
      <div className="flex items-end space-x-4">
        <div className="text-5xl font-bold text-white">{creditScore}</div>
        <div>
          <div
            className={`px-4 py-2 rounded-full text-xs font-semibold ${
              creditScore >= 750
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-400/30"
                : creditScore >= 650
                ? "bg-yellow-500/20 text-yellow-400 border border-yellow-400/30"
                : "bg-red-500/20 text-red-400 border border-red-400/30"
            }`}
          >
            {creditScore >= 750
              ? "Excellent"
              : creditScore >= 650
              ? "Good"
              : "Fair"}
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default NewCreditScoreCard;

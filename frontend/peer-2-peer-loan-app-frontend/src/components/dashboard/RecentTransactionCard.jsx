import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

const RecentTransactionsCard = ({ recentTransactions }) => {
  console.log(recentTransactions);

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300 col-span-2">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white font-semibold text-lg">
          Recent Transactions
        </h3>
        <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-300">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {recentTransactions
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // sort recent → old
          .slice(0, 5)
          .map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center space-x-4 p-4 bg-gradient-to-r from-slate-800/30 to-slate-700/30 rounded-2xl border border-white/10 hover:bg-gradient-to-r hover:from-slate-800/40 hover:to-slate-700/40 transition-all duration-300"
            >
              <div
              className={`p-3 rounded-2xl ${
                transaction.type === "credit"
                  ? "bg-emerald-500/20 border border-emerald-400/30"
                  : "bg-red-500/20 border border-red-400/30"
              }`}
            >
              {transaction.type === "credit" ||
              transaction.type === "WALLET_TOP_UP" ||
              transaction.type === "LOAN_FUNDING" ? (
                <ArrowDownLeft className="w-5 h-5 text-emerald-400" />
              ) : (
                <ArrowUpRight className="w-5 h-5 text-red-400" />
              )}
            </div>

            <div className="flex-1">
              <h4 className="text-white font-medium mb-1">
                {transaction.type}
              </h4>
              <h6 className="text-white font-medium mb-1">
                {transaction.description}
              </h6>
              <div className="flex items-center space-x-2">
                <span className="text-white/60 text-sm">
                  {new Intl.DateTimeFormat("en-GB", {
                    dateStyle: "short", // gives dd/mm/yyyy
                    timeStyle: "short", // gives hh:mm
                  }).format(new Date(transaction.timestamp))}
                </span>

                <span className="text-white/40">•</span>
                {/* <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    transaction.category === "Education"
                      ? "bg-blue-500/20 text-blue-400"
                      : transaction.category === "Income"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-purple-500/20 text-purple-400"
                  }`}
                >
                  {transaction.category}
                </span> */}
              </div>
            </div>

            <div
              className={`text-right font-bold ${
                transaction.type === "credit" ||
                transaction.type === "WALLET_TOP_UP" ||
                transaction.type === "LOAN_FUNDING"
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >
              {transaction.type === "credit" ||
              transaction.type === "WALLET_TOP_UP" ||
              transaction.type === "LOAN_FUNDING"
                ? "+"
                : "-"}
              ₹{Math.abs(transaction.amount).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RecentTransactionsCard;

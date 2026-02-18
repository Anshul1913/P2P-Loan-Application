import { Calendar, CheckCircle, Eye, FileText } from "lucide-react";

 const ActiveLoansCard = ({activeLoans}) => {
  console.log(activeLoans);
  
  return(
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white font-semibold text-lg">Active Loans</h3>
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl border border-orange-400/30">
            <FileText className="w-5 h-5 text-orange-400" />
          </div>
          <button className="p-2 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-all duration-300">
            <Eye className="w-4 h-4 text-white/70" />
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {activeLoans.map((loan) => (
          <div key={loan.id} className="bg-gradient-to-r from-slate-800/40 to-slate-700/40 rounded-2xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-medium">{loan.type}</h4>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 text-xs font-medium capitalize">{loan.status}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-white/60 text-xs mb-1">Total Amount</p>
                <p className="text-white font-semibold">₹{loan.principal}</p>
              </div>
              <div>
                <p className="text-white/60 text-xs mb-1">Paid</p>
                <p className="text-white font-semibold">₹{loan.principal}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-xs text-white/60 mb-2">
                <span>Progress</span>
                <span>{Math.round((loan.paid / loan.amount) * 100)}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full shadow-lg shadow-blue-400/30"
                  style={{ width: `${(loan.paid / loan.amount) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-white/60" />
                <span className="text-white/70 text-sm">Next: {loan.nextPayment}</span>
              </div>
              <span className="text-white font-semibold">₹{((loan.amount - loan.paid) / 12).toFixed(0)}/mo</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveLoansCard;
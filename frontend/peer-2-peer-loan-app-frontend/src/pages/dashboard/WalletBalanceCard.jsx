import { Wallet } from "lucide-react";

 const WalletBalanceCard = ({walletBalance}) => {
  
  return(
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold text-lg">Wallet Balance</h3>
        <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-400/30">
          <Wallet className="w-5 h-5 text-blue-400" />
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="text-4xl font-bold text-white mb-2">₹{walletBalance.toLocaleString()}</div>
          <div className="flex items-center space-x-2">
          </div>
        </div>
      </div>
    </div>
  );
}
  export default WalletBalanceCard;
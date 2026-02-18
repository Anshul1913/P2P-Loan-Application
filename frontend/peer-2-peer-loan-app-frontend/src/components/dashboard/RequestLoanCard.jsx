import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RequestLoanCard = () => {
  const navigate = useNavigate();
  return(
  <div> 
    <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl p-6 border border-purple-400/30 shadow-2xl hover:bg-gradient-to-br hover:from-purple-500/25 hover:to-pink-500/25 transition-all duration-300 cursor-pointer group">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold text-lg">Request a Loan</h3>
        
      </div>
      
      <p className="text-white/70 text-sm mb-2 leading-relaxed">
        Apply for loans with competitive interest rates and flexible repayment options.
      </p>
      
      {/* <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-white/70 text-sm">Interest Rate</span>
          <span className="text-white font-semibold">From 3%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white/70 text-sm">Max Amount</span>
          <span className="text-white font-semibold">₹1,00,000</span>
        </div>
      </div> */}

      <button onClick={() => {navigate('/loan-request')}} className="w-full  bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
        Apply Now
      </button>
    </div>
    </div>
  );
}
  export default RequestLoanCard;
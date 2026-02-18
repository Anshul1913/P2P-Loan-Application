import { useNavigate } from "react-router-dom";

const SubmitLoanRequestCard = () => {
  const navigate = useNavigate(); 
 return (
    <div className="bg-white text-gray-700 shadow rounded-lg p-6 text-left">
      
      {/* icon + title row */}
      <div className="flex items-center gap-3 mb-3">
      <span className="text-5xl ">🎓</span>
        <h3 className="text-lg font-semibold">
          Submit Loan Request
        </h3>
      </div>

      {/* subtitle */}
      <p className="text-sm ml-20 mb-4">
        Request Some Money
      </p>

      {/* call-to-action */}
      <button
        onClick={() => navigate("/loan-request")}
        className="rounded-2xl my-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-indigo-500 text-white hover:scale-105 hover:shadow-xl hover:shadow-pink-500/30 ml-24"
      >
        Request Loan
      </button>
    </div>
  );
};

export default SubmitLoanRequestCard;

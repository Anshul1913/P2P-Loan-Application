import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoanApi from "../../services/LoanService";

const ReviewLoanRequest = () => {
  const [loan, setLoan] = useState({
    id: 1,
    borrowerName: "Emily Carter",
    borrowerUniversity: "Harvard University",
    borrowerPhotoUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    title: "Tuition Fees",
    amount: 15000,
    description:
      "I am seeking a loan to cover my tuition fees for the upcoming academic year. This will allow me to focus on my studies without financial distractions.",
    interestRate: 6.75,
    suggestedCommitAmount: 10000,
  });
  const [commitAmount, setCommitAmount] = useState("");
  const { id } = useParams(); // ✅ Extract `id` from the URL

  useEffect(() => {
    fetchLoanDetails();
  }, [id]);

  const fetchLoanDetails = async () => {
    try {
      const response = await LoanApi.getLoanDetail(id);
      setLoan(response);
      // setCommitAmount(response.data.suggestedCommitAmount || "");
    } catch (error) {
      console.error("Error fetching loan details:", error);
    }
  };

  const handleAccept = async () => {
    try {
      const response = await LoanApi.fundLoan(loan.id, commitAmount);
      console.log("Loan accepted response:", response);
      setCommitAmount("");
      alert("Loan accepted!");
    } catch (error) {
      console.error("Error accepting loan:", error);
    }
    fetchLoanDetails();
  };

  const handleReject = async () => {
    try {
      await LoanApi.rejectLoan(loan.id);
      alert("Loan rejected!");
    } catch (error) {
      console.error("Error rejecting loan:", error);
    }
  };

  //   .catch((err) => console.error("Error rejecting loan:", err));
  if (!loan) {
    return <div className="p-6 text-gray-500">Loading loan details...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="flex border-b">
        {/* Profile */}
        <div className="w-1/3 p-6 flex flex-col items-center justify-center border-r">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt={loan.borrowerName}
            className="w-16 h-16 rounded-full mb-3"
          />
          <h3 className="font-semibold">{loan.borrowerName}</h3>
          <p className="text-gray-500 text-sm">{loan.borrowerUniversity}</p>
        </div>

        {/* Loan Details */}
        <div className="w-2/3 p-6">
          <h2 className="text-xl font-bold mb-4">Loan Details</h2>
          <div className="text-sm space-y-2">
            <div>
              <strong>Title:</strong> {loan.title}
            </div>
            <div>
              <strong>Total Amount Needed:</strong> ₹ {loan.amount.toLocaleString()}
            </div>
            <div>
              <strong>Amount Already Funded:</strong> ₹ {loan.totalFundedAmount ? loan.totalFundedAmount.toLocaleString() : 0}
            </div>
            <div>
              <strong>Amount Need to Fund:</strong> ₹ {loan.amount - (loan.totalFundedAmount || 0)}
            </div>
            <div>
              <strong>Description:</strong> {loan.purpose}
            </div>
            <div>
              <strong>Interest Rate:</strong> {loan.maxInterestRateAcceptable}%
            </div>
            <div>
              <strong>Loan Request Expiry Date:</strong>{" "}
              {new Date(loan.expiryDate).toLocaleDateString()}
            </div>
            <div>
              <strong>Status:</strong> {loan.status}
            </div>
            <div>
              <strong>Credit Score:</strong> {loan.score}
            </div>
          </div>
        </div>
      </div>

      {/* Commit Section */}
      <div className="p-6 flex justify-between items-center">
        <div>
          <h3 className="font-semibold mb-2">Commit Amount</h3>
          <input
            type="text"
            value={commitAmount}
            onChange={(e) => setCommitAmount(e.target.value)}
            className="  px-3 py-2 focus:outline-none rounded-lg border transition border-gray-500 focus:ring-2 focus:ring-indigo-500 "
          />
           {/* className={`w-full p-3 border rounded-lg transition focus:outline-none  ${
                errors.panNumber
                  ? "border-red-500 animate-shake"
                  : "border-gray-300 focus:ring-2 focus:ring-indigo-500 "
              }`} */}
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleReject}
            className="px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-100"
          >
            Reject
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewLoanRequest;

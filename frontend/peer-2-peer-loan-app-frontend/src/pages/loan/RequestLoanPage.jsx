import React, { useState } from "react";
import LoanApi from "../../services/LoanService";
import { useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";

const RequestLoanPage = () => {
  const [form, setForm] = useState({
    amount: "",
    maxInterestRateAcceptable: 5,
    durationMonths: "",
    title: "",
    purpose: "",
  });
  const [expectedAmount, setExpectedAmount] = useState(0);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value) || 0;

    if (name === "amount") {
      const processingFeePercent = 3; // 3%
      const gstPercent = 18; // 18%

      const processingFee = (numericValue * processingFeePercent) / 100;
      const gstOnFee = (processingFee * gstPercent) / 100;
      const netDisbursed = numericValue - (processingFee + gstOnFee);

      setExpectedAmount(netDisbursed); // update state for expected amount
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with values:", form);
    // Add form validation and submission logic here
    if (!form.amount || !form.durationMonths || !form.title || !form.purpose) {
      alert("Please fill in all required fields.");
      return;
    }
    // Handle form submission logic here

    try {
      const response = await LoanApi.requestLoan(form);
      console.log("Loan request successful:", response);
      navigate("/student-dashboard");
    } catch (error) {
      console.error("Error uploading KYC:", error);
      alert("Failed to upload KYC. Please try again.");
      return;
    }
    console.log("Form submitted:", form);
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-slate-900 via-purple-900 to-slate-900  flex flex-col items-center py-8  relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-600/20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-600/20 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-400/10 to-purple-600/10 blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-2xl w-full border border-white/20 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
            Request Your
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Student Loan
            </span>
          </h1>
          <p className="text-white/70 text-sm leading-relaxed">
            Get the funding you need for your education journey
          </p>
        </div>

        {/* Quick Tip Card */}

        <div className="mb-4 group relative bg-gradient-to-br from-yellow-300/50 to-yellow-500/80 p-6 rounded-2xl border border-yellow-500/30 backdrop-blur-sm hover:scale-105 transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          <div className="relative z-10">
            <div>
              <h3 className="text-amber-300 font-semibold text-sm mb-3 flex items-center">
                💡 Quick Tip
              </h3>
              <p className="text-white/90 text-xs leading-relaxed">
                Provide accurate and detailed information to increase your
                chances of loan approval and get better terms.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-4 group relative bg-gradient-to-r from-rose-400/60 to-red-500/70   rounded-2xl p-5  border border-rose-400/30 shadow-lg backdrop-blur-sm hover:scale-105 transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          <div className="relative z-10">
            <div>
              <h3 className="text-rose-100 font-semibold text-sm mb-3 flex items-center">
                📝 Important Notice
              </h3>
              <p className="text-white/90 text-xs leading-relaxed">
                If not funded, your loan request will expire in 2 days.
              </p>
            </div>
          </div>
        </div>

        {/* Amount Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300 shadow-lg">
            <div className="text-3xl font-bold text-blue-300 mb-2 font-mono">
              ₹{form.amount || 0}
            </div>
            <div className="text-white/70 text-xs uppercase tracking-wider">
              Request Amount
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300 shadow-lg">
            <div className="text-3xl font-bold text-emerald-300 mb-2 font-mono">
              ₹{expectedAmount.toFixed(2)}
            </div>
            <div className="text-white/70 text-xs uppercase tracking-wider">
              Amount Received After Tax
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Form Fields */}
          <div className="space-y-6">
            {/* Loan Amount & Interest Rate */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-white font-medium text-sm mb-3 flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-pink-400 rounded-full mr-2 shadow-lg shadow-red-400/50"></div>
                  💰 Loan Amount (₹)
                </label>
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 focus-within:border-blue-400/50 focus-within:bg-white/15 transition-all duration-300">
                  <div className="text-white/60 text-xs mb-1">Amount (INR)</div>
                  <input
                    required
                    type="number"
                    name="amount"
                    min={1}
                    placeholder="e.g., 5000"
                    className="bg-transparent text-white text-xl font-bold w-full outline-none placeholder-white/40"
                    value={form.amount}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="text-white font-medium text-sm mb-3 flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mr-2 shadow-lg shadow-blue-400/50"></div>
                  📈 Max Interest Rate (%)
                </label>
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-2 border border-white/20">
                  <div className="text-white/60 text-xs mb-2">Rate (%)</div>

                  <input
                    required
                    type="range"
                    min="3"
                    max="25"
                    step={0.5}
                    value={form.maxInterestRateAcceptable}
                    name="maxInterestRateAcceptable"
                    placeholder="e.g., 8.5"
                    onChange={handleChange}
                    className="w-full accent-indigo-500"
                  />
                  <div className="text-center text-lg font-semibold text-indigo-600 mt-1">
                    {form.maxInterestRateAcceptable}%
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Loan Duration */}
              <div>
                <label className="text-white font-medium text-sm mb-3 flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mr-2 shadow-lg shadow-yellow-400/50"></div>
                  Loan Duration
                </label>
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 focus-within:border-purple-400/50 focus-within:bg-white/15 transition-all duration-300">
                  <div className="text-white/60 text-xs mb-1">
                    Duration (Months)
                  </div>
                  <select
                    name="durationMonths"
                    value={form.durationMonths}
                    onChange={handleChange}
                    className="bg-transparent text-white text-lg font-semibold w-full outline-none"
                  >
                    <option value="3" className="bg-slate-800">
                      3 Months
                    </option>

                    <option value="6" className="bg-slate-800">
                      6 Months
                    </option>

                    <option value="9" className="bg-slate-800">
                      9 Months
                    </option>

                    <option value="12" className="bg-slate-800">
                      12 Months
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-white font-medium text-sm mb-3 flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-pink-400 rounded-full mr-2 shadow-lg shadow-red-400/50"></div>
                  📝 Loan Title
                </label>
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 focus-within:border-blue-400/50 focus-within:bg-white/15 transition-all duration-300">
                  <input
                    required
                    type="text"
                    name="title"
                    placeholder="e.g., Project"
                    className="bg-transparent text-white text-xl font-bold w-full outline-none placeholder-white/40"
                    maxLength={100}
                    value={form.title}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            {/* Purpose of Loan */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-white font-medium text-sm flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full mr-2 shadow-lg shadow-purple-400/50"></div>
                  Purpose of Loan
                </label>
                <span className="text-white/40 text-xs font-mono">
                  {form.purpose.length}/500
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 focus-within:border-indigo-400/50 focus-within:bg-white/15 transition-all duration-300">
                <textarea
                  required
                  name="purpose"
                  placeholder="Describe how you'll use this loan for your education..."
                  value={form.purpose}
                  onChange={handleChange}
                  maxLength={500}
                  className="bg-transparent text-white placeholder-white/40 w-full outline-none resize-none h-24 leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button className="w-full mt-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold py-4 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] hover:-translate-y-1 border border-white/20 backdrop-blur-sm relative overflow-hidden">
            <span className="relative z-10 flex items-center justify-center">
              Submit Loan Request
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-xl"></div>
          </button>

        </form>
      </div>

    </div>
  );
};

export default RequestLoanPage;

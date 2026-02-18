import React, { useState } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";

export default function LoanFilters({ onApply }) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    interestRate: "",
    creditScore: "",
    duration: "",
    amount: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleApply = () => {
    onApply(filters);
    setShowFilters(false);
  };

  return (
    <div>
      {/* Filter Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowFilters(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition hover:shadow-pink-500/30"
        >
          <FaFilter /> Filters
        </button>
      </div>

      {/* Slide-Down Panel */}
      <div
        className={`fixed top-0 left-0 w-full bg-white shadow-lg border-b z-50 transform transition-transform duration-500 ${
          showFilters ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="p-4 max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-indigo-700">Filter Loans</h2>
            <button
              onClick={() => setShowFilters(false)}
              className="text-gray-500 hover:text-red-500 transition"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Filter Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Interest Rate */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                📈 Max Interest Rate (%)
              </label>
              <input
                type="range"
                min="0"
                max="25"
                step="0.5"
                name="interestRate"
                value={filters.interestRate}
                onChange={handleChange}
                className="w-full accent-indigo-500"
              />
              <div className="text-center text-sm text-indigo-600 mt-1">
                {filters.interestRate || 0}%
              </div>
            </div>

            {/* Credit Score */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                💳 Min Credit Score
              </label>
              <input
                type="number"
                name="creditScore"
                min="300"
                max="900"
                placeholder="300 - 900"
                className="w-full border rounded-lg p-2"
                value={filters.creditScore}
                onChange={handleChange}
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                ⏳ Loan Duration (Months)
              </label>
              <select
                name="duration"
                className="w-full border rounded-lg p-2"
                value={filters.duration}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="6">6 months</option>
                <option value="12">12 months</option>
                <option value="18">18 months</option>
                <option value="24">24 months</option>
              </select>
            </div>

            {/* Loan Amount */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                💰 Max Loan Amount (₹)
              </label>
              <input
                type="number"
                name="amount"
                placeholder="e.g., 50000"
                className="w-full border rounded-lg p-2"
                value={filters.amount}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setFilters({ interestRate: "", creditScore: "", duration: "", amount: "" })}
              className="rounded-2xl my-4 px-4 py-2 border border-gray-400  hover:bg-gray-100"
            >
              Reset
            </button>
            <button
              onClick={handleApply}
              className="rounded-2xl my-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-indigo-500 text-white hover:scale-105 hover:shadow-xl hover:shadow-pink-500/30"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

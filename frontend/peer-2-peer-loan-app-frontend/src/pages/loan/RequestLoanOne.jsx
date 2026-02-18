import React, { useState } from 'react';

const LoanRequestWizard = () => {
  const [step, setStep] = useState(1);
  const [customAmount, setCustomAmount] = useState('');
  const [maxInterestRate, setMaxInterestRate] = useState(25);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const isStepValid = () => {
    return step === 1 && customAmount !== '';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-xl w-full bg-white p-8 rounded-3xl shadow-2xl border border-indigo-100">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black mb-2 text-indigo-500">🚀 EduFund</h1>
          <p className="text-gray-700 font-medium">Smart Funding for Brilliant Minds</p>
        </div>

        {/* Step indicators */}
        <div className="flex justify-between items-center mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                step >= s
                  ? 'bg-gradient-to-tr from-indigo-400 to-pink-400 text-white shadow-md'
                  : 'border-gray-300 text-gray-400'
              }`}
            >
              {s === 1 ? '💰' : s === 2 ? '📄' : s === 3 ? '⚡' : '✅'}
            </div>
          ))}
        </div>

        {/* Form content */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
              💰 How much do you need?
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {[1000, 5000, 15000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setCustomAmount(amount)}
                  className={`p-4 rounded-xl border text-center transition-all duration-200 ${
                    customAmount === amount
                      ? 'bg-gradient-to-r from-indigo-400 to-pink-400 text-white font-bold'
                      : 'border-gray-300 hover:border-indigo-400'
                  }`}
                >
                  <div className="text-lg">${amount.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">
                    {amount === 1000
                      ? 'Books & Supplies'
                      : amount === 5000
                      ? 'Semester Fees'
                      : 'Full Year'}
                  </div>
                </button>
              ))}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1 flex items-center gap-1">
                💳 Custom Amount ($)
              </label>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2 flex items-center gap-1">
                📈 Maximum Interest Rate You'll Accept
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={maxInterestRate}
                onChange={(e) => setMaxInterestRate(e.target.value)}
                className="w-full accent-indigo-500"
              />
              <div className="text-center text-lg font-semibold text-indigo-600 mt-1">
                {maxInterestRate}%
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              isStepValid()
                ? 'bg-gradient-to-r from-pink-400 to-indigo-500 text-white hover:scale-105 shadow-lg shadow-indigo-200'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanRequestWizard;

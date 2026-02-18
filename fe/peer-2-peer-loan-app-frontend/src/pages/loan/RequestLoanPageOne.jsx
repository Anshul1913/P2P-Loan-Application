// return (
//     <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-500 flex flex-col items-center py-10 px-4">
//       {/* Card Container */}
//       <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-8">
//         {/* Header */}
//         <div className="text-center mb-6">
//           <h1 className="text-3xl font-bold text-purple-700  flex items-center justify-center gap-2">
//             🎓 Request Your Student Loan
//           </h1>
//           <p className="text-gray-600 mt-1">
//             Get the funding you need for your education journey
//           </p>
//         </div>

//         {/* Progress/Divider */}
//         <div className="h-1 bg-gray-200 rounded mb-6" />

//         {/* Quick Tip */}
//         <div className="bg-yellow-400/90 p-4 rounded-lg shadow-inner text-sm text-gray-800 mb-6 border-l-8 border-yellow-600">
//           <strong className="block mb-1">💡 Quick Tip</strong>
//           Provide clear and detailed information to increase your chances of
//           getting funded. Be honest about your needs and repayment capacity.
//         </div>
//         {/* Loan Expiry Note */}
//         <div className="bg-red-100 p-3 rounded-lg text-sm text-red-800 mb-6 border-l-8 border-red-500">
//           ⚠️ <strong>Note:</strong> If your loan is not funded, your loan
//           request will expire in <strong>7 days</strong>.
//         </div>

//         {/* Amount Box */}
//         <div className="border-dashed border-2 border-blue-500 bg-blue-50 rounded-lg py-6 mb-8 text-center">
//           <h2 className="text-4xl font-bold text-blue-700">
//             ₹{form.amount || 0}
//           </h2>
//           <p className="text-sm text-gray-600 mt-1">Requested Amount</p>
//         </div>

//         <div className="border border-purple-500 bg-purple-50 rounded-lg py-6 mb-8 text-center shadow-sm">
//           <h2 className="text-4xl font-bold text-purple-700">
//             ₹{expectedAmount.toFixed(2)}
//           </h2>
//           <p className="text-sm text-purple-600 mt-1">
//             Expected Amount Received after Tax
//           </p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {/* Loan Amount */}
//             <div>
//               <label className="block text-sm font-semibold mb-1">
//                 💰 Loan Amount (₹)
//               </label>
//               <input
//                 required
//                 type="number"
//                 name="amount"
//                 min={1}
//                 placeholder="e.g., 5000"
//                 className="w-full border rounded-lg p-2"
//                 value={form.amount}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Interest Rate */}
//             <div>
//               <label className="block text-sm font-semibold mb-1">
//                 📈 Max Interest Rate (%)
//               </label>
//               <input
//                 required
//                 type="range"
//                 min="3"
//                 max="25"
//                 step={0.5}
//                 value={form.maxInterestRateAcceptable}
//                 name="maxInterestRateAcceptable"
//                 placeholder="e.g., 8.5"
//                 onChange={handleChange}
//                 className="w-full accent-indigo-500"
//               />
//               <div className="text-center text-lg font-semibold text-indigo-600 mt-1">
//                 {form.maxInterestRateAcceptable}%
//               </div>
//             </div>

//             {/* Loan Duration */}
//             <div>
//               <label className="block text-sm font-semibold mb-1">
//                 ⏳ Loan Duration (Months)
//               </label>
//               <select
//                 required
//                 name="durationMonths"
//                 className="w-full border rounded-lg p-2"
//                 value={form.durationMonths}
//                 onChange={handleChange}
//               >
//                 <option value="">Select duration</option>
//                 <option value="6">6 months</option>
//                 <option value="12">12 months</option>
//                 <option value="18">18 months</option>
//                 <option value="24">24 months</option>
//               </select>
//             </div>
//             {/* Loan Title */}
//             <div>
//               <label className="block text-sm font-semibold mb-1">
//                 📝 Loan Title
//               </label>
//               <input
//                 required
//                 type="text"
//                 name="title"
//                 placeholder="e.g., Computer Science Degree - Final Semester"
//                 className="w-full border rounded-lg p-2"
//                 maxLength={100}
//                 value={form.title}
//                 onChange={handleChange}
//               />
//               <div className="text-xs text-gray-500 text-right">
//                 {form.title.length}/100
//               </div>
//             </div>
//           </div>

//           {/* Purpose of Loan */}
//           <div className="mt-6">
//             <label className="block text-sm font-semibold mb-1">
//               🎯 Purpose of Loan
//             </label>
//             <textarea
//               required
//               name="purpose"
//               placeholder="Describe how you'll use this loan..."
//               className="w-full border rounded-lg p-2"
//               rows={5}
//               maxLength={500}
//               value={form.purpose}
//               onChange={handleChange}
//             />
//             <div className="text-xs text-gray-500 text-right">
//               {form.purpose.length}/500
//             </div>
//           </div>
//           <div className="mt-6 flex justify-end">
//             <button
//               className="rounded-2xl my-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-indigo-500 text-white hover:scale-105 hover:shadow-xl hover:shadow-pink-500/30"
//               type="submit"
//             >
//               Submit Loan Request
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
const RequestLoanPageOne = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-500 flex flex-col items-center py-10 px-4"> 
    </div>
  );
}
export default RequestLoanPageOne;
// import { useEffect, useState } from "react";
// // import EMICalendar from "../../components/emi/EmiCalander";
// import EmiProgressChart from "../../components/emi/EmiProgressChart";
// import EMISchedule from "../../components/emi/EmiSchedule";
// import LoanCard from "../../components/emi/Loancard";
// import Sidebar from "../../components/Sidebar";
// import PaymentHistoryChart from "../../components/emi/PaymentHistoryChart";
// import EmiApi from "../../services/EmiService";

// const EmiDashBoard = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState();
//   const [dashboard, setDashboard] = useState(null);
//   const [calendar, setCalendar] = useState({ month: "", days: [] });

//   if (loading) return <PageSkeleton />;

//   return (
//     <div className="min-h-screen bg-slate-50 flex">
//       <Sidebar />
//       <div className="flex-1 p-6">
//         {/* <Topbar /> */}
//         <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="lg:col-span-2 space-y-6">
//             <LoanCard
//               loan={dashboard?.loan}
//               progress={dashboard?.progress}
//               remaining={dashboard?.remaining}
//             />
//             <EMISchedule  />
//           </div>

//           <div className="space-y-6">
//             <PaymentHistoryChart series={dashboard?.paymentSeries || []} />
//             <EMICalendar month={calendar?.month} days={calendar?.days || []} />
//             <ActionButtons />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// function EmiSchedule({ schedule = [] }) {
//   return (
//     <div className="bg-white rounded-lg p-4 shadow panel">
//       <h3 className="font-semibold mb-3">EMI Schedule</h3>
//       <div className="overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead className="text-slate-500">
//             <tr>
//               <th className="py-2 text-left">EMI #</th>
//               <th className="py-2 text-left">Due Date</th>
//               <th className="py-2 text-left">Status</th>
//               <th className="py-2 text-left">Paid On</th>
//             </tr>
//           </thead>
//           <tbody>
//             {schedule.length ? (
//               schedule.map((row) => (
//                 <tr key={row.id} className="border-t">
//                   <td className="py-3">{row.emiNo}</td>
//                   <td className="py-3">
//                     {new Date(row.dueDate).toLocaleDateString()}
//                   </td>
//                   <td className="py-3">
//                     <StatusBadge status={row.status} />
//                   </td>
//                   <td className="py-3">
//                     {row.paidOn
//                       ? new Date(row.paidOn).toLocaleDateString()
//                       : "-"}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={4} className="py-6 text-center text-gray-400">
//                   No EMI schedule available
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// function StatusBadge({ status }) {
//   const map = {
//     Paid: "bg-green-100 text-green-700",
//     Upcoming: "bg-yellow-100 text-yellow-700",
//     Overdue: "bg-red-100 text-red-700",
//   };
//   const cls = map[status] || "bg-gray-100 text-slate-700";
//   return (
//     <span className={`px-3 py-1 rounded-full text-xs ${cls}`}>{status}</span>
//   );
// }

// /* ----------------------
//    EMICalendar
//    days: [ {day:1, isDue:false}, ... ]
//    ---------------------- */
// function EMICalendar({ month = "May 2025", days = [] }) {
//   // if days empty show a mini placeholder
//   const daysToRender = days.length
//     ? days
//     : Array.from({ length: 30 }, (_, i) => ({
//         day: i + 1,
//         isDue: i + 1 === 20,
//       }));

//   return (
//     <div className="bg-white rounded-lg p-4 shadow panel">
//       <h3 className="font-semibold">{`EMI Calendar — ${month}`}</h3>
//       <div className="grid grid-cols-7 gap-1 mt-3 text-sm">
//         {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
//           <div key={d} className="text-xs text-slate-400 text-center">
//             {d}
//           </div>
//         ))}
//         {daysToRender.map((d) => (
//           <div
//             key={d.day}
//             className={`p-2 text-center rounded ${
//               d.isDue ? "bg-primary-100 text-primary-700" : ""
//             }`}
//           >
//             {d.day}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// /* ----------------------
//    Action Buttons
//    ---------------------- */
// function ActionButtons() {
//   return (
//     <div className="bg-white rounded-lg p-4 shadow panel flex gap-3 items-center">
//       <button className="px-6 py-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700">
//         Pay Now
//       </button>
//       <button className="px-4 py-2 rounded-lg border border-slate-200 flex items-center gap-2">
//         {/* <FiDownload /> */}
//         Download Statement
//       </button>
//       <div className="ml-auto text-sm text-slate-500">Auto-debit reminder</div>
//     </div>
//   );
// }

// /* ----------------------
//    PageSkeleton (loading placeholder)
//    ---------------------- */
// function PageSkeleton() {
//   return (
//     <div className="min-h-screen bg-slate-50 flex items-center justify-center">
//       <div className="w-[1100px] p-6">
//         <div className="h-6 bg-slate-200 rounded w-48 mb-4 animate-pulse" />
//         <div className="grid grid-cols-3 gap-6">
//           <div className="col-span-2 space-y-4">
//             <div className="h-36 bg-white rounded shadow animate-pulse" />
//             <div className="h-48 bg-white rounded shadow animate-pulse" />
//           </div>
//           <div className="space-y-4">
//             <div className="h-40 bg-white rounded shadow animate-pulse" />
//             <div className="h-28 bg-white rounded shadow animate-pulse" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default EmiDashBoard;

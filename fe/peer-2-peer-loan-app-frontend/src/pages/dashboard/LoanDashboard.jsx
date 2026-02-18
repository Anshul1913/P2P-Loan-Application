import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Download,
  CreditCard,
  ArrowRight,
  TrendingUp,
  Plus,
  Bell,
  Star,
  Users,
  Activity,
  FileText,
} from "lucide-react";
import LoanApi from "../../services/LoanService";
import UserDetailApi from "../../services/UserDetailService";
import { useNavigate } from "react-router-dom";
import WalletApi from "../../services/WalletService";

const LoanDashboard = () => {
    const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [monthlyEmi, setMonthlyEmi] = useState(0);
  const [loansData, setLoansData] = useState([]); // Placeholder for fetched loan data
  const [topLenders, setTopLenders] = useState([]);

  useEffect(() => {
    // Fetch loan data from API

    fetchLoans();
    // fetchTopLenders();
  }, []);


  const fetchLoans = async () => {
    try {
      const response = await LoanApi.fetchLoansOfCurrentUser();
      const response1 = await LoanApi.fetchTopLenders();
      setTopLenders(response1);
      setLoansData(response);
      // await UserDetailApi.fetchTopLenders();

      let previous = monthlyEmi;
      for (let i = 0; i < response.length; i++) {
        previous += response[i].monthlyEmi;
      }
      setMonthlyEmi(previous);
    } catch (error) {
      console.error("Error fetching loan data:", error);
    }
  };
  // Sample loan data (replace with backend data)
//   const loans = [
//     {
//       id: "LN-2025-001",
//       amount: 500000,
//       purpose: "Business Expansion",
//       interestRate: 12.5,
//       term: 24,
//       status: "active",
//       remainingAmount: 350000,
//       nextPayment: "2025-09-15",
//       monthlyPayment: 24000,
//       lender: "Sarah Johnson",
//       startDate: "2024-01-15",
//       progress: 30,
//       daysLeft: 45,
//     },
//     {
//       id: "LN-2025-002",
//       amount: 250000,
//       purpose: "Home Renovation",
//       interestRate: 10.8,
//       term: 18,
//       status: "active",
//       remainingAmount: 180000,
//       nextPayment: "2025-09-20",
//       monthlyPayment: 15800,
//       lender: "Michael Chen",
//       startDate: "2024-06-01",
//       progress: 28,
//       daysLeft: 51,
//     },
//     {
//       id: "LN-2025-003",
//       amount: 150000,
//       purpose: "Education Loan",
//       interestRate: 9.2,
//       term: 12,
//       status: "pending",
//       remainingAmount: 150000,
//       nextPayment: null,
//       monthlyPayment: 13200,
//       lender: null,
//       startDate: null,
//       progress: 0,
//       daysLeft: null,
//     },
//     {
//       id: "LN-2024-045",
//       amount: 300000,
//       purpose: "Debt Consolidation",
//       interestRate: 11.0,
//       term: 36,
//       status: "completed",
//       remainingAmount: 0,
//       nextPayment: null,
//       monthlyPayment: 0,
//       lender: "Investment Group",
//       startDate: "2023-12-01",
//       progress: 100,
//       daysLeft: 0,
//     },
//   ];
  const rupee = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });
  // Sample top lenders (replace with API)

  // Sample recent activity (replace with API)
  const recentActivity = [
    {
      id: 1,
      date: "2025-08-15",
      type: "EMI Paid",
      details: "₹1,250 paid for LN-2025-001",
    },
    {
      id: 2,
      date: "2025-08-12",
      type: "Disbursal",
      details: "₹15,000 disbursed for LN-2025-003",
    },
    {
      id: 3,
      date: "2025-08-10",
      type: "Repayment Failed",
      details: "Auto-debit failed for LN-2025-002",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "FUNDED":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "PARTIALLY_FUNDED":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "REPAID":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "rejected":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const filteredLoans = useMemo(() => {
    return loansData
      .filter((loan) => {
        const matchesSearch =
          loan.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
          loan.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
          statusFilter === "all" || loan.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "amount") return b.amount - a.amount;
        if (sortBy === "progress") return b.progress - a.progress;
        // default date-like: by startDate desc (nulls last)
        const da = a.startDate ? new Date(a.startDate) : 0;
        const db = b.startDate ? new Date(b.startDate) : 0;
        return db - da;
      });
  }, [loansData, searchTerm, statusFilter, sortBy]);

  const totalActiveLoans = loansData.filter(
    (loan) => loan.status !== "paid"
  ).length;

  
  const handlePayNowClick = async (loan) => {
  try {
    // Step 1: Get wallet balance
    const walletBalance = await WalletApi.getWalletBalance();
    console.log("Wallet Balance:", walletBalance);
    console.log(loan);
    
    // Step 2: Check if balance is sufficient
    // if (walletBalance < loan.emi.amount) {
    //   console.log("Insufficient wallet balance");
    //   alert("Insufficient wallet balance");
    //   return;
    // }

    // Step 3: Call API to complete the payment
    // const paymentResponse = await WalletApi.payEmi(loan.id, loan.emi.amount);
    // console.log("Payment successful:", paymentResponse);
    // alert("Payment successful!");
    
  } catch (error) {
    console.error("Error during payment:", error);
    alert("Payment failed. Please try again.");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">
              Master your loan repayments with intelligent insights
            </h1>
            <p className="text-slate-300">
              Track, manage and optimize your lending portfolio
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <select
                className="px-3 py-2 bg-slate-800/60 border border-slate-700 rounded-xl text-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort loans"
              >
                <option value="date">Sort by Date</option>
                <option value="amount">Sort by Amount</option>
                <option value="progress">Sort by Progress</option>
              </select>
            </div>

            <button 
            onClick={() => navigate('/loan-request')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:scale-[1.02] transition-transform">
              <Plus className="w-5 h-5" />
              Apply New Loan
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <FileText className="w-6 h-6" />
              </div>
            </div>
            <p className="text-blue-100 text-sm font-medium mb-1">
              Total Active Loans
            </p>
            {/* <p className="text-3xl font-bold">₹{(totalRemaining / 100000).toFixed(2)}L</p> */}
            <p className="text-blue-200 text-sm">
              Total {totalActiveLoans} active loans
            </p>
          </div>

          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-6 text-white shadow-xl">
            <p className="text-emerald-100 text-sm font-medium mb-1">
              MONTHLY EMI
            </p>
            <p className="text-3xl font-bold">{rupee.format(monthlyEmi)}</p>
            <p className="text-emerald-200 text-sm">
              Total commitment per month
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 text-white shadow-xl">
            <p className="text-purple-100 text-sm font-medium mb-1">
              CREDIT SCORE
            </p>
            <p className="text-3xl font-bold">742</p>
            <p className="text-purple-200 text-sm">On-time payment rate</p>
          </div>

          <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl p-6 text-white shadow-xl">
            <p className="text-emerald-100 text-sm font-medium mb-1">
              TOTAL BORROWED REQUEST
            </p>
            <p className="text-3xl font-bold">
              {rupee.format(
                Math.round(
                  loansData.reduce((sum, loan) => sum + (loan.amount || 0), 0)
                ) || 0
              )}
            </p>
            <p className="text-emerald-200 text-sm">
              Across {loansData.length} loans
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-5 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search loans by ID or purpose..."
                className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <select
                className="px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>

              <button className="p-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-slate-300 hover:text-white">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid: Loans list + Right column (Top Lenders + Recent Activity) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Loans List (2 cols wide) */}
          <div className="lg:col-span-2 space-y-4">
            {loansData.map((loan) => (
              <div
                key={loan.id}
                className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 hover:bg-slate-800/70 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {loan.title}
                      </h3>
                      <p className="text-slate-400">{loan.id}</p>
                    </div>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-xl text-sm font-medium border ${getStatusColor(
                      loan.status
                    )} flex items-center gap-2`}
                  >
                    {loan.status === "PARTIALLY_FUNDED" && (
                      <Clock className="w-4 h-4" />
                    )}
                    {loan.status === "FUNDED" && (
                      <AlertCircle className="w-4 h-4" />
                    )}
                    {loan.status === "REPAID" && (
                      <CheckCircle className="w-4 h-4" />
                    )}
                    {loan.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Loan Amount</p>
                    <p className="text-2xl font-bold text-white">
                      {rupee.format(loan.amount)}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm mb-1">
                      Monthly Interest Rate
                    </p>
                    <p className="text-2xl font-bold text-white">
                      {loan.maxInterestRateAcceptable}%
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Term</p>
                    <p className="text-2xl font-bold text-white">
                      {loan.durationMonths} month
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Monthly EMI</p>
                    <p className="text-2xl font-bold text-white">
                      {rupee.format(loan.monthlyEmi)}
                    </p>
                  </div>
                </div>

                {loan.status === "FUNDED" && (
                  <>
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-300 font-medium">
                          Repayment Progress
                        </span>
                        <span className="text-slate-300">
                          {((loan.emiPaid * 100) / loan.totalEmi).toFixed(2)}%
                          Complete
                        </span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                          style={{
                            width: `${(
                              (loan.emiPaid * 100) /
                              loan.totalEmi
                            ).toFixed(2)}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600/30">
                        <p className="text-slate-400 text-sm mb-1">
                          Outstanding
                        </p>
                        <p className="text-xl font-bold text-white">
                          {rupee.format(loan.outstanding)}
                        </p>
                      </div>
                      <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600/30">
                        <p className="text-slate-400 text-sm mb-1">
                          Next Payment
                        </p>
                        <p className="text-xl font-bold text-white">
                          {loan.nextEmiDate
                            ? new Date(loan.nextEmiDate).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : "-"}
                        </p>
                        <p className="text-blue-400 text-sm">
                          {loan.daysLeft ? `${loan.daysLeft} days left` : ""}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button 
                      onClick={() => navigate('/emi')}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold transition-all shadow-lg flex items-center justify-center gap-2">
                        Pay Now <ArrowRight className="w-5 h-5" />
                      </button>
                      <button className="flex-1 border border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700/50 py-3 px-6 rounded-xl font-medium transition-all flex items-center justify-center gap-2">
                        <Eye className="w-5 h-5" /> View Details
                      </button>
                      <button className="flex-1 border border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700/50 py-3 px-6 rounded-xl font-medium transition-all flex items-center justify-center gap-2">
                        <Download className="w-5 h-5" /> Download
                      </button>
                    </div>
                  </>
                )}

                {/* {loan.status === "FUNDED" && (
                  <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-4 mt-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-500/20 rounded-lg">
                          <AlertCircle className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-amber-400 mb-1">
                            Application Under Review
                          </p>
                          <p className="text-slate-300 text-sm">
                            Your loan request is being evaluated by potential
                            lenders
                          </p>
                        </div>
                      </div>
                      <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Track Status
                      </button>
                    </div>
                  </div>
                )} */}

                {loan.status === "COMPLETED" && (
                  <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-xl p-4 mt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-500/20 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-emerald-400">
                            Loan Completed Successfully
                          </p>
                          <p className="text-slate-300 text-sm">
                            Congratulations on completing your loan!
                          </p>
                        </div>
                      </div>
                      <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                        <Download className="w-4 h-4" /> Certificate
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right column: Top Lenders + Recent Activity */}
          <div className="space-y-4">
            {/* Top Lenders */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-cyan-400" /> Top Lenders
                </h3>
                <span className="text-sm text-slate-400">Based on funding</span>
              </div>

              <div className="space-y-3">
                {topLenders.map((l) => (
                  <div key={l.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-white font-bold">
                        {l.lenderName
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <div>
                        <div className="font-medium text-white">
                          {l.lenderName}
                        </div>
                        <div className="text-sm text-slate-400">
                          Funded ₹{(l.totalFunded / 1000).toFixed(0)}K
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-400" /> Recent Activity
                </h3>
                <button className="text-sm text-slate-400">Export</button>
              </div>

              <div className="space-y-3">
                {recentActivity.length ? (
                  recentActivity.map((a) => (
                    <div
                      key={a.id}
                      className="flex items-start justify-between gap-3"
                    >
                      <div>
                        <div className="text-sm text-slate-300 font-medium">
                          {a.type}
                        </div>
                        <div className="text-xs text-slate-400">
                          {a.details}
                        </div>
                      </div>
                      <div className="text-xs text-slate-500">
                        {new Date(a.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-slate-400 py-4">
                    No recent activity
                  </div>
                )}
              </div>
            </div>

            {/* Small quick panel - notifications */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDashboard;

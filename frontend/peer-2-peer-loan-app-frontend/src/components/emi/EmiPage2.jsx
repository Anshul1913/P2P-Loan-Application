import React, { useState, useEffect } from "react";
import {
  Calendar,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Target,
  CreditCard,
  PieChart,
  BarChart3,
  Bell,
  ArrowRight,
  Zap,
  Shield,
} from "lucide-react";
// import EmiApi from "../../services/EmiService";
import LoanApi from "../../services/LoanService";
import { FaRupeeSign } from "react-icons/fa";
// import PayNow from "../payNow/PayNow";
import WalletApi from "../../services/WalletService";

const EMIPage2 = () => {
  // const [error, setError] = useState();
  const [loans, setLoans] = useState([]);
  const [emiData, setEmiData] = useState();
  const [emiHistory, setEmiHistory] = useState([]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [upcomingEMIs, setUpcomingEMIs] = useState([]);

  const rupee = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      //   const response = await EmiApi.fetchAllEmiOfCurentUser(page - 1, size);
      //   const loansResponse = await LoanApi.fetchLoansOfCurrentUser();
      const emiDashboardResponse = await LoanApi.fetchEmiDashboardData();
      console.log(emiDashboardResponse);

      //   setSchedule(response.content);
      setEmiData(emiDashboardResponse);
      //   console.log(response.content);
      console.log(emiData);

      setLoans(emiDashboardResponse.loans);
      setUpcomingEMIs(emiDashboardResponse.upcomingEMIs);
      setEmiHistory(emiDashboardResponse.emiHistory);
      console.log(emiHistory);
    } catch (error) {
      console.log(error);
    }
  };
  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();

  // Generate calendar dates
  const generateCalendarDates = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    // const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const dates = [];
    const currentDate = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const calendarDates = generateCalendarDates();

  // Get EMI for specific date
  const getEMIForDate = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    return emiData.upcomingEMIs
      .concat(emiData.emiHistory)
      .find((emi) => emi.date === dateStr);
  };

  //   Calculate stats
  const getStats = () => {
    const totalPaid = emiHistory.reduce((sum, emi) => sum + emi.amount, 0);
    const upcomingTotal = upcomingEMIs
      .slice(0, 3)
      .reduce((sum, emi) => sum + emi.amount, 0);
    const onTimePayments = emiHistory.filter(
      (emi) => emi.status === "paid"
    ).length;
    const paymentScore = Math.round((onTimePayments / emiHistory.length) * 100);

    return {
      totalPaid,
      upcomingTotal,
      paymentScore,
      avgEMI: Math.round(totalPaid / emiHistory.length),
    };
  };

  const stats = getStats();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const nextMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(currentMonth + 1);
    setSelectedDate(newDate);
  };

  const handlePayNowClick = async (emi) => {
  try {
    // Step 1: Get wallet balance
    const walletBalance = await WalletApi.getWalletBalance();
    console.log("Wallet Balance:", walletBalance);

    // Step 2: Check if balance is sufficient
    if (walletBalance < emi.amount) {
      console.log("Insufficient wallet balance");
      alert("Insufficient wallet balance");
      return;
    }

    // Step 3: Call API to complete the payment
    const paymentResponse = await WalletApi.payEmi(emi.id, emi.amount);
    console.log("Payment successful:", paymentResponse);
    alert("Payment successful!");
    
  } catch (error) {
    console.error("Error during payment:", error);
    alert("Payment failed. Please try again.");
  }
};


  const prevMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(currentMonth - 1);
    setSelectedDate(newDate);
  };

  const getEMIStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-500/20 border border-green-500/50";
      case "overdue":
        return "bg-red-500/20 border border-red-500/50";
      case "upcoming":
        return "bg-blue-700/40 border border-blue-500/50";
      default:
        return "bg-gray-400/20 border border-gray-400/50";
    }
  };

  const getDaysUntilEMI = (date) => {
    return Math.ceil((new Date(date) - new Date()) / (1000 * 60 * 60 * 24));
  };

  if (!emiData) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-t from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-purple-500/5 via-blue-500/5 to-cyan-500/5 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="container mx-auto px-6 py-8">
          <div className="mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 animate-pulse">
              💳 EMI Command Center
            </h1>
            <p className="text-gray-300 text-xl">
              Master your loan repayments with intelligent insights
            </p>
          </div>

          {/* Hero Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="group relative bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-6 rounded-2xl border border-blue-500/30 backdrop-blur-sm hover:scale-105 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-500/20 rounded-xl">
                    <FaRupeeSign className="text-blue-400" size={24} />
                  </div>
                  <span className="text-blue-400 text-sm font-bold">
                    OUTSTANDING
                  </span>
                </div>
                <div className="text-3xl font-bold mb-2">
                  {rupee.format(emiData.totalOutstanding)}
                </div>
                <div className="text-gray-400 text-sm">
                  Across {emiData.totalLoans} active loans
                </div>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-6 rounded-2xl border border-green-500/30 backdrop-blur-sm hover:scale-105 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-500/20 rounded-xl">
                    <Target className="text-green-400" size={24} />
                  </div>
                  <span className="text-green-400 text-sm font-bold">
                    MONTHLY EMI
                  </span>
                </div>
                <div className="text-3xl font-bold mb-2">
                  {rupee.format(emiData.monthlyEMI)}
                </div>  
                <div className="text-gray-400 text-sm">
                  Total commitment per month
                </div>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-2xl border border-purple-500/30 backdrop-blur-sm hover:scale-105 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-500/20 rounded-xl">
                    <TrendingUp className="text-purple-400" size={24} />
                  </div>
                  <span className="text-purple-400 text-sm font-bold">
                    CREDIT SCORE
                  </span>
                </div>
                <div className="text-3xl font-bold mb-2">
                  {stats.paymentScore}%
                </div>
                <div className="text-gray-400 text-sm">
                  On-time payment rate
                </div>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-yellow-500/20 to-orange-500/20 p-6 rounded-2xl border border-yellow-500/30 backdrop-blur-sm hover:scale-105 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-yellow-500/20 rounded-xl">
                    <Clock className="text-yellow-400" size={24} />
                  </div>
                  <span className="text-yellow-400 text-sm font-bold">
                    NEXT DUE
                  </span>
                </div>
                <div className="text-3xl font-bold mb-2">
                  {rupee.format(emiData.nextEMI?.amount)}
                </div>
                <div className="text-gray-400 text-sm">
                  {getDaysUntilEMI(emiData.nextEMI?.date)} days left
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
            {/* Left Column - Calendar & Quick Actions */}
            <div className="xl:col-span-1 space-y-8">
              {/* EMI Calendar */}
              <div className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Calendar className="text-cyan-400" />
                    EMI Calendar
                  </h2>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={prevMonth}
                      className="p-2 hover:bg-gray-700 rounded-lg transition-colors hover:scale-110"
                    >
                      ←
                    </button>
                    <span className="text-lg font-medium min-w-32 text-center">
                      {monthNames[currentMonth]} {currentYear}
                    </span>
                    <button
                      onClick={nextMonth}
                      className="p-2 hover:bg-gray-700 rounded-lg transition-colors hover:scale-110"
                    >
                      →
                    </button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {/* Day Headers */}
                  {dayNames.map((day) => (
                    <div
                      key={day}
                      className="p-2 text-center font-medium text-gray-400 text-xs"
                    >
                      {day}
                    </div>
                  ))}

                  {/* Calendar Dates */}
                  {calendarDates.map((date, index) => {
                    const emi = getEMIForDate(date);
                    const isCurrentMonth = date.getMonth() === currentMonth;
                    const isToday =
                      date.toDateString() === new Date().toDateString();

                    return (
                      <div
                        key={index}
                        className={`aspect-square flex flex-col items-center justify-center text-center cursor-pointer rounded-lg transition-all duration-200 relative text-sm ${
                          isCurrentMonth
                            ? "text-white hover:bg-gray-700/50"
                            : "text-gray-600"
                        } ${
                          isToday
                            ? "bg-cyan-500/20 border border-cyan-500/50"
                            : ""
                        } ${
                          emi && isCurrentMonth
                            ? getEMIStatusColor(emi.status)
                            : "font-normal"
                        }`}
                      >
                        <span className="text-xs">{date.getDate()}</span>
                        {/* {emi && (
                            <div
                              className={`w-1.5 h-1.5 rounded-full mt-1 ${getEMIStatusColor(
                                emi.status
                              )}`}
                            ></div>
                          )} */}
                      </div>
                    );
                  })}
                </div>

                {/* Calendar Legend */}
                <div className="flex justify-center gap-4 pt-4 border-t border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-xs text-gray-400">Upcoming</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-xs text-gray-400">Paid</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span className="text-xs text-gray-400">Late</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Zap className="text-yellow-400" />
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl hover:scale-105 transition-all duration-300 group">
                    <CheckCircle
                      className="text-green-400 group-hover:scale-110 transition-transform"
                      size={20}
                    />
                    <div className="text-left flex-1">
                      <div className="font-medium">Enable Auto-Pay</div>
                      <div className="text-xs text-gray-400">
                        Never miss a payment
                      </div>
                    </div>
                    <ArrowRight
                      className="text-green-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      size={16}
                    />
                  </button>

                  <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl hover:scale-105 transition-all duration-300 group">
                    <Bell
                      className="text-blue-400 group-hover:scale-110 transition-transform"
                      size={20}
                    />
                    <div className="text-left flex-1">
                      <div className="font-medium">Payment Reminders</div>
                      <div className="text-xs text-gray-400">Stay on track</div>
                    </div>
                    <ArrowRight
                      className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      size={16}
                    />
                  </button>

                  <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl hover:scale-105 transition-all duration-300 group">
                    <DollarSign
                      className="text-purple-400 group-hover:scale-110 transition-transform"
                      size={20}
                    />
                    <div className="text-left flex-1">
                      <div className="font-medium">Make Extra Payment</div>
                      <div className="text-xs text-gray-400">
                        Reduce interest
                      </div>
                    </div>
                    <ArrowRight
                      className="text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      size={16}
                    />
                  </button>

                  <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl hover:scale-105 transition-all duration-300 group">
                    <Shield
                      className="text-orange-400 group-hover:scale-110 transition-transform"
                      size={20}
                    />
                    <div className="text-left flex-1">
                      <div className="font-medium">Payment Protection</div>
                      <div className="text-xs text-gray-400">
                        Insure your EMIs
                      </div>
                    </div>
                    <ArrowRight
                      className="text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      size={16}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - EMI Details & Analytics */}
            <div className="xl:col-span-2 space-y-8">
              {/* Upcoming EMIs */}
              <div className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <AlertCircle className="text-cyan-400" />
                    Upcoming EMIs
                  </h2>
                  {/* <div className="text-sm text-gray-400">Next 30 days</div> */}
                </div>

                <div className="space-y-4">
                  {upcomingEMIs.slice(0, 5).map((emi, index) => {
                    const loan = emiData.loans.find((l) => l.id === emi.loanId);
                    const daysUntil = getDaysUntilEMI(emi.date);

                    return (
                      <div
                        key={index}
                        className="group flex items-center justify-between p-4 bg-gradient-to-r from-gray-700/30 to-gray-800/30 rounded-xl border border-gray-600/50 hover:border-cyan-500/50 hover:scale-102 transition-all duration-300"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-4 h-4 rounded-full ${getEMIStatusColor(
                              emi.status
                            )} group-hover:scale-125 transition-transform`}
                          ></div>
                          <div>
                            <div className="font-medium text-lg group-hover:text-cyan-400 transition-colors">
                              {loan?.title}
                            </div>
                            <div className="text-sm text-gray-400 flex items-center gap-2">
                              <span>
                                {new Date(emi.date).toLocaleDateString()}
                              </span>
                              <span>•</span>
                              <span
                                className={`font-medium ${
                                  daysUntil <= 3
                                    ? "text-red-400"
                                    : daysUntil <= 7
                                    ? "text-yellow-400"
                                    : "text-gray-400"
                                }`}
                              >
                                {daysUntil > 0
                                  ? `${daysUntil} days left`
                                  : daysUntil === 0
                                  ? "Due today!"
                                  : "Overdue"}
                              </span>
                              <span>•</span>
                              <span className="text-gray-500">
                                {loan?.lender}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-cyan-400 group-hover:scale-110 transition-transform">
                            {rupee.format(emi.amount)}
                          </div>
                          <button
                            onClick={()=>handlePayNowClick(emi)}
                            className="px-4 py-2 text-sm font-semibold rounded-lg 
             bg-gradient-to-r from-purple-600 to-blue-600 
             text-white shadow-md 
             hover:from-purple-700 hover:to-blue-700 
             hover:shadow-lg hover:scale-105 
             transition-all duration-300 ease-in-out"
                          >
                            💳 Pay Now
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Active Loans Overview */}
              <div className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <CreditCard className="text-purple-400" />
                  Active Loans Portfolio
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {loans.map((loan) => {
                    let progressPercentage =
                      ((loan.principal - loan.outstanding) / loan.principal) *
                      100;
                    progressPercentage = Math.min(
                      100,
                      Math.max(0, progressPercentage)
                    );
                    return (
                      <div
                        key={loan.id}
                        className="group bg-gradient-to-br from-gray-700/40 to-gray-800/40 p-6 rounded-xl border border-gray-600/50 hover:border-purple-500/50 hover:scale-105 transition-all duration-300 relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                        <div className="relative z-10">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="font-semibold text-lg group-hover:text-purple-400 transition-colors line-clamp-2">
                              {loan.title}
                            </h3>
                            <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full whitespace-nowrap">
                              {loan.status}
                            </span>
                          </div>
                          <div className="space-y-3 mb-4">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Outstanding</span>
                              <span className="font-bold text-red-400">
                                {rupee.format(loan.outstanding)}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Monthly EMI</span>
                              <span className="font-bold text-cyan-400">
                                {rupee.format(loan.monthlyEMI)}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">
                                Interest Rate
                              </span>
                              <span className="font-bold text-yellow-400">
                                {loan.interestRate}%
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">
                                Time Remaining
                              </span>
                              <span className="font-bold text-purple-400">
                                {loan.remainingMonths} months
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Lender</span>
                              <span className="font-medium text-gray-300">
                                {loan.lender}
                              </span>
                            </div>
                          </div>
                          {/* Progress Bar  */}
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-400">
                                Repayment Progress
                              </span>
                              <span className="text-cyan-400 font-bold">
                                {Math.round(progressPercentage)}% Complete
                              </span>
                            </div>
                            <div className="w-full bg-gray-600/50 rounded-full h-3 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 h-3 rounded-full transition-all duration-1000 ease-out relative"
                                style={{ width: `${progressPercentage}%` }}
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Analytics & Insights Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Financial Health Score */}
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl p-8 border border-cyan-500/30 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold flex items-center gap-3">
                  <div className="p-2 bg-cyan-500/20 rounded-xl">
                    <PieChart className="text-cyan-400" size={24} />
                  </div>
                  Financial Health Score
                </h2>
                <div className="text-right">
                  <div className="text-4xl font-bold text-cyan-400">
                    {/* {stats.paymentScore} */}
                  </div>
                  <div className="text-sm text-gray-400">out of 100</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <div className="text-2xl font-bold text-green-400 mb-2">
                    Excellent
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide">
                    Payment History
                  </div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <div className="text-2xl font-bold text-blue-400 mb-2">
                    Good
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide">
                    Credit Utilization
                  </div>
                  <div className="text-xs text-gray-400">Below 30%</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide">
                    Debt-to-Income Ratio
                  </div>
                  <div className="text-xs text-gray-400">Below 36%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMIPage2;

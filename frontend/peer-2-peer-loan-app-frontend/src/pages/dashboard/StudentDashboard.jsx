import {
  User,
  Bell,
  Settings
} from 'lucide-react';
import RecentTransactionsCard from '../../components/dashboard/RecentTransactionCard';
import ActiveLoansCard from '../../components/dashboard/ActiveLoanCard';
import Sidebar from '../../components/Sidebar';
import WalletBalanceCard from './WalletBalanceCard';
import NewCreditScoreCard from '../../components/dashboard/NewCreditScoreCard';
import RequestLoanCard from '../../components/dashboard/RequestLoanCard';
import { useEffect, useState } from 'react';
import WalletApi from '../../services/WalletService';
import CreditScoreApi from '../../services/CreditScoreService';
import LoanApi from '../../services/LoanService';

const StudentDashboard = () => {

  const [walletBalance, setWalletBalance] = useState(8450.50);
  const [creditScore, setCreditScore] = useState(745);
  const [activeLoans, setActiveLoans] = useState([]);

  const [recentTransactions, setRecentTransactions] = useState([]);
  useEffect(() => {
    fetchWalletBalance();
    fetchCreditScore();
    fetchActiveLoans();
    fetchRecentTransactions();
  }, []);
  const fetchWalletBalance = async () => {
    // Fetch wallet balance from API
    try {
      const response = await WalletApi.getWalletBalance();
      console.log("Wallet Balance Response:", response);
      setWalletBalance(response);
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
    }
  }
  const fetchCreditScore = async () => {
    // Fetch credit score from API
    try {
      const response = await CreditScoreApi.getCreditScore();
      console.log("Credit Score Response:", response);
      
      setCreditScore(response.score);
    } catch (error) {
      console.error("Error fetching credit score:", error);
    }
  }
  const fetchActiveLoans = async () => {
    // Fetch active loans from API
    const response = await LoanApi.fetchEmiDashboardData();
    console.log("Active Loans Response:", response);
    
    setActiveLoans(response.loans);
  }
  const fetchRecentTransactions = async () => {
    // Fetch recent transactions from API
    const response = await WalletApi.getTransactions();
    console.log("Recent Transactions Response:", response);
    setRecentTransactions(response);
  }
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 relative overflow-hidden">
      <Sidebar />
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-600/20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-600/20 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-400/10 to-purple-600/10 blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Welcome back, <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Alex!</span>
              </h1>
              <p className="text-white/70">Here's your financial overview for today</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-2xl border border-white/20 transition-all duration-300">
                <Bell className="w-5 h-5 text-white/70" />
              </button>
              <button className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-2xl border border-white/20 transition-all duration-300">
                <Settings className="w-5 h-5 text-white/70" />
              </button>
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Total Savings</p>
                  <p className="text-white font-bold text-xl">₹1,25,450</p>
                </div>
                <DollarSign className="w-8 h-8 text-emerald-400" />
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Monthly Income</p>
                  <p className="text-white font-bold text-xl">₹23,500</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Active Loans</p>
                  <p className="text-white font-bold text-xl">{activeLoans.length}</p>
                </div>
                <FileText className="w-8 h-8 text-orange-400" />
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Achievements</p>
                  <p className="text-white font-bold text-xl">12</p>
                </div>
                <Award className="w-8 h-8 text-purple-400" />
              </div>
            </div>
          </div> */}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* <CreditScoreCard/> */}
          <NewCreditScoreCard creditScore={creditScore} />
          <WalletBalanceCard walletBalance={walletBalance} />
          <RequestLoanCard  />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ActiveLoansCard activeLoans={activeLoans} />
          <RecentTransactionsCard recentTransactions={recentTransactions} />
        </div>
      </div>
    </div>
  );
}
export default StudentDashboard;
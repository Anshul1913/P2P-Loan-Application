import React, { useState } from 'react';
import { Search, Filter, DollarSign, Clock, CheckCircle, AlertCircle, XCircle, Eye, TrendingUp, Plus, Users, Target, Star, ArrowRight, Zap, Award, Shield } from 'lucide-react';

const LenderDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [amountRange, setAmountRange] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [purposeFilter, setPurposeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Sample loan requests data
  const loanRequests = [
    {
      id: 'LR-2025-001',
      borrowerName: 'Rahul Sharma',
      amount: 500000,
      purpose: 'Business Expansion',
      interestRate: 12.5,
      term: 24,
      status: 'pending',
      creditScore: 742,
      riskLevel: 'low',
      monthlyIncome: 85000,
      requestDate: '2025-09-10',
      rating: 4.2,
      expectedReturn: 68500,
      description: 'Looking to expand my textile business with new machinery and inventory.'
    },
    {
      id: 'LR-2025-002',
      borrowerName: 'Priya Patel',
      amount: 250000,
      purpose: 'Home Renovation',
      interestRate: 10.8,
      term: 18,
      status: 'pending',
      creditScore: 698,
      riskLevel: 'medium',
      monthlyIncome: 55000,
      requestDate: '2025-09-08',
      rating: 4.0,
      expectedReturn: 27000,
      description: 'Need funds for home renovation including kitchen remodeling and bathroom upgrade.'
    },
    {
      id: 'LR-2025-003',
      borrowerName: 'Amit Kumar',
      amount: 750000,
      purpose: 'Education',
      interestRate: 14.2,
      term: 36,
      status: 'funded',
      creditScore: 658,
      riskLevel: 'high',
      monthlyIncome: 45000,
      requestDate: '2025-09-05',
      rating: 3.8,
      expectedReturn: 106500,
      description: 'MBA program funding from premier business school.'
    },
    {
      id: 'LR-2025-004',
      borrowerName: 'Sneha Joshi',
      amount: 150000,
      purpose: 'Debt Consolidation',
      interestRate: 11.5,
      term: 12,
      status: 'rejected',
      creditScore: 625,
      riskLevel: 'high',
      monthlyIncome: 35000,
      requestDate: '2025-09-03',
      rating: 3.5,
      expectedReturn: 17250,
      description: 'Consolidating multiple credit card debts into single manageable payment.'
    },
    {
      id: 'LR-2025-005',
      borrowerName: 'Vikash Singh',
      amount: 300000,
      purpose: 'Medical Emergency',
      interestRate: 13.8,
      term: 24,
      status: 'pending',
      creditScore: 715,
      riskLevel: 'medium',
      monthlyIncome: 62000,
      requestDate: '2025-09-12',
      rating: 4.3,
      expectedReturn: 41400,
      description: 'Urgent medical treatment expenses for family member.'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white';
      case 'funded': return 'bg-gradient-to-r from-emerald-500 to-green-500 text-white';
      case 'rejected': return 'bg-gradient-to-r from-red-500 to-pink-500 text-white';
      default: return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low': return 'text-emerald-400 bg-emerald-500/10';
      case 'medium': return 'text-amber-400 bg-amber-500/10';
      case 'high': return 'text-red-400 bg-red-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  const filteredRequests = loanRequests.filter(request => {
    const matchesSearch = request.borrowerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesAmount = amountRange === 'all' || 
                         (amountRange === 'low' && request.amount <= 200000) ||
                         (amountRange === 'medium' && request.amount > 200000 && request.amount <= 500000) ||
                         (amountRange === 'high' && request.amount > 500000);
    const matchesRisk = riskFilter === 'all' || request.riskLevel === riskFilter;
    const matchesPurpose = purposeFilter === 'all' || request.purpose === purposeFilter;
    
    return matchesSearch && matchesStatus && matchesAmount && matchesRisk && matchesPurpose;
  });

  const totalRequests = loanRequests.length;
  const totalPendingRequests = loanRequests.filter(req => req.status === 'pending').length;
  const totalFundingOpportunity = loanRequests.filter(req => req.status === 'pending').reduce((sum, req) => sum + req.amount, 0);
  const avgCreditScore = Math.round(loanRequests.reduce((sum, req) => sum + req.creditScore, 0) / loanRequests.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-3 leading-tight">
                Smart Lending Made 
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"> Simple</span>
              </h1>
              <p className="text-slate-300 text-lg">Discover verified borrowers and maximize your returns with AI-powered insights</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-2xl font-medium hover:bg-white/20 transition-all duration-300 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Advanced Filter
              </button>
              <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-3 rounded-2xl font-semibold flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl">
                <Zap className="w-5 h-5" />
                Auto-Invest
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="group relative overflow-hidden bg-gradient-to-br from-violet-500/20 to-purple-600/20 backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 bg-violet-500/20 rounded-2xl">
                  <Users className="w-7 h-7 text-violet-400" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">{totalRequests}</div>
                  <div className="text-violet-300 text-sm font-medium">TOTAL REQUESTS</div>
                </div>
              </div>
              <div className="text-violet-200 text-sm">Active loan applications</div>
            </div>
          </div>

          <div className="group relative overflow-hidden bg-gradient-to-br from-emerald-500/20 to-teal-600/20 backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 bg-emerald-500/20 rounded-2xl">
                  <Target className="w-7 h-7 text-emerald-400" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">{totalPendingRequests}</div>
                  <div className="text-emerald-300 text-sm font-medium">AWAITING REVIEW</div>
                </div>
              </div>
              <div className="text-emerald-200 text-sm">Ready for funding</div>
            </div>
          </div>

          <div className="group relative overflow-hidden bg-gradient-to-br from-blue-500/20 to-cyan-600/20 backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 bg-blue-500/20 rounded-2xl">
                  <DollarSign className="w-7 h-7 text-blue-400" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">₹{(totalFundingOpportunity/100000).toFixed(1)}L</div>
                  <div className="text-blue-300 text-sm font-medium">OPPORTUNITY</div>
                </div>
              </div>
              <div className="text-blue-200 text-sm">Available investment</div>
            </div>
          </div>

          <div className="group relative overflow-hidden bg-gradient-to-br from-amber-500/20 to-orange-600/20 backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 bg-amber-500/20 rounded-2xl">
                  <TrendingUp className="w-7 h-7 text-amber-400" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">{avgCreditScore}</div>
                  <div className="text-amber-300 text-sm font-medium">AVG CREDIT</div>
                </div>
              </div>
              <div className="text-amber-200 text-sm">Quality score</div>
            </div>
          </div>
        </div>

        {/* Modern Search & Filters */}
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 mb-8">
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search borrowers, loan purposes, or IDs..."
                className="w-full pl-16 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-lg placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all backdrop-blur-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Buttons */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <select
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-cyan-500 backdrop-blur-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="funded">Funded</option>
                <option value="rejected">Rejected</option>
              </select>

              <select
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-cyan-500 backdrop-blur-sm"
                value={amountRange}
                onChange={(e) => setAmountRange(e.target.value)}
              >
                <option value="all">All Amounts</option>
                <option value="low">Under ₹2L</option>
                <option value="medium">₹2L - ₹5L</option>
                <option value="high">Above ₹5L</option>
              </select>

              <select
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-cyan-500 backdrop-blur-sm"
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
              >
                <option value="all">All Risk Levels</option>
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
              </select>

              <select
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-cyan-500 backdrop-blur-sm"
                value={purposeFilter}
                onChange={(e) => setPurposeFilter(e.target.value)}
              >
                <option value="all">All Purposes</option>
                <option value="Business Expansion">Business</option>
                <option value="Home Renovation">Home</option>
                <option value="Education">Education</option>
                <option value="Medical Emergency">Medical</option>
                <option value="Debt Consolidation">Debt Consolidation</option>
              </select>

              <select
                className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-cyan-500 backdrop-blur-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="amount">Highest Amount</option>
                <option value="credit">Best Credit</option>
                <option value="interest">Highest Return</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loan Requests Cards */}
        <div className="space-y-6">
          {filteredRequests.map((request, index) => (
            <div 
              key={request.id} 
              className="group relative overflow-hidden bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/10"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative p-8">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start mb-8">
                  <div className="flex items-start gap-6 mb-6 lg:mb-0">
                    <div className="relative">
                      <div className="p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg">
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                        <Shield className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-4 mb-3">
                        <h3 className="text-2xl font-bold text-white">{request.borrowerName}</h3>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                            <span className="text-yellow-400 font-semibold">{request.rating}</span>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(request.riskLevel)}`}>
                            {request.riskLevel.toUpperCase()} RISK
                          </div>
                        </div>
                      </div>
                      <p className="text-slate-400 text-lg mb-2">{request.id} • {request.purpose}</p>
                      <p className="text-slate-300 max-w-2xl">{request.description}</p>
                    </div>
                  </div>
                  <div className={`px-6 py-3 rounded-2xl text-lg font-bold ${getStatusColor(request.status)} shadow-lg`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">₹{(request.amount/100000).toFixed(1)}L</div>
                    <div className="text-slate-400 text-sm">LOAN AMOUNT</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">{request.interestRate}%</div>
                    <div className="text-slate-400 text-sm">INTEREST RATE</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">{request.term}M</div>
                    <div className="text-slate-400 text-sm">TERM</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-400 mb-2">{request.creditScore}</div>
                    <div className="text-slate-400 text-sm">CREDIT SCORE</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">₹{Math.round(request.monthlyIncome/1000)}K</div>
                    <div className="text-slate-400 text-sm">MONTHLY INCOME</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">₹{Math.round(request.expectedReturn/1000)}K</div>
                    <div className="text-slate-400 text-sm">EXPECTED RETURN</div>
                  </div>
                </div>

                {/* Action Buttons */}
                {request.status === 'pending' && (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl">
                      <CheckCircle className="w-6 h-6" />
                      Fund This Loan
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    <button className="flex-1 border-2 border-white/20 text-white hover:bg-white/10 py-4 px-8 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3">
                      <Eye className="w-6 h-6" />
                      View Details
                    </button>
                    <button className="flex-1 border-2 border-red-500/50 text-red-400 hover:bg-red-500/10 py-4 px-8 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3">
                      <XCircle className="w-6 h-6" />
                      Decline
                    </button>
                  </div>
                )}

                {request.status === 'funded' && (
                  <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-emerald-500/30 rounded-xl">
                          <CheckCircle className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div>
                          <p className="font-bold text-emerald-400 text-lg">Successfully Funded</p>
                          <p className="text-emerald-300">Loan disbursed and generating returns</p>
                        </div>
                      </div>
                      <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                        Track Returns
                      </button>
                    </div>
                  </div>
                )}

                {request.status === 'rejected' && (
                  <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-2xl p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-red-500/30 rounded-xl">
                        <XCircle className="w-6 h-6 text-red-400" />
                      </div>
                      <div>
                        <p className="font-bold text-red-400 text-lg">Application Declined</p>
                        <p className="text-red-300">Did not meet your lending criteria</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-3xl shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 backdrop-blur-sm"></div>
          <div className="relative p-12">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="text-center lg:text-left mb-8 lg:mb-0">
                <h3 className="text-3xl font-bold text-white mb-4">Ready to maximize your returns?</h3>
                <p className="text-white/90 text-xl">Join thousands of smart lenders earning up to 18% annual returns</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-purple-600 py-4 px-10 rounded-2xl hover:bg-gray-50 transition-all font-bold text-xl shadow-lg hover:shadow-xl">
                  Start Investing
                </button>
                <button className="border-2 border-white text-white py-4 px-10 rounded-2xl hover:bg-white hover:text-purple-600 transition-all font-bold text-xl">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>

        {filteredRequests.length === 0 && (
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-16 text-center">
            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Search className="w-16 h-16 text-slate-400" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">No matching opportunities found</h3>
            <p className="text-slate-400 text-xl mb-10">Try adjusting your filters to discover more lending opportunities</p>
            <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-4 px-10 rounded-2xl hover:from-cyan-600 hover:to-blue-600 transition-all font-bold text-xl shadow-lg">
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LenderDashboard;
import { useState, useEffect } from "react";
import WalletApi from "../../services/WalletService";
import Sidebar from "../../components/Sidebar";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { toast } from "react-toastify";
const WalletPage = () => {
  const [activeTab, setActiveTab] = useState("add");
  const [amount, setAmount] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
const [txLoading, setTxLoading] = useState(false);

  // 🪙 Fetch Wallet Balance
  useEffect(() => {
    fetchWalletBalance();
  }, []);
  const fetchWalletBalance = async () => {
    try {
      // Replace with actual API call
      const response = await WalletApi.getWalletBalance();
      console.log("Wallet Balance Response:", response);
      setWalletBalance(response);
      // setWalletBalance(3011.71); // placeholder
    } catch (error) {
      console.error("Failed to fetch wallet balance:", error);
    }
  };

  // 📄 Fetch Transactions
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
     try {
      setTxLoading(true);
       const response = await WalletApi.getTransactions();
      // Ensure array
      setTransactions(Array.isArray(response) ? response : []);
    } catch (err) {
      console.error("fetchTransactions error", err);
      setTransactions([]);
    } finally {
      setTxLoading(false);
    }
    
  };
   const formatTimestamp = (ts) => {
    if (!ts) return "";
    // format: 03 Aug 2025, 04:20 PM
    try {
      const d = new Date(ts);
      return d.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return ts;
    }
  };

   const recentSorted = () =>
    [...transactions]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 5);

  const isCredit = (tx) =>
    tx.type === "WALLET_TOP_UP" ||
    tx.type === "LOAN_FUNDING" ||
    tx.type === "LOAN_REPAYMENT";

  const handleAction = async (type) => {
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount.");
  
      return;
    }
    try {
      if (type === "add") {
        await WalletApi.addMoney( amount); // adapt payload per your API
         toast.success(`₹${amount} added to wallet successfully!`);
    
      } else {
        await WalletApi.withdraw(amount);
         toast.success(`₹${amount} withdrawn successfully!`);
    
      }
      await fetchWalletBalance();
      await fetchTransactions();
      setAmount(0);
    } catch (err) {
      console.error("transaction error", err.response.data);
      
    toast.error(err.response.data);
    }
  };

  // const handleButtonClick = async (type) => {
  //   console.log(type, amount);

  //   if (amount <= 0) {
  //     alert("Please enter a valid amount.");
  //     return;
  //   }

  //   if (type === "add") {
  //     await WalletApi.addMoney(amount);
  //   } else if (type === "withdraw") {
  //     await WalletApi.withdraw(amount);
  //   }
  //   fetchWalletBalance(); // Refresh balance after transaction

  //   // Reset amount
  //   setAmount(0);
  // };

   return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Sidebar (fixed left) */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                💳 My Wallet
              </h1>
              <p className="text-sm text-white/60">Manage balance, top-up and view recent activity</p>
            </div>
          </div>

          {/* Top grid: small balance card + controls */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Small Balance Card */}
            <div className="bg-white/6 border border-white/10 rounded-2xl p-4 flex flex-col justify-center items-start h-fit w-full md:w-56 shadow">
              <div className="text-xs text-white/60 uppercase tracking-wider">Wallet Balance</div>
              <div className="mt-2 text-2xl font-extrabold text-indigo-300">
                ₹{(walletBalance ?? 0).toFixed(2)}
              </div>
              <div className="mt-2 text-xs text-white/50">Available balance</div>
            </div>

            {/* Add/Withdraw card (spans two columns on lg) */}
            <div className="lg:col-span-2 bg-white/6 border border-white/10 rounded-2xl p-6 shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => setActiveTab("add")}
                    className={`px-4 py-2 rounded-full font-medium ${
                      activeTab === "add" ? "bg-indigo-600 text-white" : "bg-white/6 text-white/80"
                    }`}
                  >
                    Add Money
                  </button>
                  <button
                    onClick={() => setActiveTab("withdraw")}
                    className={`px-4 py-2 rounded-full font-medium ${
                      activeTab === "withdraw" ? "bg-indigo-600 text-white" : "bg-white/6 text-white/80"
                    }`}
                  >
                    Withdraw
                  </button>
                </div>

                <div className="text-sm text-white/60">Quick actions</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="md:col-span-2">
                  <label className="block text-sm text-white/80 mb-2">Enter amount (₹)</label>
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                    <span className="text-indigo-300 mr-3">₹</span>
                    <input
                      type="number"
                      min={0}
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="bg-transparent outline-none w-full text-white placeholder-white/40"
                      placeholder="0"
                    />
                  </div>

                  <div className="mt-3 flex gap-2">
                    {[100, 500, 1000].map((v) => (
                      <button
                        key={v}
                        onClick={() => setAmount((a) => Number(a || 0) + v)}
                        className="px-3 py-1 text-sm rounded-full bg-white/6 border border-white/8"
                      >
                        + ₹{v}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="md:flex md:flex-col md:items-end">
                  <div className="text-sm text-white/60 mb-2">Total</div>
                  <button
                    onClick={() => handleAction(activeTab)}
                    className="w-full md:w-44 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 font-semibold shadow hover:scale-[1.02] transition-transform"
                  >
                    {activeTab === "add" ? "Add Money" : "Withdraw"}
                  </button>
                </div>
              </div>

              <div className="mt-4 text-xs text-white/50">
                Transactions processed instantly. Min amount ₹1.
              </div>
            </div>
          </div>

          {/* Transactions (full width card) */}
          <section className="mt-6 bg-white/6 border border-white/10 rounded-2xl p-6 shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Transactions</h2>
              <div className="text-sm text-white/60">{transactions.length} total</div>
            </div>

            {txLoading ? (
              <div className="py-12 text-center text-white/60">Loading transactions…</div>
            ) : transactions.length === 0 ? (
              <div className="py-12 text-center text-white/60">No transactions yet.</div>
            ) : (
              <ul className="space-y-3">
                {recentSorted().map((tx) => {
                  const credit = isCredit(tx);
                  const sign = credit ? "+" : "-";
                  const amountClass = credit ? "text-emerald-300" : "text-rose-300";
                  return (
                    <li key={tx.id} className="flex items-center justify-between bg-white/3 rounded-lg p-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/6 flex items-center justify-center text-sm">
                          {credit ? <ArrowDownLeft className="w-5 h-5 text-emerald-400" /> : 
                <ArrowUpRight className="w-5 h-5 text-red-400" />}
                        </div>
                        <div>
                          <div className="font-medium text-white">{(tx.type || "").replace(/_/g, " ")}</div>
                          <div className="text-xs text-white/60">{tx.description ?? "—"}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className={`font-semibold ${amountClass}`}>{sign} ₹{Number(tx.amount).toFixed(2)}</div>
                        <div className="text-xs text-white/50">{formatTimestamp(tx.timestamp)}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => fetchTransactions()}
                className="text-sm text-white/70 hover:text-white px-3 py-1 rounded-lg bg-white/5"
              >
                Refresh
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default WalletPage;

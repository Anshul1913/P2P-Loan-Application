import React from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import DashboardWelcomeCard from "../../components/dashboard/DashboardWelcomeCard";
import ActiveLoanCard from "../../components/dashboard/ActiveLoanCard";
import SubmitLoanRequestCard from "../../components/dashboard/SubmitLoanRequestCard";
import CreditScoreGauge from "../../components/dashboard/CreditScoreCard";
import RecentActivityTable from "../../components/creditScoreCard/RecentActivityTable";
import ScoreHistoryChart from "../../components/creditScoreCard/ScoreHistory";
const LenderDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 bg-gray-100 min-h-screen p-6">
        {/* <Topbar /> */}

        <div className="space-y-6 mt-6">
          {/* Full-width Welcome Card */}
          <DashboardWelcomeCard />

          {/* Grid for other components */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CreditScoreGauge />
            <ActiveLoanCard />
            <ScoreHistoryChart
              scoreHistory={[
                { month: "Jan", score: 600 },
                { month: "Feb", score: 650 },
                { month: "Mar", score: 660 },
                { month: "Apr", score: 680 },
                { month: "May", score: 690 },
                { month: "Jun", score: 710 },
                { month: "Jul", score: 740 },
                { month: "Aug", score: 650 },
              ]}
            />
            <SubmitLoanRequestCard />
            <RecentActivityTable />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LenderDashboard;

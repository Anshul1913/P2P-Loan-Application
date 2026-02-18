import { useEffect, useState } from "react";
import CreditScoreGauge from "../../components/dashboard/CreditScoreCard";
import Sidebar from "../../components/Sidebar";
import RecentActivityTable from "../../components/creditScoreCard/RecentActivityTable";
import ActionCards from "../../components/creditScoreCard/RemainderCard";
import ScoreHistoryChart from "../../components/creditScoreCard/ScoreHistory";
import CreditScoreHistoryApi from "../../services/CreditScoreHistoryService";

const CreditScorePage = () => {
  const [creditData, setCreditData] = useState([]);

  useEffect(() => {
    fetchCreditScoreData();
  }, []);

  const fetchCreditScoreData = async () => {
    // Simulate fetching data from an API
    try {
        const response = await CreditScoreHistoryApi.getCreditScoreHistory();
        console.log(response);
        setCreditData(response); // Expected score range: 300 - 900
      } catch (error) {
        console.error("Error fetching credit score:", error);
        // setCreditScore(null); // Handle error case
      }
  };

  return (
    // <div>
    //     <CreditScoreGauge />
    // </div>
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-4">Your Credit Health</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <CreditScoreGauge />
          <ActionCards />
          {/* <EducationCard /> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* <ScoreHistoryChart data={creditData.history} /> */}
          <RecentActivityTable activities={creditData} />
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
        </div>
      </div>
    </div>
  );
};
export default CreditScorePage;
